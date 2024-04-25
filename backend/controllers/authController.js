const jwt = require('jsonwebtoken');
const User = require('../models/user')
const uniqid = require('uniqid')

async function handleUserSignup(req,res){
    try{
        const {name,email,password} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"user already exists"});
        }
        const userId = uniqid();

        await User.create({
            name,
            email,
            password,
            userId
        })
        return res.status(201).redirect('/user/login')
    }
    catch(err){
        return res.status(500).redirect('/user/signup');
    }
}
async function handleUserLogin(req,res){
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email:email,password:password})
        
        if(!user) {
            return res.redirect('/signup?error=User%not%20found')
        }
        req.user = user;

        const token = jwt.sign(
            {email: user.email},
            'secret'
        )
        
        return res.status(201).cookie('token',token).redirect('/');
    } 
    catch (error) {
        return res.status(500).redirect('/user/login')
    }
}
async function handleUserLogout(req,res){
    try {
        res.clearCookie('token').redirect('/user/login')
    } 
    catch (error) {
        res.json({message: error.message})
    }
}
module.exports = {
    handleUserLogin,
    handleUserSignup,
    handleUserLogout
}