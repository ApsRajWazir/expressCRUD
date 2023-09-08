const mongoose = require('mongoose')
const MONGO_URI = "mongodb://127.0.0.1:27017/testDB"


const connectToMongoDB = () =>{
    mongoose.connect(MONGO_URI).then(()=>{
        console.log("Connection Established")
    })
}

module.exports = connectToMongoDB;