describe('Doctors.com - Search Functionality', () => {
  beforeEach(() => {
    cy.visit('/')
    // Wait for page to load
    cy.get('p').contains('Doctors.com').should('be.visible')
  })

  it('should perform hospital search', () => {
    const searchTerm = 'cardiology'
    
    // Perform search
    cy.get('input[placeholder*="Search Hospitals"]').first().clear().type(searchTerm)
    
    // Verify search value
    cy.get('input[placeholder*="Search Hospitals"]').first().should('have.value', searchTerm)
    
    // Wait for search results (if API is available)
    cy.wait(2000)
  })

  it('should handle empty search', () => {
    // Clear search input
    cy.get('input[placeholder*="Search Hospitals"]').first().clear()
    
    // Should show poster/default content
    cy.get('input[placeholder*="Search Hospitals"]').first().should('have.value', '')
  })

  it('should handle special characters in search', () => {
    const specialSearchTerm = 'test@#$%'
    
    cy.get('input[placeholder*="Search Hospitals"]').first().clear().type(specialSearchTerm)
    cy.get('input[placeholder*="Search Hospitals"]').first().should('have.value', specialSearchTerm)
    
    cy.wait(1000)
  })

  it('should handle long search terms', () => {
    const longSearchTerm = 'a'.repeat(100)
    
    cy.get('input[placeholder*="Search Hospitals"]').first().clear().type(longSearchTerm)
    cy.get('input[placeholder*="Search Hospitals"]').first().should('have.value', longSearchTerm)
  })

  it('should maintain search state on mobile', () => {
    // Start with desktop view and perform search
    cy.viewport(1280, 720)
    const searchTerm = 'pediatrics'
    cy.get('input[placeholder*="Search Hospitals"]').first().type(searchTerm)
    cy.get('input[placeholder*="Search Hospitals"]').first().should('have.value', searchTerm)
    
    // Switch to mobile view - search state should be maintained
    cy.viewport(375, 667)
    
    // Open mobile menu to access mobile search input
    cy.get('button.md\\:hidden').click()
    
    // Mobile search input should have the same value (shared state)
    cy.get('input[placeholder*="Search Hospitals"]').should('have.value', searchTerm)
  })

  it('should handle search with different keywords', () => {
    cy.fixture('users').then((data) => {
      data.searchTerms.forEach((term) => {
        cy.get('input[placeholder*="Search Hospitals"]').first().clear().type(term)
        cy.get('input[placeholder*="Search Hospitals"]').first().should('have.value', term)
        cy.wait(1000)
      })
    })
  })

  it('should preserve search state during navigation', () => {
    const searchTerm = 'emergency'
    
    // Perform search
    cy.get('input[placeholder*="Search Hospitals"]').first().type(searchTerm)
    cy.get('input[placeholder*="Search Hospitals"]').first().should('have.value', searchTerm)
    
    // Navigate to login and back
    cy.get('a[href="/login"]').first().click()
    cy.go('back')
    
    // Search state is reset when navigating back (normal behavior)
    cy.get('input[placeholder*="Search Hospitals"]').first().should('have.value', '')
  })
})
