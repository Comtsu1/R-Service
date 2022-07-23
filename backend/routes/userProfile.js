const post = require('../models/post')
const mongoose = require('mongoose')
const express = require('express')
const router  = express.Router()
const user = require('../models/modelUser.js')
const jwt = require('jsonwebtoken')
const userProfile = require('../models/userProfile')

router.post('/profile', async (req, res)=>{
    const token = req.header('x-auth-token')
    let payload = JSON.parse(Buffer.from(token.split(".")[1], "base64url"));
    const existCheck = await user.findOne({email : payload.userEmail})


    if(existCheck){
        const profile = new userProfile({
            firstName : req.body.firstName,
            secondName : req.body.secondName,
            image : req.body.image,
            user : existCheck.userId,
            description : req.body.description,
            phoneNum : req.body.phoneNum})

        post.find({ author : existCheck.userId}, function (err, docs) {
            if (err){
                console.log(err);
            }
            else{
               docs.forEach(item => profile.posts.push(item))
            }
        });

        profile.save()
        res.status(200).json({msg : "profile created"})
    }
    else{
        res.status(401).json({error : "User does not exist"})
    }
})

module.exports = router