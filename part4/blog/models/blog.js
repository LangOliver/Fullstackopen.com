const mongoose = require('mongoose')
const config = require('../utils/config')

// const mongoUrl = 'mongodb://localhost/bloglist'
const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type:String,
    required: false
  },
  url: {
    type: String,
    required: true
  },
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    if (returnedObject.likes === undefined) {
      returnedObject.likes = 0
    }
  }
})


module.exports = mongoose.model('Blog', blogSchema)
