const NotFoundError = require('../errors/not-found.error')
class TaskController {
  constructor(taskService) {
    this.taskService = taskService
    // Avec cette approche, pas besoin du arrow function
    // this.getAllTasks = this.getAllTasks.bind(this);
    // this.getTaskById = this.getTaskById.bind(this);
    // this.createTask = this.createTask.bind(this);
    // this.updateTask = this.updateTask.bind(this);
    // this.deleteTask = this.deleteTask.bind(this);
  }

  getAllTasks = async (req, res, next) => {
    const tasks = await this.taskService.getAllTasks()
    res.json(tasks)
  }

  getTaskById = async (req, res) => {
    // try {
      const taskId = parseInt(req.params.id)
      const task = await this.taskService.getTaskById(taskId)
      res.json(task)
    // }catch (error){
    //   next(error)
    // }
  }

  createTask = async (req, res, next) => {
    const taskData = req.body
    const newTask = await this.taskService.createTask(taskData)
    res.status(201).json(newTask)
  }

  updateTask = async (req, res, next) => {
    const taskId = parseInt(req.params.id)
    const taskData = req.body
    const updatedTask = await this.taskService.updateTask(taskId, taskData)
    res.json(updatedTask)
  }

  deleteTask = async (req, res, next) => {
    const taskId = parseInt(req.params.id)
    await this.taskService.deleteTask(taskId)
    res.sendStatus(204)
  }
}

module.exports = TaskController
