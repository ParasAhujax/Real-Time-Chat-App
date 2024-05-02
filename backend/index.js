const http = require('http');
const express = require('express');
const app = express()
const server = http.createServer(app)
// const io = require('socket.io')(server)

const cors = require('cors');
app.use(cors({
    origin: `http://localhost:5173`,
    credentials:true
}))

const {Server} = require('socket.io');
const io = new Server(server,{
    cors:{
        origin:`http://localhost:5173`,
        credentials:true
    }
});



const morgan = require('morgan');
app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(express.static('public'))
app.set('view engine','ejs')
app.set('views','./views')

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const connectToMongoDb = require('./connect')
connectToMongoDb('mongodb://127.0.0.1:27017/swiftchat')

const {checkAuth}  = require('./middleware/authMiddleware')
app.use(checkAuth)

const userRoute = require('./routes/userRoute');
app.use('/api/user',userRoute)

const messageRoute = require('./routes/messageRoute');
app.use('/api/message',messageRoute);

const staticRoute = require('./routes/staticRoute')
app.use('/',staticRoute);

const chatSocket = require('./utils/chatSocket');
chatSocket(io);

server.listen(3000,()=>{
    console.log("running on port 3000");
})