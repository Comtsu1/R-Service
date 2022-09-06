const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, "email is required"],
        trim: true,
        maxLength: 50
    },
    password:{
        type: String,
        required: [true, "username is required"],
        trim: true,
        minLength: [5, "password too short"]
    },
    userId: Number,
})

module.exports = mongoose.model('user', userSchema)