const http = require('http');
const express = require('express');
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)
// const {Server} = require('socket.io');
// const io = new Server(server);

app.use(express.static('public'))
app.set('view engine','ejs');
app.set('views','./views')

app.get('/',(req,res)=>{
    res.render('index')
})

io.on("connection", (socket)=>{
    console.log("a user has connected",socket.id);
    socket.on("disconnect",()=>{
        console.log(`user disconnected`);
    })

    socket.on("message",(msg)=>{
        io.emit('message',msg);
    })
})

server.listen(3000,()=>{
    console.log("running on port 3000");
})