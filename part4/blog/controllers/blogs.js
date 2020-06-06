const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    .populate('user',{username:1, name:1, id:1})
    response.json(blogs.map(blog => blog.toJSON()))
    console.log(typeof response)
  })
  
  blogsRouter.post('/', async (request, response, next) => {
    let blog = new Blog(request.body)
    // Find first user and add it as reference to the blog
    const user = await User.findOne({})
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
      try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
      }
      catch(exception) {
        next(exception)
      }
    })

  module.exports = blogsRouter