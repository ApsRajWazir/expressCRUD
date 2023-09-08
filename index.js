const express = require('express')
const app = express()
const connectToMongoDB = require('./db/connector')
const Router = require('./routes/subscribers') // For BackEnd Routing

// DB Connection
connectToMongoDB()


// To Accept Json
app.use(express.json())


app.use('/api/subscribers', Router)


// Server Listener + PORT
const PORT = 3000
app.listen(PORT,()=> console.log(`127.0.0.1:${PORT} is Listening....`))