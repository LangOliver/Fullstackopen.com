import React, {useState} from 'react'

const BlogForm = ({ createBlog}) => {
    const [title, setTitle] = useState('') 
    const [author, setAuthor] = useState('') 
    const [url, setURL] = useState('') 

    
    const addBlog = (event) => {
        event.preventDefault()
        console.log('addBlogg function called, handle the object creation')
        createBlog({
            author: author,
            title: title,
            url: url
        })
        setTitle('')
        setAuthor('')
        setURL('')
    }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
      <div>
         title
           <input
           type="text"
           value={title}
           name="title"
           onChange={({ target }) => {
               setTitle(target.value)
            }
            }
     
        />
        </div>
        <div>
          author
            <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => {
                setAuthor(target.value)
            }
            }
          />
        </div>
        <div>
          url
            <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => {
                setURL(target.value)
            }
            }
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm