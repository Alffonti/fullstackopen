import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'

describe('<BlogForm/>', () => {
  test('when a new blog is created, the title, author and url are passed to the event handler', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByRole('textbox', { name: /title-input/ })
    const authorInput = screen.getByRole('textbox', { name: /author-input/ })
    const urlInput = screen.getByRole('textbox', { name: /url-input/ })
    const createButton = screen.getByRole('button', { name: /create/ })

    await user.type(titleInput, 'On let vs const')
    await user.type(authorInput, 'Dan Abramov')
    await user.type(urlInput, 'https://overreacted.io/on-let-vs-const/')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('On let vs const')
    expect(createBlog.mock.calls[0][0].author).toBe('Dan Abramov')
    expect(createBlog.mock.calls[0][0].url).toBe(
      'https://overreacted.io/on-let-vs-const/'
    )
  })
})
