const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()


router.get("/get-reservations", async (req, res) => {
    const token = req.header('a-auth-token');
    let payload = JSON.parse(Buffer.from(token.split(".")[1], "base64url"))
    const existCheck = await user.findOne({email : payload.userEmail})

})
