Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
    cy.visit('') // reloads the page
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: {
      title,
      author,
      url,
    },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('loggedBlogappUser')).token
      }`,
    },
  })
  cy.visit('') // reloads the page
})

Cypress.Commands.add('likeBlog', (title, likes) => {
  cy.contains(title).as('blog')
  cy.get('@blog').find('#toggle-button').click()

  for (let i = 0; i < likes; i++) {
    cy.get('@blog')
      .parent()
      .find('#like-button')
      .parent()
      .contains(`${i}`)
      .as('buttonParent')

    cy.get('@buttonParent')
      .find('#like-button', { timeout: 3000 })
      .should('be.visible')
      .click()
  }
})
