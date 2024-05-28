const express = require('express')
const {createTask,getTasks,deleteTask} = require('../controllers/taskController')

const router = express.Router()


router.get('/',getTasks)

router.post('/',createTask)

router.delete('/:id',deleteTask)


module.exports = router