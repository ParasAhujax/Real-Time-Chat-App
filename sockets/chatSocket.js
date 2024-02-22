function chatSocket (io){ 
    const activeUsers = new Map();
    //set includes unique elements only       
    io.on("connection", (socket)=>{
        
        // activeUsers[userId] = socket.id
        // console.log(activeUsers);
    
        socket.on("addUser",(userId)=>{
        })
        
        socket.on("disconnect",()=>{
            console.log(`user disconnected`);
            activeUsers.delete(socket.id);
            
            io.emit('status',{
                activeUsers:Array.from(activeUsers),
            })
        })
        
        socket.on("sendMessage",(msg)=>{
            io.emit('message',msg);
        })
    })
}
module.exports = chatSocket;
