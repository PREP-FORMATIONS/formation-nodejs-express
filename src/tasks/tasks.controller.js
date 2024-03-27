const taskService = require('./tasks.service')

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks()
    res.json(tasks)
  } catch (error) {
    next(error)
  }
}

const getTaskById = async (req, res, next) => {
  try {
    const taskId = parseInt(req.params.id)
    const task = await taskService.getTaskById(taskId)
    res.json(task)
  } catch (error) {
    if (error.message === 'Task not found') {
      res.status(404).json({ error: error.message })
    } else {
      next(error)
    }
  }
}

const createTask = async (req, res, next) => {
  try {
    const taskData = req.body
    const newTask = await taskService.createTask(taskData)
    res.status(201).json(newTask)
  } catch (error) {
    if (error.message === 'Failed to create task') {
      res.status(400).json({ error: error.message })
    } else {
      next(error)
    }
  }
}

const updateTask = async (req, res, next) => {
  try {
    const taskId = parseInt(req.params.id)
    const taskData = req.body
    const updatedTask = await taskService.updateTask(taskId, taskData)
    res.json(updatedTask)
  } catch (error) {
    // Failed to update task
    if (error.message === 'Task not found') {
      res.status(404).json({ error: 'Failed to create task' })
    } else {
      next(error)
    }
  }
}

const deleteTask = async (req, res, next) => {
  try {
    const taskId = parseInt(req.params.id)
    const deleted = await taskService.deleteTask(taskId)

    res.sendStatus(204)
  } catch (error) {
    // Failed to update task
    if (error.message === 'Task not found') {
      res.status(404).json({ error: error.message })
    } else {
      next(error)
    }
  }
}
module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
}
