"use strict"

const express = require('express')
const tasksRoutes = require('./tasks/tasks.routes')
const usersRoutes = require('./users/users.routes')
const errorHandler = require('./middlewares/error.middleware')

const app = express()

app.use(express.json())

app.use('/api/tasks', tasksRoutes)
app.use('/api/users', usersRoutes)

app.use(errorHandler)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
