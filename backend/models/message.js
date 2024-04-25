const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    reciever:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    message:String,
},{timestamps:true})

const Message = mongoose.model('messages',messageSchema)

module.exports = Message;