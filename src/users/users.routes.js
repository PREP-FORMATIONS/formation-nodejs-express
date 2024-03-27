const express = require('express')
const userController = require('./users.controller')
const createUserSchema=require("./schemas/create-user.schema")
const validateRequest = require('../middlewares/validation.middleware')
const updateUserSchema = require('./schemas/update-user.schema')

const router = express.Router()

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.post('/',validateRequest(createUserSchema),userController.createUser)
router.patch('/:id',validateRequest(updateUserSchema),userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router
