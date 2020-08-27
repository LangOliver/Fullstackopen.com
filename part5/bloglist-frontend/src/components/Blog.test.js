import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders blog basic content', () => {
  const blog = {
    title: 'Most awesome post ever',
    author:'Oliver Lang',
    likes: 12,
    url: 'http://www.ich.ch'
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent('Most awesome post ever')
  expect(component.container).toHaveTextContent('by Oliver Lang')
})

test('renders only the blog\'s basic content', () => {
  const blog = {
    title: 'Most awesome post ever',
    author:'Oliver Lang',
    likes: 12,
    url: 'http://www.ich.ch'
  }

  const component = render(
    <Blog blog={blog} />
  )
  expect(component.container).toHaveTextContent('Most awesome post ever')
  expect(component.container).toHaveTextContent('by Oliver Lang')
  expect(component.container).not.toHaveTextContent('12')
  expect(component.container).not.toHaveTextContent('http://www.ich.ch')





})