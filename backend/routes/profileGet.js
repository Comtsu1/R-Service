const verify = require('../middleware/authToken')

const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const user = require('../models/modelUser.js')

const post = require('../models/post')

const reservationSchema = require('../models/reservation')
const reservation = require('../routes/reservation')

router.get("/get-reservations", verify, async (req, res) => {
    const token = req.header('x-auth-token');
    let payload = JSON.parse(Buffer.from(token.split(".")[1], "base64url"))
    const userProfileCheck = await user.findOne({email : payload.userEmail})
    if(userProfileCheck){
        const reservations = await reservationSchema.find({to: userProfileCheck.userId})
        res.status(200).json({reservation: reservation});
    } else{
        res.status(404).json({msg: "Coudnl't get profile"})
    }
})

router.get("/get-made-reservations", verify, async (req, res) => {
    const token = req.header('x-auth-token');
    let payload = JSON.parse(Buffer.from(token.split(".")[1], "base64url"))
    const userProfileCheck = await user.findOne({email : payload.userEmail})
    if(userProfileCheck){
        const reservations = await reservationSchema.find({from: userProfileCheck.userId})
        res.status(200).json({reservation_made: reservation});
    } else{
        res.status(404).json({msg: "Coudnl't get profile"})
    }
})

router.get("/get-posts", verify, async (req, res) => {
    const token = req.header('x-auth-token');
    let payload = JSON.parse(Buffer.from(token.split(".")[1], "base64url"));
    const userProfileCheck = await user.findOne({email : payload.userEmail})
    if(userProfileCheck){
        const posts = await post.find({author: userProfileCheck.userId})
        res.status(200).json({posts: posts});
    } else{
        res.status(404).json({msg: "Coudnl't get profile"})
    }

})

module.exports = router