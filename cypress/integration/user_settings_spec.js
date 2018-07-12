describe('User Settings Flow', () => {
  const timeStamp = Date.now()

  it('Changes name', () => {
    cy.login(Cypress.env('validEmail'), Cypress.env('validPassword'))
    cy.get('#root > section > header > nav.UserNav.UserNav').click({
      force: true
    })
    cy.get('#userNavDropdown > li:nth-child(3) > a').click()
    cy.get(
      '#root > section > section.AppMain.AppMain > section > div > div > article:nth-child(1) > main > input:nth-child(3)'
    ).type('name')
    cy.get(
      '#root > section > section.AppMain.AppMain > section > div > div > article:nth-child(1) > footer > button'
    ).click()
    cy.get('#notificationMessage').should('contain', 'Name updated')
  })

  it('Adds email', () => {
    cy.login(Cypress.env('validEmail'), Cypress.env('validPassword'))
    cy.get('#root > section > header > nav.UserNav.UserNav').click({
      force: true
    })
    cy.get('#userNavDropdown > li:nth-child(3) > a').click()
    cy.get(
      '#root > section > section.AppMain.AppMain > section > div > div > article:nth-child(2) > main > article > input:nth-child(2)'
    ).type('Email Name')
    cy.get(
      '#root > section > section.AppMain.AppMain > section > div > div > article:nth-child(2) > main > article > input:nth-child(4)'
    ).type('testEmail@zesty.io')
    cy.get(
      '#root > section > section.AppMain.AppMain > section > div > div > article:nth-child(2) > footer > button'
    ).click()
    cy.get('#notificationMessage').should('contain', 'Email added')
  })

  it('Removes email', () => {
    cy.login(Cypress.env('validEmail'), Cypress.env('validPassword'))
    cy.get('#root > section > header > nav.UserNav.UserNav').click({
      force: true
    })
    cy.get('#userNavDropdown > li:nth-child(3) > a').click()
    cy.get(
      '#root > section > section.AppMain.AppMain--12XTC > section > div > div > article:nth-child(2) > main'
    )
      .children('div')
      .last()
      .children('i')
      .last()
      .click()
    cy.get('#notificationMessage').should(
      'contain',
      'email successfully removed'
    )
  })

  it('Changes password', () => {
    cy.login(Cypress.env('validEmail'), Cypress.env('validPassword'))
    cy.get('#root > section > header > nav.UserNav.UserNav').click({
      force: true
    })
    cy.get('#userNavDropdown > li:nth-child(3) > a').click()
  })
})

// 2fa?
