const mongoose = require('mongoose')

const userProfileSchema = new mongoose.Schema({

    firstName:{
        type: String,
        required: true,
        trim: true,
        maxLength: 20,
        minLength: 3
    },
    secondName:{
        type: String,
        required: true,
        trim: true,
        maxLength: 20,
        minLength: 3
    },
    image : String,
    user: Number,
    description:{
        type: String,
        required: true,
        minLength: 10
    },
    phoneNum:{
        type: String,
        required: true,
        minLength: 8,
        maxLength: 15
    },
    userId: Number,
})

module.exports = mongoose.model('userProfile', userProfileSchema)