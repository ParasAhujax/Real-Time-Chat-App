const User = require('../models/user')
const uniqid = require('uniqid')

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
async function handleUserLogout(req,res){
    try {
        res.clearCookie('token').redirect('/user/login')
        
    } 
    catch (error) {
        console.log("error occurred while logging out");
        res.json({message: error.message})
    }
}
function chatWithUser(req,res){

    const currUser = req.user[0].userId;
    const otherUser = req.params.userId;

    res.json({
        currUser:currUser,
        otherUser:otherUser,
    })   
}
async function getOtherUser(req,res){
    
        if(!req.user){
            return res.redirect('/user/login')
        }
        const otherUserId = req.params.userId;
        
        const otherUser =  await User.findOne({userId: otherUserId})
        
        console.log(otherUser.name);

        res.render('chat',{
            currUserName:req.user[0].name,
            otherUserName: otherUser.name,
        })
    
}

module.exports ={
    getAllUsers,
    handleUserLogout,
    chatWithUser,
    getOtherUser
}