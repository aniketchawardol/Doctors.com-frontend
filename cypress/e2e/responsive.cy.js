describe('Doctors.com - Responsive Design', () => {
  const viewports = [
    { device: 'mobile', width: 375, height: 667 },
    { device: 'tablet', width: 768, height: 1024 },
    { device: 'desktop', width: 1280, height: 720 },
    { device: 'large-desktop', width: 1920, height: 1080 }
  ]

  viewports.forEach(({ device, width, height }) => {
    describe(`${device} (${width}x${height})`, () => {
      beforeEach(() => {
        cy.viewport(width, height)
        cy.visit('/')
      })

      it('should display correctly on ' + device, () => {
        // Logo should always be visible
        cy.get('p').contains('Doctors.com').should('be.visible')
        
        if (width < 768) {
          // Mobile: menu button should exist
          cy.get('button.md\\:hidden').should('exist')
          // Desktop nav should be hidden
          cy.get('.hidden.md\\:block').should('not.be.visible')
        } else {
          // Desktop/tablet: full nav should be visible
          cy.get('.hidden.md\\:block').should('be.visible')
          // Mobile menu button should not be visible on larger screens
          cy.get('button.md\\:hidden').should('not.be.visible')
        }
      })

      it('should handle search input on ' + device, () => {
        if (width < 768) {
          // Mobile: search in mobile menu
          cy.get('button.md\\:hidden').click()
          cy.get('input[placeholder*="Search Hospitals"]').should('be.visible')
        } else {
          // Desktop: search in main nav
          cy.get('input[placeholder*="Search Hospitals"]').should('be.visible')
        }
      })

      it('should handle navigation on ' + device, () => {
        if (width < 768) {
          // Mobile: navigation in mobile menu
          cy.get('button.md\\:hidden').click()
          cy.get('a[href="/login"]').should('be.visible')
          cy.get('a[href="/signup"]').should('be.visible')
        } else {
          // Desktop: navigation in main nav
          cy.get('a[href="/login"]').should('be.visible')
          cy.get('a[href="/signup"]').should('be.visible')
        }
      })
    })
  })

  it('should handle orientation changes', () => {
    // Test landscape on mobile
    cy.viewport(667, 375)
    cy.visit('/')
    cy.get('p').contains('Doctors.com').should('be.visible')
    
    // Test portrait on mobile
    cy.viewport(375, 667)
    cy.get('p').contains('Doctors.com').should('be.visible')
  })

  it('should maintain functionality across screen sizes', () => {
    const searchTerm = 'test'
    
    // Test search functionality on different screen sizes
    // Start with desktop view
    cy.viewport(1280, 720)
    cy.visit('/')
    cy.get('input[placeholder*="Search Hospitals"]').first().type(searchTerm)
    cy.get('input[placeholder*="Search Hospitals"]').first().should('have.value', searchTerm)
    
    // Resize to mobile and test mobile search
    cy.viewport(375, 667)
    cy.get('button.md\\:hidden').click()
    cy.get('input[placeholder*="Search Hospitals"]').should('be.visible')
  })

  it('should handle touch interactions on mobile', () => {
    cy.viewport(375, 667)
    cy.visit('/')
    
    // Test touch on mobile menu - use click after touch events
    cy.get('button.md\\:hidden').trigger('touchstart').trigger('touchend').click()
    
    // Wait for mobile menu to appear and check for login link
    cy.get('div.md\\:hidden a[href="/login"]').should('be.visible')
  })
})
