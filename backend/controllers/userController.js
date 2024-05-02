const User = require('../model/user')
const uniqid = require('uniqid')

async function getAllUsers(req,res){
    try {
        const users = await User.find()
        if(!users){
            return res.status(401).json({message: 'No users found'})
        }
        return res.status(200).json(users)
    } 
    catch (error) {
        res.status(error.status).json({ error: error.message})
    }
}
function getCurrentUser(req,res) {
    try {
        const userId = req.user._id;
        const name = req.user.name;
        const email = req.user.email;
        res.status(200).json({ userId: userId, name: name, email: email });
    } 
    catch (error) {
        console.log(error.message);
        res.status(error.status).json({ error: error.message });        
    }
}
async function getUserById(req,res){
    try {
        const {_id} = req.params;
        console.log(_id);
        const user = await User.findById(_id);
        if(!user) return res.status(404).json({ error:"user not found" });

        const name = user.name;
        const email = user.email;
        return res.status(200).json({name:name, email:email,_id:_id});
    } 
    catch (error) {
        console.log(error.message);
        return res.status(error.status).json({error:error});
    }
}
async function getUserFriends(req, res) {
    try {
        const friends = req.user.friends;
        // res.status(200).json(friends);

        friends.map(async(friend)=>{
            const friendDetail = await User.findById(friend._id);
            return {
                name: friendDetail.name,

            }
        })


    } catch (error) {
        res.status(error.message).json({ error:error});
    }
}


module.exports ={
    getAllUsers,
    getCurrentUser,
    getUserById
}