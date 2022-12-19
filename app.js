const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')

const app = express()
const notesRouter = require('./controllers/notes')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
// const build = require('./build/index.html')

logger.info('connected to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to mongoDB')
  })
  .catch((error) => {
    logger.error('error connected to mongoDB', error.message)
  })

app.use(cors())
// app.use(express.static(build))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app
