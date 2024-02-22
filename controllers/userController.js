const User = require('../models/user')

async function getAllUsers(req,res){
    try {
        const users = await User.find()
        if(!users){
            return res.json({message: 'No users found'})
        }
        return res.json({users:users})
    } 
    catch (error) {
        res.json({ error: error.message})
    }
}
async function createNewUser(req,res){
    try {
        console.log(req.body);
        const user = req.body;
        const email = user.email;
        const userExists = await User.findOne({email})
        if(userExists){
            return res.json({message: 'user already exists'})
        }
        const newUser = new User(user);
        newUser.userId='xyz';
        await newUser.save()
        return res.json({message: 'new user has been created'})
    } 
    catch (error) {
        res.json({ error: error.message})
    }
}

module.exports ={
    getAllUsers,
    createNewUser,
}