const express = require('express')
const {getAllUserNotification,markasRead,addNotification} = require('../controllers/notificationController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)

router.get('/',getAllUserNotification)

router.patch('/',markasRead)


router.post('/',addNotification)


module.exports = router