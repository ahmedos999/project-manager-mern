require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const taskRoutes = require('./routes/taskRoutes')



const app = express()

// access body
app.use(express.json())

// logging
app.use((req,res,next)=>{
    console.log(req.path,res.method)
    next()
})

// route 
app.use('/api/tasks',taskRoutes)


mongoose.connect(process.env.MONG_URI).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('Connected to mongodb')
    })
}).catch((error)=>{
    console.log(error)
})