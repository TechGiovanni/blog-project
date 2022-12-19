// Our custom middleware has been moved to a new utils/middleware.js module:

const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method', request.method)
  logger.info('Path', request.path)
  logger.info('Body', request.body)
  logger.info('---')
  next()
}

const unknownEndPoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error('error.message')

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'mal-formatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  return next(error)
}

module.exports = { requestLogger, unknownEndPoint, errorHandler }
