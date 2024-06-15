const express  = require('express')
const {loginUser,signupUser,getallusers} = require('../controllers/userController')


const router = express.Router()

router.post('/login',loginUser)

router.post('/signup',signupUser)

router.get('/allusers',getallusers)

module.exports = router