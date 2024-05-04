function chatSocket (io){ 
    const activeUsers = new Map();

    io.on("connection", (socket)=>{
          
        socket.on('setupUser',(currUserId)=>{
            activeUsers.set(currUserId,socket.id)
            socket.emit('setupComplete',socket.id);
            const activeUsersArray = Array.from(activeUsers.keys());
            io.emit('activeUsers',activeUsersArray);
        })

        socket.on('new message',(message)=>{
            const sender = activeUsers.get(message.sender);
            const receiver = activeUsers.get(message.receiver);
            io.to(sender).to(receiver).emit('message received', message);
        })

        socket.on("disconnect",()=>{
            const userId = Array.from(activeUsers.entries()).find(([_, value]) => value === socket.id)?.[0];
            activeUsers.delete(userId);
            const activeUsersArray = Array.from(activeUsers.keys());
            io.emit('activeUsers',activeUsersArray);
        })
    })
}
module.exports = chatSocket;
