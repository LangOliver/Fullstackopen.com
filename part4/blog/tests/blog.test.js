const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./blogTest_helper')
const app = require('../app')
const api = supertest(app)
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')
let token

beforeEach(async () => {
  //Remove users and populate with initialValues
  await User.deleteMany({})
  const userObjects = helper.initialUsers.map(user => new User(user))
  const userPromiseArray = userObjects.map(user => user.save())
  await Promise.all(userPromiseArray)

  // Remove all Blogs and populate it anew with initialValues
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)


  const getUsers = await api
  .get('/api/users')
  console.log('Response body', getUsers.body)
  console.log('Users', getUsers.body[0])
  console.log('Users one: ', getUsers.body[0].username)
  const userForToken = {
    username: getUsers.body[0].username,
    id: getUsers.body[0]._id,
  }

  token = jwt.sign(userForToken, process.env.SECRET)
  console.log('Token is', token)

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
  
describe('blog parameter ', () => {
  test('_id is exchanged to id', async () => {
    const response = await api.get('/api/blogs')
    response.body.map(
      blog => expect(blog.id).toBeDefined())
    response.body.map(
        blog => expect(blog._id).toBeUndefined())

})

  test('likes is set to 0 when not specified while posting a new blog', async () => {
    const newBlog = {
      title: 'Bergblog2',
      author: 'Günther Messner',
      url: 'www.nangaparbat.com'
    }
    const response = await api.post('/api/blogs')
    .set('Authorization', 'bearer ' + token)
    .send(newBlog)
  

    console.log('response', response)
    expect(response.body.likes).toBe(0)
  
  })
  test('title is missing results in a 400 Bad Request', async () => {
    const newBlog = {
      author: 'Günther Messner',
      url: 'www.nangaparbat.com',
      likes: 1
    }
    console.log('token in test title', token)
    const response = await api.post('/api/blogs')
    .set('Authorization', token)
    .send(newBlog)
    console.log('status', response.status)
    expect(response.status).toBe(400)
  
  })
  test('url is missing results in a 400 Bad Request', async () => {
    const newBlog = {
      author: 'Günther Messner',
      title: 'sometitle',
      likes: 1
    }
    const response = await api.post('/api/blogs')
    .send(newBlog)
    console.log('status', response.status)
    expect(response.status).toBe(400)
  
  })
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
  expect(blogsAtEnd).toHaveLength(helper.initialUsers.length + 1)
})


afterAll(() => {
  console.log('closing db connection')
  mongoose.connection.close()
})