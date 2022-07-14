const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, "email is required"],
        trim: true,
        maxLength: 20
    },
    password:{
        type: String,
        required: [true, "username is required"],
        trim: true,
        minLength: [5, "password too short"]
    },
    username:{
        type: String,
        required: [true, "username is required"],
        trim: true,
        maxLength: [20, "username too long"],
        minLength: [3, "username too short"]
    },
    userId: Number
})


module.exports = mongoose.model('user', userSchema)