require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const taskRoutes = require('./routes/taskRoutes')
const userRoutes = require('./routes/userRoutes')
const notificationRoutes = require('./routes/notificationRoutes')

const cors = require('cors');
const http = require('http');
// const { initIO } = require('./middleware/socketio');


const app = express()

  

const allowedOrigins = [
    'http://localhost:3000/',
    'http://localhost:4000/',
    'https://project-manager-mern-five.vercel.app/',
    'https://project-manager-mern-hrm0.onrender.com'

  ];


  app.use(cors({
    origin: function (origin, callback) {
        console.log(origin)
      // Allow requests with no origin, like mobile apps or curl requests
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true // If you need to allow cookies or authentication headers
  }));

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