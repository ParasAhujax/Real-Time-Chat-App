const mongoose = require('mongoose');

async function connectToMongoDb(url){
    try {
        await mongoose.connect(url)
        .then(console.log("connected to mongoDb"))
    } catch (err) {
        return err.message
    }
}

module.exports = connectToMongoDb