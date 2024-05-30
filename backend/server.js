require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const taskRoutes = require('./routes/taskRoutes')
const userRoutes = require('./routes/userRoutes')



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


mongoose.connect(process.env.MONG_URI).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('Connected to mongodb')
    })
}).catch((error)=>{
    console.log(error)
})