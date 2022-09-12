const verify = require('../middleware/authToken')
const message = require('../models/message')
const mongoose = require('mongoose')
const express = require('express')
const router  = express.Router()
const user = require('../models/modelUser.js')
const uuid = require('uuid')
const amqp = require('amqplib/callback_api')

router.get('/contacts', verify, async (req, res) => {

    user.find({}, function(err,users) {
        var userMap = []

        users.forEach(function(user) {
            userMap.push({
                senderName: user.email,
                sender: user.userId
            })
        })

        res.status(200).json(userMap);
    })

    // For testing use with 2 users only
    // res.status(200).json([
    //     {senderName: 'Red', sender: '19'},
    //     {senderName: 'Blue', sender: '24'},
    // ])
})

router.get('/messages', verify, async (req, res) =>{
    const token = req.header('x-auth-token')

    let currentUserToken = JSON.parse(Buffer.from(token.split(".")[1], "base64url"));
    const currentUser = await user.findOne({ email: currentUserToken.userEmail})

    console.log(currentUser)
    console.log(req.query.sender)

    message.find({}, function(err,messages) {
        var messagesMap = []

        messages.forEach(function (singleMessage) {
            if( (singleMessage.sender == currentUser.userId && singleMessage.receiver == req.query.sender)
             || (singleMessage.sender == req.query.sender && singleMessage.receiver == currentUser.userId)){
                messagesMap.push(singleMessage);
             }
        })
        res.status(200).json(messagesMap)
        
    })
})

router.post('/sendMessage', async (req, res)=>{
    const token = req.header('x-auth-token')
    let currentUserToken = JSON.parse(Buffer.from(token.split(".")[1], "base64url"));

    const currentUser = await user.findOne({ email: currentUserToken.userEmail})
    const targetUser = await user.findOne({ userId: req.body.receiver})
    
    console.log('Send message post from:', currentUser.username, 'to:', targetUser.username, 'message:', req.body.message)
    
    const newMessage = new message({
        id : uuid.v4(),
        sender: currentUser.userId,
        senderName: currentUser.username,
        receiver: targetUser.userId,
        message: req.body.message,
        date : req.body.date,
    })
    newMessage.save()
    amqp.connect('amqp://localhost', (connError, connection) =>{
        if(connError){
            throw connError
        }
        // Create Channel
        connection.createChannel((channelError, channel) =>{
            if(channelError){
                throw channelError
            }
            // Assert Queue
            const QUEUE = 'r-service'
            channel.assertQueue(QUEUE)
            // Send message to queue
            channel.sendToQueue(QUEUE, Buffer.from(req.body.message))
            console.log(`Message send to ${QUEUE}`)
        })
    })
    res.status(200).json({msg : "Message sent"})
})

module.exports = router