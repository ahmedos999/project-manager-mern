require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const taskRoutes = require('./routes/taskRoutes')
const userRoutes = require('./routes/userRoutes')
const notificationRoutes = require('./routes/notificationRoutes')

const http = require('http');
// const { initIO } = require('./middleware/socketio');


const app = express()

  


// access body
app.use(express.json())

// logging
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

// route 
app.use('/api/tasks',taskRoutes)
app.use('/api/user',userRoutes)
app.use('/api/notification',notificationRoutes)

const server = http.createServer(app);
// initIO(server);


mongoose.connect(process.env.MONG_URI).then(()=>{
    server.listen(process.env.PORT,()=>{
        console.log('Connected to mongodb and server is running')
    })
}).catch((error)=>{
    console.log(error)
})