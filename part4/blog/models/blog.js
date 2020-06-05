const mongoose = require('mongoose')
const config = require('../utils/config')

// const mongoUrl = 'mongodb://localhost/bloglist'
const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})


module.exports = mongoose.model('Blog', blogSchema)
