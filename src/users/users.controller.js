const userService = require('./users.service')

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers()
    res.json(users)
  } catch (error) {
    next(error)
  }
}

const getUserById = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id)
    const user = await userService.getUserById(userId)
    res.json(user)
  } catch (error) {
    if (error.message === 'User not found') {
      res.status(404).json({ error: error.message })
    } else {
      next()
    }
  }
}

const createUser = async (req, res, next) => {
  try {
    const userData = req.body
    const newUser = await userService.createUser(userData)
    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id)
    const userData = req.body
    const updatedUser = await userService.updateUser(userId, userData)
    res.json(updatedUser)
  } catch (error) {
    if (error.message === 'User not found') {
      res.status(404).json({ error: error.message })
    } else {
      next(error)
    }
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id)
    const deleted = await userService.deleteUser(userId)
    res.sendStatus(204)
  } catch (error) {
    if (error.message === 'User not found') {
      res.status(404).json({ error: error.message })
    } else {
      next(error)
    }
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
