const mongoose = require('mongoose')

const Reservation = new mongoose.Schema({
    from:{
        type: String,
    },
    to:{
        type: String
    },
    date:{
        type: Date
    },
    status:{
        type: String
    }
})

module.exports = mongoose.model('reservation', Reservation)