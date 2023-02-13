import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const addBlog = event => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '' })
  }

  const handleInputChange = ({ target }) => {
    const { name, value } = target

    setNewBlog({
      ...newBlog,
      [name]: value,
    })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title-input"
            type="text"
            value={newBlog.title}
            name="title"
            onChange={handleInputChange}
            aria-label="title-input"
          />
        </div>
        <div>
          author:
          <input
            id="author-input"
            type="text"
            value={newBlog.author}
            name="author"
            onChange={handleInputChange}
            aria-label="author-input"
          />
        </div>
        <div>
          url:
          <input
            id="url-input"
            type="text"
            value={newBlog.url}
            name="url"
            onChange={handleInputChange}
            aria-label="url-input"
          />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
