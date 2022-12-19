const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  // async/await in the backend
  const blog = await Blog.find({})
  res.json(blog)

  // Blog.find({}).then((blogs) => {
  //   res.json(blogs)
  // })
})

blogsRouter.post('/', async (req, res, next) => {
  const body = req.body

  const post = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
  })

  post
    .save()
    .then((savedPost) => {
      res.status(201).json(savedPost)
    })
    .catch((error) => {
      next(error)
    })
})

module.exports = blogsRouter
