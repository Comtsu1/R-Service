
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dbConnection = require('./db/connection')
require('dotenv').config()
const loginRegister = require('./routes/loginRegister')
const port = 3000 || process.env.PROCESS
const user = require('./models/modelUser.js')
const verify = require('./middleware/authToken')
const recoveryPass = require('./routes/forgotPassword')
const bcrypt = require('bcrypt')
const addPost = require("./routes/postAdd")
const userProfile = require('./routes/userProfileCreate')
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
// const cors = require('cors')
// app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/user", loginRegister)
app.use("/", recoveryPass)
app.use("/", addPost)
app.use("/", userProfile)

app.get("/user/register", (req,res) => {
    res.sendFile(__dirname + '/public/index.html')
})
app.get("/success_login",(req,res)=>{
    res.json({login : "success"})
})

//just a test to get profile with matching id
app.get("/profile/:id", verify, async (req,res)=>{
    const id = req.params.id
    const profileID = await user.findOne({userId: id})
    if(profileID){
        res.status(200).json({username: profileID.username})
    }else{
        res.status(404).json({msg : `User with id ${id} does not exist`})
    }
})

///messages
app.get("/message", (req,res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket =>{
    console.log('new user connection');
    socket.on('dissconect', () =>{
        console.log('user dissconected')
    })
    socket.on('chat message', (msg) =>{
        console.log('message:' + msg )
    })
    socket.on('chat message', (msg) =>{
        io.emit('chat message' , msg)
    })
})


const startConnection = async() => {
    try {
        await dbConnection(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

startConnection()
