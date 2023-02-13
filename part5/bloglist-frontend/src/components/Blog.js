import { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const buttonLabel = visible ? 'hide' : 'view'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button id="toggle-button" onClick={toggleVisibility}>
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}{' '}
          <button id="like-button" onClick={handleLike}>
            like
          </button>
        </div>
        <div>{blog.user.name}</div>

        {user.username === blog.user.username && (
          <button id="delete-button" onClick={handleDelete}>
            delete
          </button>
        )}
      </div>
    </div>
  )
}

export default Blog
