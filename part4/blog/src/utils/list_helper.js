const dummy = (blogs) => {
    // ...
    return 1
  }


const totalLikes = (blogs) =>{
    return blogs.reduce(function(prev, cur) {
        return prev + cur.likes
    }, 0)
}
  
  module.exports = {
    dummy, totalLikes
  }