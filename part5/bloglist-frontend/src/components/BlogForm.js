const BlogForm = ({ addBlog, newBlog, handleInputChange }) => (
  <div>
    <h2>create new</h2>
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type="text"
          value={newBlog.title}
          name="title"
          onChange={handleInputChange}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={newBlog.author}
          name="author"
          onChange={handleInputChange}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={newBlog.url}
          name="url"
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  </div>
)

export default BlogForm
