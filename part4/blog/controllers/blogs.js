const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    .populate('user',{username:1, name:1, id:1})
    response.json(blogs.map(blog => blog.toJSON()))
    console.log(typeof response)
  })
  
  blogsRouter.post('/', async (request, response, next) => {
    let blog = new Blog(request.body)
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    blog.user = user._id

    try {
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog.toJSON()).end()
     }
     catch(exception) {
       next(exception)
     }      
    })

    blogsRouter.put('/:id', async (request, response, next) => {
      const blog = {
        author: request.body.author,
        title: request.body.title,
        url: request.body.url,
        likes: request.body.likes
      }
      Blog.findByIdAndUpdate(request.params.id, blog, { new: true, omitUndefined: true })
      .then(updatedBlog => {
        response.json(updatedBlog.toJSON())
      })
      .catch(error => next(error))
      })

    blogsRouter.delete('/:id', async (request, response, next) => {
      const token = request.token
      const decodedToken = jwt.verify(token, process.env.SECRET)
      if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }

    const loggedInUser = await User.findById(decodedToken.id)
    const blogFound = await Blog.findById(request.params.id)

    console.log('Login user is:',loggedInUser.id,
      'blog creator user is:', blogFound.user)

    if (blogFound.user.toString() === loggedInUser.id.toString()) {
      try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
      }
      catch(exception) {
        next(exception)
      }
    }
    else {
      return response.status(403).json({ error: 'deletion is permitted only by the owner of the blog'})
    }
     
    })

  module.exports = blogsRouter