# Cypress End-to-End Testing for Doctors.com

This directory contains comprehensive end-to-end tests for the Doctors.com frontend application using Cypress.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Doctors.com development server running on `http://localhost:5173`

### Installation
Cypress is already installed as a dev dependency. If you need to reinstall:

```bash
npm install --save-dev cypress start-server-and-test
```

### Running Tests

#### Interactive Mode (Recommended for Development)
```bash
# Open Cypress Test Runner
npm run cy:open

# Or run with dev server automatically
npm run e2e:open
```

#### Headless Mode (For CI/CD)
```bash
# Run all tests headlessly
npm run cy:run

# Run with dev server automatically
npm run e2e
```

#### Manual Commands
```bash
# Open Cypress Test Runner
npx cypress open

# Run tests headlessly
npx cypress run

# Run specific test file
npx cypress run --spec "cypress/e2e/home.cy.js"
```

## 📁 Test Structure

```
cypress/
├── e2e/                    # End-to-end test files
│   ├── home.cy.js         # Home page functionality
│   ├── navigation.cy.js   # Navigation and routing
│   ├── search.cy.js       # Search functionality
│   ├── auth.cy.js         # Authentication flows
│   ├── responsive.cy.js   # Responsive design
│   ├── accessibility.cy.js # Accessibility testing
│   └── user-journey.cy.js # Complete user journeys
├── fixtures/              # Test data
│   └── users.json        # User and hospital test data
├── support/               # Support files
│   ├── commands.js       # Custom Cypress commands
│   └── e2e.js           # Global configuration
└── screenshots/          # Auto-generated screenshots (on failure)
└── videos/              # Auto-generated videos (on test runs)
```

## 🧪 Test Coverage

### ✅ Implemented Tests

1. **Home Page Tests** (`home.cy.js`)
   - Page loading and rendering
   - Logo and navigation display
   - Search functionality
   - Mobile navigation
   - Loading states
   - Responsive behavior

2. **Navigation Tests** (`navigation.cy.js`)
   - Route navigation (login, signup, home)
   - Browser back/forward buttons
   - Direct URL access
   - State persistence on refresh

3. **Search Tests** (`search.cy.js`)
   - Hospital search functionality
   - Empty search handling
   - Special characters and long terms
   - Mobile search
   - Search state preservation

4. **Authentication Tests** (`auth.cy.js`)
   - Login page display and validation
   - Signup page navigation
   - Authentication state management
   - Protected route access
   - Logout functionality

5. **Responsive Design Tests** (`responsive.cy.js`)
   - Multiple viewport testing
   - Mobile, tablet, desktop layouts
   - Touch interactions
   - Orientation changes

6. **Accessibility Tests** (`accessibility.cy.js`)
   - Keyboard navigation
   - ARIA labels and roles
   - Focus management
   - Color contrast
   - Form labels
   - Screen reader support

7. **User Journey Tests** (`user-journey.cy.js`)
   - Complete user workflows
   - Error scenario handling
   - State management during navigation
   - Performance testing
   - Cross-browser compatibility

## 🛠 Custom Commands

Located in `cypress/support/commands.js`:

- `cy.loginAsUser(email, password)` - Login as a patient
- `cy.loginAsHospital(email, password)` - Login as a hospital
- `cy.checkUserAuthentication()` - Verify authentication state
- `cy.waitForPageLoad()` - Wait for loading spinners to disappear
- `cy.searchHospitals(searchTerm)` - Perform hospital search
- `cy.checkNavigation()` - Verify navigation elements

## 📊 Configuration

### Cypress Config (`cypress.config.js`)
- **Base URL**: `http://localhost:5173`
- **Viewport**: 1280x720 (default)
- **Timeouts**: 10 seconds for commands, requests, and responses
- **Video Recording**: Enabled for test runs
- **Screenshots**: Enabled on test failures
- **Spec Pattern**: `cypress/e2e/**/*.cy.{js,jsx,ts,tsx}`

### Test Data (`cypress/fixtures/users.json`)
Contains test data for:
- Test users and hospitals
- Search terms
- API endpoints

## 🚀 Running Tests in Different Environments

### Development
```bash
npm run dev        # Start dev server
npm run e2e:open   # Run tests interactively
```

### CI/CD Pipeline
```bash
npm run e2e        # Automatically starts server and runs tests
```

### Specific Test Suites
```bash
# Run only home page tests
npx cypress run --spec "cypress/e2e/home.cy.js"

# Run only responsive tests
npx cypress run --spec "cypress/e2e/responsive.cy.js"

# Run tests with specific browser
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge
```

## 📈 Best Practices Implemented

### ✅ Test Organization
- **Clear naming conventions**: Descriptive test file and test case names
- **Logical grouping**: Related tests grouped in describe blocks
- **Separation of concerns**: Different aspects tested in separate files

### ✅ Reliability
- **Proper wait strategies**: Using explicit waits instead of hard-coded delays
- **Element selection**: Using semantic selectors and data attributes
- **Error handling**: Graceful handling of missing elements and network issues

### ✅ Maintainability
- **Custom commands**: Reusable functions for common operations
- **Test data**: Centralized test data in fixtures
- **Page objects**: Implicit page object pattern through custom commands

### ✅ Performance
- **Parallel execution**: Tests can run in parallel
- **Efficient selectors**: Using optimized CSS selectors
- **Minimal setup**: Only necessary setup for each test

## 🐛 Debugging Tests

### Running Tests in Debug Mode
```bash
# Open Cypress with debug logs
DEBUG=cypress:* npm run cy:open

# Run specific test with debug output
npx cypress run --spec "cypress/e2e/home.cy.js" --reporter json
```

### Screenshots and Videos
- **Screenshots**: Automatically taken on test failures
- **Videos**: Automatically recorded for all test runs
- **Location**: `cypress/screenshots/` and `cypress/videos/`

### Browser Developer Tools
- Use `cy.debug()` in test code to pause execution
- Use `cy.log()` to add custom log messages
- Inspect elements during test execution in interactive mode

## 🔧 Troubleshooting

### Common Issues

1. **Tests failing due to timing**
   ```javascript
   // ❌ Don't use hard waits
   cy.wait(5000)
   
   // ✅ Use proper assertions
   cy.get('[data-cy=element]').should('be.visible')
   ```

2. **Element not found**
   ```javascript
   // ❌ Don't assume elements exist
   cy.get('.element').click()
   
   // ✅ Check for existence first
   cy.get('body').then(($body) => {
     if ($body.find('.element').length) {
       cy.get('.element').click()
     }
   })
   ```

3. **Flaky tests**
   - Use `cy.intercept()` to mock API calls
   - Add proper wait conditions
   - Use retry-ability features

### Performance Issues
- Check if dev server is running on correct port
- Ensure no other processes are blocking port 5173
- Clear Cypress cache: `npx cypress cache clear`

## 📚 Additional Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Testing Library Best Practices](https://testing-library.com/docs/guiding-principles/)
- [Accessibility Testing Guide](https://www.cypress.io/blog/2019/01/22/how-to-test-your-app-with-cypress-and-axe/)

## 🎯 Future Improvements

### Planned Enhancements
1. **Visual regression testing** with cypress-image-diff
2. **API testing** with comprehensive backend integration
3. **Database seeding** for consistent test data
4. **Component testing** with Cypress Component Testing
5. **Lighthouse integration** for performance auditing
6. **Cross-browser testing** with Cypress Dashboard

### Integration Opportunities
- GitHub Actions CI/CD pipeline
- Slack/Teams notifications for test results  
- Test result reporting with Mochawesome
- Code coverage integration with Cypress and Istanbul
