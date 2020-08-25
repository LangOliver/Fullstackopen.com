import React,{ useState } from 'react'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    console.log('ToggleDetails')
    setShowDetails(!showDetails)
  }
  const like = () => {

  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogDetails = () => (
    <div>
      {blog.url}<br></br>
      {blog.likes}<button type="submit" onClick={like}>like</button><br></br>
      {blog.author}
    </div>
  )

  return (
    <div style ={blogStyle}>
      {blog.title}<button onClick={toggleDetails}>view</button>
      <br></br>
      {showDetails ?
        blogDetails() : ''}

    </div>
  )}

export default Blog
