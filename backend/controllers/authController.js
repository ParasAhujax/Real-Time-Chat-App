const User = require('../model/user')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function handleUserSignup(req,res){
    try {
        const {name,email,password} = req.body;
        
        if(!name || !email || !password) return res.status(302).json({message:'all fields are required'})
        
        const userExists = await User.findOne({email:email});
        if(userExists) return res.status(400).json({message:'user already exists'});

        const encryptedPassword = await bcrypt.hash(password,10);
        
        const user = await User.create({
            name:name,
            email:email,
            password:encryptedPassword,
        })

        if (!user) {
            return res.status(500).json({ message: 'Failed to create user' });
        }
        delete user.password;
        req.user = user;

        const token = jwt.sign(
            {email:user.email},
            process.env.JWT_SECRET,{
                expiresIn:'1h'
            }
        )
        if(!token) return res.status(500).json({"error":"token could not be generated"})
        res.cookie('token',token,{
            // secure:true,
            // httpOnly:true,
            // sameSite:'None'
        })
        return res.status(200).json({message:'user created successfully'});
    
    } 
    catch (error) {
        return res.status(500).json({error: error});
    }
}
async function handleUserLogin(req,res){
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email: email});

        if(!user) return res.status(401).json({ message : "user not found" });

        delete user.password;
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Internal server error' });
            }
            if (result) {
                req.user = user;

                const token = jwt.sign(
                    {email:user.email},
                    process.env.JWT_SECRET,{
                        // expiresIn:'1h'
                    }
                )
                if(!token) return res.status(500).json({"error":"token could not be generated"})
                
                res.cookie('token',token,{
                    // secure:true,
                    // sameSite:'None',
                    // httpOnly:true,
                })
                return res.status(200).json({ message: 'Login successful' });
            } 
            else {
                return res.status(401).json({ message: 'Incorrect password' });
            }
        });
    } 
    catch (error) {
        return res.status(error.status).redirect('/login');
    }    
}
async function handleUserLogout(req, res) {
    try {
        return res.clearCookie('token').json('logout successful');
    } 
    catch (error) {
        res.json({error: error.message});
    }
}

module.exports = {
    handleUserLogin,
    handleUserSignup,
    handleUserLogout
}