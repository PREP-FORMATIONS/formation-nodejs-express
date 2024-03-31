const rateLimit = require('express-rate-limit')

// Middleware de limitation de débit
module.exports = rateLimit({
  // windowMs: 15 * 60 * 1000, // 15 minutes
  windowMs: 10000, // 10 secondes(par 10 secondes, on a droit à max 5 requêtes)
  max: 5, // Limite chaque IP à 100 requêtes par fenêtre
  message:
    'Trop de requêtes effectuées depuis cette IP, veuillez réessayer plus tard'
})
