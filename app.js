const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dbConnection = require('./db/connection')
require('dotenv').config()
const loginRegister = require('./routes/loginRegister')
const port = process.env.MONGODB_URI || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", loginRegister)

app.use(express.static("public"))

// app.get("/register", (req,res) => {
//     res.sendFile(__dirname + '/public/index.html')
// })

const startConnection = async() => {
    try {
        await dbConnection(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

startConnection()

