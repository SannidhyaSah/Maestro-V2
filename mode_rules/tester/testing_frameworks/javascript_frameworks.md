# JavaScript Testing Frameworks

## Overview
This document provides guidelines for using popular JavaScript testing frameworks for both frontend and backend applications. It covers best practices, configuration tips, and example patterns for effective testing.

## Jest

### Overview
Jest is a delightful JavaScript testing framework with a focus on simplicity. It works with projects using Babel, TypeScript, Node.js, React, Angular, Vue.js, and more.

### Key Features
- Zero configuration for most JavaScript projects
- Snapshot testing
- Built-in code coverage reports
- Mocking capabilities
- Parallel test execution
- Watch mode for development
- Interactive test filtering

### Installation
```bash
# Using npm
npm install --save-dev jest

# Using yarn
yarn add --dev jest
```

### Configuration
Basic configuration in `jest.config.js`:
```javascript
module.exports = {
  // The test environment that will be used for testing
  testEnvironment: 'node', // or 'jsdom' for browser-like environment
  
  // The glob patterns Jest uses to detect test files
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  
  // An array of regexp pattern strings that are matched against all test paths
  testPathIgnorePatterns: ['/node_modules/'],
  
  // Indicates whether each individual test should be reported during the run
  verbose: true,
  
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  
  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ['/node_modules/'],
  
  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['json', 'text', 'lcov', 'clover'],
};
```

### Best Practices
1. **Organize Tests Properly**
   - Keep test files close to the code they test
   - Use consistent naming conventions (e.g., `component.test.js` or `component.spec.js`)
   - Group related tests with `describe` blocks
   - Use descriptive test names that explain the expected behavior

2. **Write Focused Tests**
   - Test one concept per test
   - Follow the Arrange-Act-Assert pattern
   - Keep tests independent and isolated
   - Avoid test interdependence

3. **Use Mocks Effectively**
   - Mock external dependencies
   - Use `jest.mock()` for module mocking
   - Reset mocks between tests with `beforeEach(() => jest.clearAllMocks())`
   - Verify mock calls when relevant

4. **Leverage Jest Features**
   - Use snapshot testing for UI components
   - Implement test coverage reporting
   - Use test.each for data-driven tests
   - Leverage setup and teardown hooks

### Example Test
```javascript
// Function to test
function fetchUserData(userId) {
  return fetch(`/api/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
}

// Test file
import fetchUserData from './userService';

// Mock fetch API
global.fetch = jest.fn();

describe('User Service', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should fetch user data successfully', async () => {
    // Arrange
    const userId = '123';
    const mockUser = { id: '123', name: 'John Doe' };
    
    // Mock successful response
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockUser)
    });
    
    // Act
    const result = await fetchUserData(userId);
    
    // Assert
    expect(global.fetch).toHaveBeenCalledWith(`/api/users/${userId}`);
    expect(result).toEqual(mockUser);
  });
  
  it('should handle network errors', async () => {
    // Arrange
    const userId = '123';
    
    // Mock failed response
    global.fetch.mockResolvedValueOnce({
      ok: false
    });
    
    // Act & Assert
    await expect(fetchUserData(userId)).rejects.toThrow('Network response was not ok');
    expect(global.fetch).toHaveBeenCalledWith(`/api/users/${userId}`);
  });
});
```

## Mocha + Chai

### Overview
Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser. Chai is a BDD/TDD assertion library that can be paired with any JavaScript testing framework.

### Key Features
- Flexible and extensible
- Supports multiple assertion styles (should, expect, assert)
- Supports asynchronous testing
- Test fixture support
- Test coverage reporting (with Istanbul/nyc)
- Customizable reporting

### Installation
```bash
# Using npm
npm install --save-dev mocha chai

# Using yarn
yarn add --dev mocha chai
```

### Configuration
Basic configuration in `package.json`:
```json
{
  "scripts": {
    "test": "mocha 'tests/**/*.js'"
  },
  "mocha": {
    "require": ["@babel/register"],
    "reporter": "spec",
    "timeout": 5000
  }
}
```

### Best Practices
1. **Choose an Assertion Style**
   - Select one assertion style (should, expect, or assert) and use it consistently
   - The "expect" style is often preferred for its clarity

2. **Organize Tests Properly**
   - Use nested `describe` blocks to group related tests
   - Use descriptive test names with `it` or `test`
   - Keep test files organized by feature or component

3. **Handle Asynchronous Code**
   - Use async/await for asynchronous tests
   - Return promises from test functions
   - Use done callback for callback-style async code

4. **Use Hooks Effectively**
   - Use `before` and `after` for one-time setup and teardown
   - Use `beforeEach` and `afterEach` for per-test setup and teardown
   - Keep hooks focused and minimal

### Example Test
```javascript
// Module to test
const Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => {
    if (b === 0) throw new Error('Division by zero');
    return a / b;
  }
};

// Test file
const { expect } = require('chai');
const Calculator = require('../src/calculator');

