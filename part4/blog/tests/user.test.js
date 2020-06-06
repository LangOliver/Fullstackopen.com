const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./userTest_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  const userObjects = helper.initialUsers
    .map(user => new User(user))
  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})

test('users are returned as json', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
})

test('all users are returned', async () => {
    const response = await api.get('/api/users')
    expect(response.body.length).toBe(helper.initialUsers.length)
  })

describe('a user ', () => {

    test('with an invalid password is not added:', async () => {
      const newUser = {
        username: 'usery',
        name: 'Der Benutzer',
        password: '12'
      }
      await api.post('/api/users')
      .send(newUser)
      const response = await api.get('/api/users')
      expect(response.body.length).toBe(helper.initialUsers.length)
      })

    test('with a missing username is not added:', async () => {
      const newUser = {
        name: 'Der Benutzer',
        password: '1223'
      }
      await api.post('/api/users')
      .send(newUser)
      const response = await api.get('/api/users')
      expect(response.body.length).toBe(helper.initialUsers.length)
     
    })

    test('with a duplicated username is not added:', async () => {
      const newUser = {
        username: 'root',
        name: 'Der Benutzer',
        password: '12345'
      }
      await api.post('/api/users')
      .send(newUser)
      const response = await api.get('/api/users')
      expect(response.body.length).toBe(helper.initialUsers.length)
     
    })
    test('with a password length < 3 returns a suitable status code and error message:', async () => {
      const newUser = {
        username: 'usery',
        name: 'Der Benutzer',
        password: '12'
      }
      const response = await api.post('/api/users')
      .send(newUser)
      expect(response.status).toBe(400)
    })

    test('with valid attributes is added:', async () => {
      const newUser = {
        username: 'usery',
        name: 'Der Benutzer',
        password: '1234'
      }
      await api.post('/api/users')
      .send(newUser)
      const response = await api.get('/api/users')
      expect(response.body.length).toBe(helper.initialUsers.length+1)
      })
})

  



afterAll(() => {
  console.log('closing db connection')
  mongoose.connection.close()
})