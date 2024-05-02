const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    message:String,
    timestamp:Number
    
},{timestamps:true})

const Message = mongoose.model('messages',messageSchema)

module.exports = Message;