describe('Calculator', () => {
  describe('add', () => {
    it('should add two positive numbers correctly', () => {
      expect(Calculator.add(2, 3)).to.equal(5);
    });
    
    it('should handle negative numbers', () => {
      expect(Calculator.add(-1, -2)).to.equal(-3);
      expect(Calculator.add(-1, 5)).to.equal(4);
    });
  });
  
  describe('divide', () => {
    it('should divide two numbers correctly', () => {
      expect(Calculator.divide(10, 2)).to.equal(5);
    });
    
    it('should throw an error when dividing by zero', () => {
      expect(() => Calculator.divide(5, 0)).to.throw('Division by zero');
    });
  });
});
```

## Cypress

### Overview
Cypress is a next-generation front end testing tool built for the modern web. It addresses the key pain points developers and QA engineers face when testing modern applications.

### Key Features
- Time travel debugging
- Real-time reloads
- Automatic waiting
- Network traffic control
- Consistent results
- Screenshots and videos
- Cross-browser testing
- Powerful debugging

### Installation
```bash
# Using npm
npm install --save-dev cypress

# Using yarn
yarn add --dev cypress
```

### Configuration
Basic configuration in `cypress.config.js`:
```javascript
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 5000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
  },
});
```

### Best Practices
1. **Test Structure**
   - Use the App Actions pattern for setup
   - Avoid sharing state between tests
   - Use custom commands for repetitive actions
   - Leverage Cypress's automatic waiting

2. **Selectors**
   - Use data-* attributes for test selectors
   - Avoid brittle selectors like CSS classes or XPaths
   - Create reusable selectors with `cy.get()`

3. **Network Requests**
   - Use `cy.intercept()` to stub network requests
   - Verify request payloads and responses
   - Test error handling with stubbed errors

4. **Test Organization**
   - Group tests by feature or user flow
   - Use descriptive test names
   - Keep tests focused on specific behaviors
   - Use before/beforeEach hooks for setup

### Example Test
```javascript
// cypress/e2e/login.cy.js
describe('Login Page', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('/login');
  });
  
  it('should display login form', () => {
    // Verify form elements are present
    cy.get('[data-test="login-email"]').should('be.visible');
    cy.get('[data-test="login-password"]').should('be.visible');
    cy.get('[data-test="login-submit"]').should('be.visible');
  });
  
  it('should show error with invalid credentials', () => {
    // Intercept API call and mock error response
    cy.intercept('POST', '/api/login', {
      statusCode: 401,
      body: { error: 'Invalid credentials' }
    }).as('loginRequest');
    
    // Fill form with invalid credentials
    cy.get('[data-test="login-email"]').type('invalid@example.com');
    cy.get('[data-test="login-password"]').type('wrongpassword');
    cy.get('[data-test="login-submit"]').click();
    
    // Wait for API call and verify error message
    cy.wait('@loginRequest');
    cy.get('[data-test="login-error"]')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });
  
  it('should redirect to dashboard after successful login', () => {
    // Intercept API call and mock successful response
    cy.intercept('POST', '/api/login', {
      statusCode: 200,
      body: { token: 'fake-jwt-token', user: { name: 'Test User' } }
    }).as('loginRequest');
    
    // Fill form with valid credentials
    cy.get('[data-test="login-email"]').type('user@example.com');
    cy.get('[data-test="login-password"]').type('password123');
    cy.get('[data-test="login-submit"]').click();
    
    // Wait for API call and verify redirect
    cy.wait('@loginRequest');
    cy.url().should('include', '/dashboard');
    cy.get('[data-test="user-greeting"]').should('contain', 'Test User');
  });
});
```

## Testing React Components

### Testing Libraries
- React Testing Library
- Enzyme (legacy)
- Jest for snapshots

### Best Practices
1. **Test Behavior, Not Implementation**
   - Focus on what the component does, not how it's implemented
   - Test from the user's perspective
   - Avoid testing implementation details

2. **Select Elements Properly**
   - Use accessible queries (getByRole, getByLabelText, etc.)
   - Avoid querying by test IDs when possible
   - Use data-testid attributes when necessary

3. **Test User Interactions**
   - Test user events like clicks, typing, etc.
   - Verify the component responds correctly to interactions
   - Test form submissions and validations

4. **Test Rendering Logic**
   - Test conditional rendering
   - Test component with different props
   - Test error states and loading states

### Example Test with React Testing Library
```jsx
// Component to test
function Counter({ initialCount = 0 }) {
  const [count, setCount] = React.useState(initialCount);
  
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Test file
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

describe('Counter Component', () => {
  it('renders with initial count', () => {
    render(<Counter initialCount={5} />);
    expect(screen.getByText('Count: 5')).toBeInTheDocument();
  });
  
  it('increments count when increment button is clicked', () => {
    render(<Counter initialCount={0} />);
    
    // Find the increment button by its text content
    const incrementButton = screen.getByText('Increment');
    
    // Click the button
    fireEvent.click(incrementButton);
    
    // Verify the count was incremented
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });
  
  it('decrements count when decrement button is clicked', () => {
    render(<Counter initialCount={5} />);
    
    // Find the decrement button by its text content
    const decrementButton = screen.getByText('Decrement');
    
    // Click the button
    fireEvent.click(decrementButton);
    
    // Verify the count was decremented
    expect(screen.getByText('Count: 4')).toBeInTheDocument();
  });
});
```
