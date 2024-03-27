const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getAllTasks = () => {
  return prisma.tasks.findMany()
}

const getTaskById = async (taskId) => {
  const task = await prisma.tasks.findUnique({
    where: { id: taskId }
  })
  if (!task) {
    throw new Error('Task not found')
  }
  return task
}

const createTask = (taskData) => {
  return prisma.tasks.create({
    data: taskData
  })
}

const updateTask = async (taskId, taskData) => {
  const task = await prisma.tasks.findUnique({
    where: { id: taskId }
  })
  if (!task) {
    throw new Error('Task not found')
  }
  return prisma.tasks.update({
    where: { id: taskId },
    data: taskData
  })
}

const deleteTask = async (taskId) => {
  const task = await prisma.tasks.findUnique({
    where: { id: taskId }
  })
  if (!task) {
    throw new Error('Task not found')
  }
  return prisma.tasks.delete({
    where: { id: taskId }
  })
}

// const updateTasksUserIdToNull = (userId) => {
//   return prisma.tasks.updateMany({
//     where: { user_id: userId },
//     data: { user_id: null }
//   })
// }

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
  // updateTasksUserIdToNull
}
