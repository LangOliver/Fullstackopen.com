import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

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

test('renders the blog\s url and likes when the show button is clicked', () => {
  const blog = {
    title: 'Most awesome post ever',
    author:'Oliver Lang',
    likes: 12,
    url: 'http://www.ich.ch'
  }

  const component = render(
    <Blog blog={blog} />)

  const button = component.getByText('view')
  fireEvent.click(button)

  const div = component.container.querySelector('.blogDetails')
  expect(div).toHaveTextContent('12')
  expect(div).toHaveTextContent('http://www.ich.ch')

  component.debug()



})

test('when the like button is clicked twice, the event handler the component received as props is called twice.', () => {
  const blog = {
    title: 'Most awesome post ever',
    author:'Oliver Lang',
    likes: 12,
    url: 'http://www.ich.ch'
  }

  const updateBlog = jest.fn()

  const component = render(
    <Blog blog={blog} updateBlog={updateBlog} />)

  const button = component.getByText('view')
  fireEvent.click(button)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  expect(updateBlog.mock.calls).toHaveLength(2)
  component.debug()
})

test('blog form calls the event handler it receives as props', () => {
  const blog = {
    title: 'Most awesome post ever',
    author:'Oliver Lang',
    likes: 12,
    url: 'http://www.ich.ch'
  }

  const createBlog = () => {

  }

  const component = render(
    <BlogForm createBlog={createBlog}/>)
  component.debug()
  const form = component.container.querySelector('form')
  fireEvent.submit(form)

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  expect(author.onChange).toBeDefined
  expect(title.onChange).toBeDefined

})
