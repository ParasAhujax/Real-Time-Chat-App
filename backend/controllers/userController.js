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
function chatWithUser(req,res){

    const currUser = req.user.userId;
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
        
        res.render('chat',{
            currUserName:req.user.name,
            otherUserName: otherUser.name,
        })
    
}
module.exports ={
    getAllUsers,
    chatWithUser,
    getOtherUser
}