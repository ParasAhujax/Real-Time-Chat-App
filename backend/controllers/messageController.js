const Message = require("../model/message");

async function getAllMessages(req,res){
    try {
        const messages = await Message.find();
        if(messages.length===0) return res.status(404).json({message: "no messages found"}); 
        
        return res.status(200).json(messages);
    } 
    catch (error) {

        
    }
}

async function storeMessage(req, res) {
    try {
        const {message,sender,receiver,timestamp} = req.body;
        if(!message || !sender || !receiver || !timestamp) return res.status(302).json({message:'some data is missing'})

        const storedMessage = await Message.create({
            message: message,
            sender: sender,
            receiver: receiver,
            timestamp: timestamp,
        })
        if (!storedMessage) {
            return res.status(500).json({ message: 'Failed to store message' });
        }

        return res.status(200).json({ message: 'message was successfully stored' })

    } 
    catch (error) {
        return res.status(error.status).json({ error: error });
    }
}
async function getUserMessages(req, res) {
    try {
        const currentUserId = req.user._id;
        const otherUserId = req.params.id;
        
        const messages = await Message.find(
            {$or:[{sender:currentUserId,receiver:otherUserId},{sender:otherUserId,receiver:currentUserId}]}
        )

        return res.status(200).json(messages);
    } 
    catch (error) {
        return res.status(error.status).json({error:error})
    }
}

module.exports ={
    getUserMessages,
    getAllMessages,
    storeMessage
}