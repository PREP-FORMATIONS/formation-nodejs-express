const NotFoundError = require('../errors/not-found.error')

const errorHandler = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    res.status(404).json({ error: err.message })
  } else {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = errorHandler
