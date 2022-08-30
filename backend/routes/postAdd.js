const post = require('../models/post')
const mongoose = require('mongoose')
const express = require('express')
const router  = express.Router()
const user = require('../models/modelUser.js')
const jwt = require('jsonwebtoken')

router.post('/add-post', async (req, res)=>{
    const token = req.header('x-auth-token')
    let payload = JSON.parse(Buffer.from(token.split(".")[1], "base64url"));
    
    const existCheck = await user.findOne({email : payload.userEmail})

    if(existCheck){
        const newPost = new post({
            name : req.body.name,
            description : req.body.description,
            location : req.body.location,
            price : req.body.price,
            author : existCheck.userId,
            phoneNum: req.body.phoneNum,
            category : req.body.category,
            image : req.body.image,
        })
        newPost.save()
        res.status(200).json({msg : "post created"})
    }
    else{
        res.status(401).json({error : "User does not exist"})
    }
})

module.exports = router