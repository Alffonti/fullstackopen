describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Alf Fonti',
      username: 'alffonti',
      password: 'secret',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('alffonti')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.contains('new note')
      cy.contains('logout')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('alffonti')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('html')
        .should('not.contain', 'new note')
        .and('not.contain', 'logout')

      cy.get('.notification')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'alffonti', password: 'secret' })
    })

    it('a blog can be created', function () {
      cy.contains('new note').click()
      cy.get('#title-input').type('Core Web Vitals best practices for SPAs')
      cy.get('#author-input').type('Brian De Sousa')
      cy.get('#url-input').type(
        'https://blog.logrocket.com/core-web-vitals-best-practices-spas/'
      )
      cy.get('#create-button').click()

      cy.contains('Core Web Vitals best practices for SPAs Brian De Sousa')

      cy.get('.notification').should(
        'contain',
        'a new blog Core Web Vitals best practices for SPAs by Brian De Sousa was added'
      )
    })

    describe('and several blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'First blog',
          author: 'Author 1',
          url: 'http://url1.com',
        })
        cy.createBlog({
          title: 'Second blog',
          author: 'Author 2',
          url: 'http://url2.com',
        })
        cy.createBlog({
          title: 'Third blog',
          author: 'Author 3',
          url: 'http://url3.com',
        })
      })

      it('a blog can be liked', function () {
        cy.contains('Second blog').find('#toggle-button').click()
        cy.contains('Second blog').parent().as('blog2')

        cy.get('@blog2').contains('likes').contains('0')
        cy.get('@blog2').find('#like-button').click()
        cy.get('@blog2').contains('likes').contains('1')
      })

      it('a blog can be deleted by its creator', function () {
        cy.contains('First blog').find('#toggle-button').click()
        cy.contains('First blog').parent().find('#delete-button').click()

        cy.get('.notification').should(
          'contain',
          'Deleted First blog by Author 1'
        )

        cy.get('html').should('not.contain', 'first blog')
      })

      it('the delete button is hidden to other users but the creator', function () {
        const user2 = {
          name: 'Arto Hellas',
          username: 'hellas',
          password: 'secret',
        }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)

        cy.contains('logout').click()
        cy.login({ username: 'hellas', password: 'secret' })
        cy.contains('First blog').find('#toggle-button').click()
        cy.contains('First blog').parent().as('blog1')

        cy.get('@blog1').should('not.contain', 'Arto Hellas')
        cy.get('@blog1').should('contain', 'Alf Fonti')
        cy.get('@blog1').should('not.contain', 'delete')
      })

      describe('and several blogs are liked', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'The title with the most likes',
            author: 'Author 4',
            url: 'http://url4.com',
          })

          cy.createBlog({
            title: 'The title with the second most likes',
            author: 'Author 5',
            url: 'http://url5.com',
          })

          cy.likeBlog('The title with the most likes', 7)
          cy.likeBlog('The title with the second most likes', 5)
        })

        it('blogs are ordered according to likes', function () {
          cy.get('.blog')
            .eq(0)
            .should('contain', 'The title with the most likes')
          cy.get('.blog')
            .eq(1)
            .should('contain', 'The title with the second most likes')
        })
      })
    })
  })
})
