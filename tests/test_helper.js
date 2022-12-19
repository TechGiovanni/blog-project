// The same verification steps will repeat in other tests later on, and it is a good idea
// to extract these steps into helper functions. Let's add the function into a new file
// called tests/test_helper.js that is in the same directory as the test file.

const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Giovanni',
    url: 'http://google.coom',
  },
  {
    title: 'Browser can execute only Javascript',
    author: 'Giovanni',
    url: 'http://google.coom',
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'HTML is easy',
    author: 'Giovanni',
    url: 'http://google.coom',
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((note) => note.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
}
