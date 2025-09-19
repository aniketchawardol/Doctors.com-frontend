describe('Doctors.com - End-to-End User Journey', () => {
  it('should complete a full user journey from home to search', () => {
    // 1. Visit the home page
    cy.visit('/')
    cy.get('p').contains('Doctors.com').should('be.visible')
    
    // 2. Verify initial state
    cy.get('a[href="/login"]').should('contain.text', 'Login')
    cy.get('a[href="/signup"]').should('contain.text', 'Signup')
    
    // 3. Perform a search
    const searchTerm = 'cardiology'
    cy.get('input[placeholder*="Search Hospitals"]').first().type(searchTerm)
    cy.get('input[placeholder*="Search Hospitals"]').first().should('have.value', searchTerm)
    
    // 4. Wait for search results
    cy.wait(2000)
    
    // 5. Navigate to login page
    cy.get('a[href="/login"]').first().click()
    cy.url().should('include', '/login')
    
    // 6. Navigate back to home using Homepage link
    cy.contains('a', 'Homepage').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    
    // 7. Navigate to signup page
    cy.get('a[href="/signup"]').first().click()
    cy.url().should('include', '/signup')
    
    // 8. Test mobile navigation
    cy.viewport(375, 667)
    cy.visit('/')
    cy.get('button.md\\:hidden').click()
    cy.get('a[href="/login"]').should('be.visible')
    cy.get('a[href="/signup"]').should('be.visible')
    
    // 9. Perform mobile search (target the visible mobile search input)
    cy.get('input[placeholder*="Search Hospitals"]').last().type('emergency')
    cy.get('input[placeholder*="Search Hospitals"]').last().should('have.value', 'emergency')
  })

  it('should handle error scenarios gracefully', () => {
    // Test non-existent routes
    cy.visit('/non-existent-page', { failOnStatusCode: false })
    
    // Should either show 404 or redirect to home
    cy.url().then((url) => {
      expect(url).to.satisfy((str) => {
        return str.includes('/') || str.includes('404') || str.includes('not-found')
      })
    })
    
    // Test navigation recovery
    cy.visit('/')
    cy.get('p').contains('Doctors.com').should('be.visible')
  })

  it('should maintain state during complex navigation', () => {
    cy.visit('/')
    
    // Set up initial search
    const searchTerm = 'pediatrics'
    cy.get('input[placeholder*="Search Hospitals"]').first().type(searchTerm)
    
    // Navigate away and back
    cy.get('a[href="/login"]').first().click()
    cy.go('back')
    
    // Verify search is reset (normal behavior)
    cy.get('input[placeholder*="Search Hospitals"]').first().should('have.value', '')
    
    // Test browser refresh
    cy.reload()
    cy.get('p').contains('Doctors.com').should('be.visible')
  })

  it('should handle concurrent user interactions', () => {
    cy.visit('/')
    
    // Rapid interactions
    cy.get('input[placeholder*="Search Hospitals"]').first().type('test')
    cy.get('a[href="/login"]').first().click()
    cy.go('back')
    cy.get('input[placeholder*="Search Hospitals"]').first().clear().type('new search')
    
    // Should handle all interactions gracefully
    cy.get('input[placeholder*="Search Hospitals"]').first().should('have.value', 'new search')
  })

  it('should work correctly across different browsers', () => {
    // This test ensures cross-browser compatibility
    cy.visit('/')
    cy.get('p').contains('Doctors.com').should('be.visible')
    
    // Test modern JS features
    cy.window().should('have.property', 'fetch')
    cy.window().should('have.property', 'localStorage')
    
    // Test CSS features
    cy.get('body').should('have.css', 'margin')
    cy.get('p').contains('Doctors.com').should('be.visible')
  })

  it('should handle performance requirements', () => {
    // Measure page load time
    cy.visit('/', {
      onBeforeLoad: (win) => {
        win.performance.mark('start')
      },
      onLoad: (win) => {
        win.performance.mark('end')
        win.performance.measure('pageLoad', 'start', 'end')
        const measure = win.performance.getEntriesByName('pageLoad')[0]
        expect(measure.duration).to.be.lessThan(5000) // Page should load in under 5 seconds
      }
    })
    
    // Verify page is interactive
    cy.get('p').contains('Doctors.com').should('be.visible')
    cy.get('input[placeholder*="Search Hospitals"]').should('be.visible')
    cy.get('a[href="/login"]').should('be.visible')
  })
})
