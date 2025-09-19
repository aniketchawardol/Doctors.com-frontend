// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to login as a user
Cypress.Commands.add('loginAsUser', (email, password) => {
  cy.visit('/login')
  cy.get('[data-cy=email-input]').type(email)
  cy.get('[data-cy=password-input]').type(password)
  cy.get('[data-cy=login-button]').click()
})

// Custom command to login as a hospital
Cypress.Commands.add('loginAsHospital', (email, password) => {
  cy.visit('/login')
  cy.get('[data-cy=hospital-login-tab]').click()
  cy.get('[data-cy=email-input]').type(email)
  cy.get('[data-cy=password-input]').type(password)
  cy.get('[data-cy=login-button]').click()
})

// Custom command to check if user is authenticated
Cypress.Commands.add('checkUserAuthentication', () => {
  cy.window().then((win) => {
    return win.localStorage.getItem('user')
  })
})

// Custom command to wait for page load
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('.animate-spin', { timeout: 10000 }).should('not.exist')
})

// Custom command to search hospitals
Cypress.Commands.add('searchHospitals', (searchTerm) => {
  cy.get('[data-cy=search-input]').clear().type(searchTerm)
  cy.get('[data-cy=search-input]').type('{enter}')
})

// Custom command to check navigation
Cypress.Commands.add('checkNavigation', () => {
  cy.get('[data-cy=logo]').should('be.visible')
  cy.get('[data-cy=logo]').should('contain.text', 'Doctors.com')
})
