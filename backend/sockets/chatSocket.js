const {
    getActiveUsers,
    addActiveUsers,
    removeActiveUsers,
    isActive
}= require('../mapUser')

function chatSocket (io){ 
    const activeUsers = new Map();

    io.on("connection", (socket)=>{

        socket.on('curr-user',(currUserId,otherUserId)=>{
            activeUsers.set(currUserId, socket.id)
            var user = activeUsers.get(socket.id)
            // console.log(`${user} connected`);
            
            socket.on('p-msg', (currUserId,otherUserId, message) => {
                const currSocketId = activeUsers.get(currUserId)
                const otherSocketId= activeUsers.get(otherUserId)
                io.to(otherSocketId).to(currSocketId).emit('message',otherUserId,currUserId,message);
            });
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
