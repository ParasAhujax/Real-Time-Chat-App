const http = require('http');
const express = require('express');
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)
// const {Server} = require('socket.io');
// const io = new Server(server);

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(express.static('public'))
app.set('view engine','ejs')
app.set('views','./views')

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const connectToMongoDb = require('./connect')
connectToMongoDb('mongodb://127.0.0.1:27017/chat-app')

const {checkAuth}  = require('./middleware/checkAuth')
app.use(checkAuth)

const userRoute = require('./routes/userRoute');
app.use('/api/user',userRoute)

const staticRoute = require('./routes/staticRoute')
app.use('/',staticRoute);

const chatSocket = require('./sockets/chatSocket');
chatSocket(io);

server.listen(3000,()=>{
    console.log("running on port 3000");
})