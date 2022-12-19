const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
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

beforeEach(async () => {
  await Blog.deleteMany({})
  let noteObject = new Blog(initialBlogs[0])
  await noteObject.save()
  noteObject = new Blog(initialBlogs[1])
  await noteObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('all notes are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map((r) => r.content)
  expect(contents).toContain('Browser can execute only Javascript')
})

test.only('a valid note can be added', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'test',
    url: 'http://google.coom',
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map((r) => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(contents).toContain('async/await simplifies making async calls')
})

test.only('note without content is not added', async () => {
  const newNote = {
    title: '',
    author: '',
    url: '',
  }

  await api.post('/api/blogs').send(newNote).expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})
