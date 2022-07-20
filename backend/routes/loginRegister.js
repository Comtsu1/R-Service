const mongoose = require('mongoose')
const express = require('express')
const router  = express.Router()
const bcrypt = require('bcrypt')
const user = require('../models/modelUser.js')
const jwt = require('jsonwebtoken')

router.post('/register', async (req,res) => {

    if(!(req.body.username && req.body.password && req.body.email)){
        return res.status(400).send({error : "every field must be completed"})
    }

    const doesExistEmail = await user.findOne({ email: req.body.email })
    if(doesExistEmail)return res.status(400).json({error : "email already exist"})
    if(!String(req.body.email).includes('@'))return res.status(401).json({error : "wrong email format"})

    const doesExistUsername = await user.findOne({ username : req.body.username })
    if(doesExistUsername)return res.status(400).json({error : "username already exist"})

    const hasNumber = /\d/
    if(!hasNumber.test(req.body.password))return res.status(401).json({error:"password must contain numbers"})

    function containsSpecialChars(str) {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return specialChars.test(str);
      }
    if(!containsSpecialChars(req.body.password))return res.status(401).json({error:"password must contain special symbols"})
    
    const newUser = new user(req.body)
    const salt = await bcrypt.genSalt(10)
    newUser.password = await bcrypt.hash(newUser.password, salt)
    newUser.save().then(console.log(`User created with username:${req.body.username} and email ${req.body.email}`))
    //mongoose.connection.useDb("Users").collection('users').insertOne(newUser)
    /// res.status(201).json({userCreated: true})
    const userEmail = newUser.email
    const token = await jwt.sign({
        userEmail
    }, "secretc0de1234123jbhb2@#$Gyh4SEG",{
        expiresIn: 86400
    })
    res.status(200).json({token})
})

router.post("/login", async (req, res) => {
    const existCheck = await user.findOne({email : req.body.email})
    if(existCheck){
    const passCheck = await bcrypt.compare(req.body.password, existCheck.password, (err, response) => {
        if(response){
            res.status(200).redirect("/success_login")  //json({message : "Passwords are matching"})
        }else{
                 res.status(400).json({error : "Wrong password"})
             }
    })}
    else{
        res.status(401).json({error : "User does not exist"})
    }

    const userEmail = existCheck.email
    const token = await jwt.sign({
        userEmail
    }, "secretc0de1234123jbhb2@#$Gyh4SEG",{
        expiresIn: 86400
    })
    res.status(200).json({token})
})

module.exports = router