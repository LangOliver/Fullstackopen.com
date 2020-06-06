const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs',{url:1, title:1, author:1, id:1})
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  const body = request.body
  if (body.password.length < 3) {
    console.log('password is to short', body.password)
    response.status(400).json('Invalid password, must be at least 3 characters long').end()
    //TODO: generate an appropriate error object for the middleware to handle
    return
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })
  
  try {
    
     const savedUser = await user.save()
     response.json(savedUser).status(200).end()
    }
    catch(exception) {
      response.json(exception.message).status(400).end()
      next(exception)
    }
})

module.exports = usersRouter