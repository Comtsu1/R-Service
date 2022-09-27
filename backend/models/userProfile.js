const mongoose = require('mongoose')


const userProfileSchema = new mongoose.Schema({

    firstName:{
        type: String,
        trim: true
    },
    secondName:{
        type: String,
        trim: true
    },
    image : String,
    user: Number,
    description:{
        type: String
    },
    phoneNum:{
        type: String
    },
    userId: Number,
})

module.exports = mongoose.model('userProfile', userProfileSchema)