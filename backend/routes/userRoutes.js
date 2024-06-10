const express  = require('express')
const {loginUser,signupUser} = require('../controllers/userController')
const {requireAuth} = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)

router.post('/login',loginUser)

router.post('/signup',signupUser)

module.exports = router