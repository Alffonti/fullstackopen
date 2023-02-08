import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    url: 'https://reactpatterns.com/',
    title: 'React patterns',
    author: 'Michael Chan',
    likes: 7,
    user: {
      username: 'afonti',
      name: 'Alf Fonti',
      id: '63d53fcf50b9342df226feea',
    },
    id: '63d5404b50b9342df226fef1',
  }

  const appUser = {
    username: 'afonti',
    name: 'Alf Fonti',
    id: '63d53fcf50b9342df226feea',
  }

  test('renders title and author, but does not render its URL or number of likes', () => {
    render(<Blog blog={blog} user={appUser} />)

    const element = screen.getByText('React patterns Michael Chan')
    expect(element).toBeVisible()

    const url = screen.getByText('https://reactpatterns.com/')
    expect(url).not.toBeVisible()

    const likes = screen.getByText('likes 7')
    expect(likes).not.toBeVisible()
  })

  test('after clicking the show button, url and likes are displayed', async () => {
    render(<Blog blog={blog} user={appUser} />)

    const user = userEvent.setup()
    const button = screen.getByRole('button', { name: /view/ })
    await user.click(button)

    const url = screen.getByText('https://reactpatterns.com/')
    expect(url).toBeVisible()

    const likes = screen.getByText('likes 7')
    expect(likes).toBeVisible()
  })

  test('clicking the like button twice calls the event handler twice', async () => {
    const mockHandler = jest.fn()

    render(<Blog blog={blog} user={appUser} handleLike={mockHandler} />)

    const user = userEvent.setup()
    const viewButton = screen.getByRole('button', { name: /view/ })
    await user.click(viewButton)

    const likeButton = screen.getByRole('button', { name: /like/ })
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
