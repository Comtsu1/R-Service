const mongoose = require('mongoose')
//const post = require('../models/post')

const post = new mongoose.Schema({
    postId: Number,
    image : [String],
    name: {
        type: String,
        trim: true,
        minLength: 1
    },
    description: {
        type: String,
        minLength: 15
    },
    location:{
        type: String,
        minLength: 4
    },
    price:{
        type: Number,
    },
    author:{
        type: String,
    },
    phoneNum:{
        type: String,
        minLength: 8,
        maxLength: 15
    },
    createdAt:{
        type: Date,
        default: () => Date.now(),
        immutable : true
    },
    category:{
        type: String,
    }
})

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
    posts: [post],
    userId: Number,
})

module.exports = mongoose.model('userProfile', userProfileSchema)