const dummy = (blogs) => {
    // ...
    return 1
  }


const totalLikes = (blogs) =>{
    return blogs.reduce(function(prev, cur) {
        return prev + cur.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    const favoriteBlogEntry = blogs.reduce(function(prev, cur) {
        return (prev.likes > cur.likes) ? prev : cur
    }, {likes:0})
    const formattedBlogEntry = new Object() 
    formattedBlogEntry.title = favoriteBlogEntry.title
    formattedBlogEntry.author = favoriteBlogEntry.author
    formattedBlogEntry.likes = favoriteBlogEntry.likes
    return formattedBlogEntry
    
    
}
  module.exports = {
    dummy, totalLikes, favoriteBlog
  }