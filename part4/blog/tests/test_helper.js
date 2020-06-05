const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Bergblog',
    author: 'Reinhold Messner',
    url: 'www.nangapartbat.com',
    likes: 1
  },
  {
    title: 'Talblog',
    author: 'Hans-Ulrich Müller',
    url: 'www.trurigdaune.ch',
    likes: -1
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovesoon', })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs: initialBlogs, nonExistingId, blogsInDb
}