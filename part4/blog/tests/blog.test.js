const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

test('blogs _id is exchanged to id', async () => {
    const response = await api.get('/api/blogs')
    response.body.map(
      blog => expect(blog.id).toBeDefined())
    response.body.map(
        blog => expect(blog._id).toBeUndefined())

})

test('blog is added to the database', async () => {
  const newBlog = {
    title: 'Bergblog2',
    author: 'Günther Messner',
    url: 'www.nangaparbat.com',
    likes: 12
  }
  await api.post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

afterAll(() => {
  console.log('closing db connection')
  mongoose.connection.close()
})