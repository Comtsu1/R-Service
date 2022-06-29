const mongoose = require('mongoose')
const express = require('express')
const router  = express.Router()
const bcrypt = require('bcrypt')
const user = require('../models/modelUser.js')


router.post('/register', async (req,res) => {

    const doesExistEmail = await user.findOne({ email: req.body.email })
    if(doesExistEmail)return res.status(409).json({error : "email already exist"})

    const doesExistUsername = await user.findOne({ username : req.body.username })
    if(doesExistUsername)return res.status(409).json({error : "username already exist"})

    if(String(req.body.password).length < 4)return res.status(401).json({error: "password is too short"})
    // const hasNumber = /\d/;
    // if(!hasNumber.test(req.body.password))return res.status(401).json({error:"password must contain numbers"})

    if(!(req.body.username && req.body.password && req.body.email)){
        return res.status(400).send({error : "every field must be completed"})
    }
    
    const newUser = new user(req.body)

    const salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(newUser.password, salt)
    mongoose.connection.useDb("Users").collection('users').insertOne(newUser)
    return res.status(201).json({userCreated: true})
})

module.exports = router