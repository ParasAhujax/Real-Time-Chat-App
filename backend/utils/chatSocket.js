const {
    getActiveUsers,
    addActiveUsers,
    removeActiveUsers,
    isActive 
}= require('../mapUser')

function chatSocket (io){ 
    const activeUsers = new Map();

    io.on("connection", (socket)=>{
        // socket.on('currentUser',()=>{

        //     socket.on('message',message=>{
        //         io.emit('p-message',message)
        //         console.log(message);
        //     })
        // })

        // socket.on('setupUser',(currUserId,otherUserId)=>{
        //     // activeUsers.set(currUserId, socket.id)
        //     // var user = activeUsers.get(socket.id)
        //     // console.log(`${user} connected`);
            
        //     socket.on('p-message', ( message) => {
        //         console.log(message);
        //         // const currSocketId = activeUsers.get(currUserId)
        //         // const otherSocketId= activeUsers.get(otherUserId)
        //         // io.to(otherSocketId).to(currSocketId)
        //         io.emit('message',message);
        //     });
        // })        

        socket.on('setupUser',(currUserId)=>{
            // console.log(req.user._id);
            activeUsers.set(currUserId,socket.id)
            socket.emit('setupComplete',socket.id);
            // console.log(activeUsers);
        })
        socket.on('new message',(message)=>{
            // console.log(message);
            const sender = activeUsers.get(message.sender);
            const receiver = activeUsers.get(message.receiver);
            
            io.to(sender).to(receiver).emit('message received', message);
        })


        socket.on("disconnect",()=>{
            var user = activeUsers.get(socket.id);
            // console.log(`${user} disconnected`);
            activeUsers.delete(socket.id);
            
            // io.emit('status',{
            //     activeUsers:Array.from(activeUsers),
            // })
        })
        
        socket.on("sendMessage",(msg,id)=>{
            io.emit('message',msg);
        })
    })
}
module.exports = chatSocket;
