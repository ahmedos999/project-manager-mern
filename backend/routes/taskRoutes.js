const express = require('express')
const {createTask,getTasks,deleteTask} = require('../controllers/taskController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)

router.get('/',getTasks)

router.post('/',createTask)

router.delete('/:id',deleteTask)


module.exports = router