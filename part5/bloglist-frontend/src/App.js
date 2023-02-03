import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const addBlog = async blogObject => {
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat({ ...returnedBlog, user }))

    notify(
      `a new blog ${returnedBlog.title} by ${returnedBlog.author} was added`
    )
  }

  const handleLike = async id => {
    const blog = blogs.find(blog => blog.id === id)

    const changedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      const returnedBlog = await blogService.update(id, changedBlog)
      setBlogs(
        blogs.map(blog =>
          blog.id !== id ? blog : { ...returnedBlog, user: changedBlog.user }
        )
      )
    } catch (exception) {
      notify(`The blog ${blog.title} was already deleted from our server`)
    }
  }

  const handleDelete = async id => {
    const blog = blogs.find(blog => blog.id === id)

    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)

    if (ok) {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      notify(`Deleted ${blog.title} by ${blog.author}`)
    }
  }

  const handleLogin = async event => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notify('wrong username or password', 'alert')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification} />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Toggleable>
        <BlogForm createBlog={addBlog} />
      </Toggleable>
      {}

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleLike={() => handleLike(blog.id)}
            handleDelete={() => handleDelete(blog.id)}
          />
        ))}
    </div>
  )
}

export default App
