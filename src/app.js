const express = require('express')
const tasksRoutes = require('./tasks/tasks.routes')
const usersRoutes = require('./users/users.routes')
const prismaErrorHandler=require("./no-use-prisma.error.handling")

const app = express()

app.use(express.json())

app.use('/api/tasks', tasksRoutes)
app.use('/api/users', usersRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
