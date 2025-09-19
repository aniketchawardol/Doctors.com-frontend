describe('Doctors.com - Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should navigate to login page', () => {
    cy.get('a[href="/login"]').first().click()
    cy.url().should('include', '/login')
    cy.title().should('eq', 'Sign In to Doctors.com')
  })

  it('should navigate to signup page', () => {
    cy.get('a[href="/signup"]').first().click()
    cy.url().should('include', '/signup')
    cy.title().should('eq', 'Sign Up to Doctors.com')
  })

  it('should navigate back to home from login', () => {
    cy.get('a[href="/login"]').first().click()
    cy.url().should('include', '/login')
    
    // Navigate back to home using the Homepage link
    cy.contains('a', 'Homepage').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('should navigate back to home from signup', () => {
    cy.get('a[href="/signup"]').first().click()
    cy.url().should('include', '/signup')
    
    // Navigate back to home using the Back to Homepage link
    cy.contains('a', 'Back to Homepage').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('should handle browser back/forward navigation', () => {
    // Navigate to login
    cy.get('a[href="/login"]').first().click()
    cy.url().should('include', '/login')
    
    // Navigate back to home and then to signup
    cy.contains('a', 'Homepage').click()
    cy.url().should('include', '/')
    cy.get('a[href="/signup"]').first().click()
    cy.url().should('include', '/signup')
    
    // Use browser back
    cy.go('back')
    cy.url().should('include', '/')
    
    // Use browser forward
    cy.go('forward')
    cy.url().should('include', '/signup')
  })

  it('should handle direct URL access', () => {
    // Direct access to login
    cy.visit('/login')
    cy.url().should('include', '/login')
    
    // Direct access to signup
    cy.visit('/signup')
    cy.url().should('include', '/signup')
    
    // Direct access to non-existent route (should handle gracefully)
    cy.visit('/non-existent-route', { failOnStatusCode: false })
    // Should either redirect or show 404 page
  })

  it('should maintain navigation state on page refresh', () => {
    cy.get('a[href="/login"]').first().click()
    cy.url().should('include', '/login')
    
    cy.reload()
    cy.url().should('include', '/login')
  })
})
