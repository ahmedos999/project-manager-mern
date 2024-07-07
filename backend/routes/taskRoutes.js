const express = require('express')
const {createTask,getTasks,deleteTask,finishTask} = require('../controllers/taskController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)

router.get('/',getTasks)

router.post('/',createTask)

router.delete('/:id',deleteTask)

router.patch('/:id',finishTask)


module.exports = router