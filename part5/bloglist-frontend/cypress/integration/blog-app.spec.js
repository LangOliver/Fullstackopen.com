
describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function() {
    cy.contains('blogs')

  })
  describe('Login', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.visit('http://localhost:3000')
    })
    it('login form is shown', function() {
      cy.contains('login').click()
      cy.get('#username')
      cy.get('#password')
      cy.get('#login-button')
    })

    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged-in')
    })
    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('totallyWrongPassword')
      cy.get('#login-button').click()
      cy.contains('wrong credentials')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {

      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({
        author: 'Blogeur',
        title: 'Tre bien blog',
        url: 'www.blog.blog',
        likes: 0
      })
    })
    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#blog-submit-button').click()
      cy.contains('test title by test')

    })
    it('A user can like a blog', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#blog-submit-button').click()
      cy.get('.blog').should('contain','test title by test')
      cy.get('.blog').contains('view').as('viewButton')
      cy.get('@viewButton').click()
      cy.get('.blog').contains('0')
      cy.get('.blogDetails').find('#like-button').as('newBlogPost-like-button')
      cy.get('@newBlogPost-like-button').click()
      cy.get('.blog').contains('1')

    })
    it('A user can delete his blog', function() {
      cy.get('.blog').contains('view').click()
      cy.get('#delete-button').click()
      cy.get('.blog').should('not.exist')

    })
  })
})






