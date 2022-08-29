const post = require('../models/post')
const mongoose = require('mongoose')
const express = require('express')
const router  = express.Router()
const reservationSchema = require('../models/reservation.js')
const user = require('../models/modelUser.js')

router.post('/reservation', async (req, res)=>{
    const token = req.header('x-auth-token')
    let payload = JSON.parse(Buffer.from(token.split(".")[1], "base64url"));
    const existCheck = await user.findOne({email : payload.userEmail})
    const newReservation = new reservationSchema({
        from : existCheck.userId,
        to : "",
        status: 'pending'
})
})

module.exports = router