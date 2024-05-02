const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }]    
},{timestamps:true})

const User = mongoose.model('users',userSchema)

module.exports = User;