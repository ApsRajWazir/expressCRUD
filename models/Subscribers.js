const mongoose = require('mongoose')

// Schema 1
const SubscriberSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    email:{
        type:String,
        required: true,
    },

    ChannelSubscribed:{
        type: String,
        required: true
    },

    DateOfSubscription:{
        type: String,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model("Subscriber", SubscriberSchema)