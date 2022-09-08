const post = require('../models/post')
const mongoose = require('mongoose')
const express = require('express')
const router  = express.Router()
const reservationSchema = require('../models/reservation.js')
const user = require('../models/modelUser.js')
const { v4: uuidv4 } = require('uuid');

router.post('/reservation', async (req, res)=>{
    const token = req.header('x-auth-token')
    let payload = JSON.parse(Buffer.from(token.split(".")[1], "base64url"));
    const existCheck = await user.findOne({email : payload.userEmail})
    const newReservation = new reservationSchema({
        from : existCheck.userId,
        to : req.body.user,
        status: 'pending',
        date:{
            year: req.body.date.year,
            month: req.body.date.month,
            day: req.body.date.day
        },
        reservationId: uuidv4()
})
    newReservation.save()
    res.status(200).json({msg : "reservation made"})
})

module.exports = router