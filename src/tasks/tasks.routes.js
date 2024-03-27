const express = require('express')
const taskController = require('./tasks.controller')
const validateRequest = require('../middlewares/validation.middleware')
const createTaskSchema = require('./schemas/create-task.schema')
const updateTaskSchema = require('./schemas/update-task.schema')

const router = express.Router()

router.get('/', taskController.getAllTasks)
router.get('/:id', taskController.getTaskById)
router.post('/',validateRequest(createTaskSchema),taskController.createTask)
router.patch('/:id',validateRequest(updateTaskSchema),taskController.updateTask)
router.delete('/:id', taskController.deleteTask)

module.exports = router
