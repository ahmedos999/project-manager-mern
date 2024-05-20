require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')



const app = express()

// access body
app.use(express.json())

// logging
app.use((req,res,next)=>{
    console.log(req.path,res.method)
    next()
})

// route 
// app.use('/api/tasks',tasksRoutes)


mongoose.connect(process.env.MONG_URI).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('Connected to mongodb')
    })
}).catch((error)=>{
    console.log(error)
})