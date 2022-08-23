const post = require('../models/post')
const mongoose = require('mongoose')
const express = require('express')
const router  = express.Router()
const user = require('../models/modelUser.js')
const jwt = require('jsonwebtoken')
const userProfile = require('../models/userProfile')
const db = mongoose.connection
const verify = require('../middleware/authToken')

router.post('/create-profile', verify, async (req, res)=>{
    const token = req.header('x-auth-token')
    let payload = JSON.parse(Buffer.from(token.split(".")[1], "base64url"));
    const existCheck = await user.findOne({email : payload.userEmail})
    const profileCheck = await post.findOne({user : existCheck.userId})
    if(profileCheck)return res.status(409).json({msg : "profile already created"})
// let result = await post.find({author : existCheck.userId})
    // console.log(result);
    if(existCheck){
        const profile = new userProfile({
            firstName : req.body.firstName,
            secondName : req.body.secondName,
            image : req.body.image,
            user : existCheck.userId,
            description : req.body.description,
            phoneNum : req.body.phoneNum,
        })
        profile.save()
        res.status(200).json({msg : "profile created"})
    }
    else{
        res.status(409).json({error : "User does not exist"})
    }
})

module.exports = router