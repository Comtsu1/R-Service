const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    postId: Number,
    image : [String],
    name: {
        type: String,
       // required: true,
        trim: true,
        minLength: 1
    },
    description: {
        type: String,
        // required: true,
        // minLength: 15
    },
    location:{
        type: String,
    //    required: true,
    //   minLength: 1
    },
    price:{
        type: Number,
      //  required: true
    },
    author:{
        type: String,
      //  required: true
    },
    phoneNum:{
        type: String,
      //  required: true,
      //  minLength: 8,
        maxLength: 20
    },
    createdAt:{
        type: Date,
        default: () => Date.now(),
        immutable : true
    },
    category:{
        type: String,
        required: false
    }
})

module.exports = mongoose.model('posts', postSchema)