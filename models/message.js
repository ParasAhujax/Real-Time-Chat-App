const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender:String,
    reciever:String,
    message:String,
},{timestamps:true})

const message = mongoose.model('messages',messageSchema)

module.exports = message;