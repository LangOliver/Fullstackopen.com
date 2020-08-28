import React,{ useState, useImperativeHandle } from 'react'

const Blog = React.forwardRef((props, ref) => {

  const [showDetails, setShowDetails] = useState(false)
  const [currentBlog, setBlog] = useState(props.blog)

  const toggleDetails = () => {
    console.log('ToggleDetails')
    setShowDetails(!showDetails)
  }

  useImperativeHandle(ref, () => {
    return {
      setBlog
    }
  })

  const like = () => {
    console.log('like called')
    currentBlog.likes = currentBlog.likes + 1
    console.log('Likes', currentBlog.likes)
    props.updateBlog(ref, currentBlog)
  }

  const deletePost = () => {
    props.deleteBlog(ref, currentBlog)

  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogDetails = () => (

    <div className='blogDetails'>
      {currentBlog.url}<br></br>
      {currentBlog.likes}<button id='like-button' type="submit" onClick={like}>like</button><br></br>
      {currentBlog.author}<br></br><button id='delete-button' type="submit" onClick={deletePost}>delete</button>
    </div>
  )

  return (
    <div style ={blogStyle} className='blog'>
      {currentBlog.title} by {currentBlog.author}<button onClick={toggleDetails}>view</button>
      <br></br>
      {showDetails ?
        blogDetails() : ''}

    </div>
  )
})

export default Blog
