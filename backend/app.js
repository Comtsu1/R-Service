const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dbConnection = require('./db/connection')
require('dotenv').config()
const loginRegister = require('./routes/loginRegister')
const port = 8080 || process.env.PROCESS
const user = require('./models/modelUser.js')
const verify = require('./middleware/authToken')
const recoveryPass = require('./routes/forgotPassword')
const bcrypt = require('bcrypt')
const addPost = require("./routes/postAdd")
const userProfile = require('./routes/userProfileCreate')
const userProfileSchema = require('./models/userProfile')
const post = require('./models/post')
const cors = require('cors')
const reservationSchema = require('./models/reservation')

// user cors, it doesnt work at all on firefox if not included
app.use(cors())
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

app.get("/profile", verify, async (req,res)=>{
    // const id = req.params.id
    // const profileID = await user.findOne({userId: id})
    const token = req.header('x-auth-token')
    let payload = JSON.parse(Buffer.from(token.split(".")[1], "base64url"));
    const userProfileCheck = await userProfileSchema.findOne({email : payload.userEmail})
    const userReservations = await reservationSchema.find({to : payload.userId})
    if(userProfileCheck){
        let result = await post.find({author : userProfileCheck.userId})
        res.status(200).json({profile : userProfileCheck, posts : result, reservations : userReservations})
    }else{
        res.status(404).json({msg : `Something went wrong`})
    }
})

app.get("/posts", async (req,res)=>{
    const newPosts = await post.find().sort({ $natural: -1 }).limit(20)
    res.json({newest20Posts : newPosts})
})

app.get("/posts/:startingId/:postsNum", async (req,res)=>{
    let {startingId, postsNum} = req.params
    const newPosts = await post.find().limit(postsNum).skip(Number(startingId)-1)
    res.json({postToShow : newPosts})
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
