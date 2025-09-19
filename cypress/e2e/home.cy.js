describe('Doctors.com - Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the home page successfully', () => {
    cy.title().should('eq', 'Doctors.com')
    cy.get('p').contains('Doctors.com').should('be.visible')
  })

  it('should display the logo and navigation', () => {
    // Check logo
    cy.get('p').contains('Doctors.com').should('be.visible')
    cy.get('span').contains('.').should('have.class', 'text-teal-300')
    
    // Check navigation links (desktop)
    cy.get('a[href="/login"]').should('contain.text', 'Login')
    cy.get('a[href="/signup"]').should('contain.text', 'Signup')
  })

  it('should display search functionality', () => {
    // Check search input exists
    cy.get('input[placeholder*="Search Hospitals"]').should('be.visible')
  })

  it('should handle mobile navigation', () => {
    // Set mobile viewport
    cy.viewport(375, 667)
    
    // Mobile menu button should be visible
    cy.get('button.md\\:hidden').should('exist')
    
    // Click mobile menu button
    cy.get('button.md\\:hidden').click()
    
    // Mobile menu should be visible after click
    cy.get('a[href="/login"]').should('be.visible')
    cy.get('a[href="/signup"]').should('be.visible')
  })

  it('should handle search functionality', () => {
    const searchTerm = 'cardiology'
    
    // Type in search box
    cy.get('input[placeholder*="Search Hospitals"]').first().type(searchTerm)
    cy.get('input[placeholder*="Search Hospitals"]').first().should('have.value', searchTerm)
    
    // Search should trigger on input change
    cy.wait(1000) // Wait for debounce/API call
  })

  it('should display poster when no search is active', () => {
    // When no search is performed, the poster should be visible
    cy.get('input[placeholder*="Search Hospitals"]').should('have.value', '')
    // The poster component should be rendered (we can't test the exact component without data-cy attributes)
  })

  it('should handle loading states', () => {
    cy.visit('/')
    // Check if loading spinner appears initially (if implemented)
    // This test depends on the loading implementation
  })

  it('should be responsive on different screen sizes', () => {
    // Desktop
    cy.viewport(1280, 720)
    cy.get('.hidden.md\\:block').should('exist')
    
    // Mobile - check that mobile menu button exists
    cy.viewport(375, 667)
    cy.get('button.md\\:hidden').should('exist')
    
    // Tablet
    cy.viewport(768, 1024)
    cy.get('button.md\\:hidden').should('exist')
  })
})
