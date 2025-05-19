# JavaScript Code Review Guidelines

## Overview
This document provides guidelines for reviewing JavaScript code. It covers best practices, common pitfalls, and language-specific considerations for JavaScript development.

## Code Style and Formatting

### 1. Consistency
- Verify consistent use of quotes (single or double)
- Check for consistent semicolon usage
- Ensure consistent indentation (spaces or tabs)
- Verify consistent naming conventions
- Check for consistent brace style

### 2. Naming Conventions
- Variables and functions should use camelCase
- Classes should use PascalCase
- Constants should use UPPER_SNAKE_CASE
- Private properties should be prefixed with underscore (_property)
- Boolean variables should have prefixes like is, has, can

### 3. Formatting
- Maximum line length should be reasonable (80-120 characters)
- Use whitespace to improve readability
- Group related code blocks
- Use consistent spacing around operators
- Maintain consistent empty line usage

## Language Features

### 1. Modern JavaScript
- Prefer const and let over var
- Use template literals instead of string concatenation
- Use arrow functions for anonymous functions
- Use destructuring for objects and arrays
- Use spread/rest operators when appropriate
- Use default parameters instead of conditional assignments
- Use optional chaining (?.) for nested properties
- Use nullish coalescing (??) for default values

### 2. Functions
- Keep functions small and focused
- Limit the number of parameters (≤3 is ideal)
- Use default parameters when appropriate
- Avoid side effects when possible
- Return early to avoid deep nesting
- Use named functions instead of anonymous functions when appropriate
- Use arrow functions for lexical this binding

### 3. Objects and Classes
- Use shorthand property names when possible
- Use computed property names when appropriate
- Use method shorthand in object literals
- Prefer class syntax over prototype manipulation
- Keep classes focused on a single responsibility
- Use getters and setters appropriately
- Implement proper inheritance patterns

### 4. Arrays
- Use array methods (map, filter, reduce) instead of loops when appropriate
- Avoid mutating arrays when possible (use spread, slice, etc.)
- Use Array.isArray() to check for arrays
- Use destructuring for array values
- Use Array.from() for array-like objects

### 5. Asynchronous Code
- Prefer async/await over raw promises
- Properly handle promise rejections
- Avoid callback hell
- Use Promise.all() for parallel operations
- Use Promise.race() when appropriate
- Implement proper error handling for async operations
- Avoid mixing async styles (don't mix callbacks and promises)

## Common Issues to Check

### 1. Performance
- Check for unnecessary re-renders in UI frameworks
- Look for inefficient DOM manipulations
- Identify potential memory leaks
- Check for expensive operations in loops
- Look for redundant calculations
- Verify efficient event handling (debouncing, throttling)
- Check for proper resource cleanup

### 2. Security
- Validate user input
- Avoid eval() and new Function()
- Sanitize data before rendering to prevent XSS
- Use safe alternatives to innerHTML
- Avoid exposing sensitive information
- Check for proper authentication and authorization
- Verify secure communication (HTTPS)

### 3. Error Handling
- Verify proper try/catch blocks
- Check for unhandled promise rejections
- Ensure meaningful error messages
- Verify graceful degradation on errors
- Check for proper logging of errors
- Verify error recovery mechanisms
- Ensure user-friendly error states

### 4. Testing
- Verify adequate test coverage
- Check for proper unit tests
- Verify integration tests for critical paths
- Ensure edge cases are tested
- Check for proper mocking of dependencies
- Verify test isolation
- Check for proper test descriptions

## Framework-Specific Considerations

### 1. React
- Verify proper component structure
- Check for unnecessary re-renders
- Ensure proper use of hooks
- Verify proper state management
- Check for proper prop validation
- Ensure proper key usage in lists
- Verify proper lifecycle management

### 2. Angular
- Verify proper module organization
- Check for proper component encapsulation
- Ensure proper use of services
- Verify proper dependency injection
- Check for proper change detection strategy
- Ensure proper reactive programming practices
- Verify proper template syntax

### 3. Vue
- Verify proper component structure
- Check for proper reactivity usage
- Ensure proper lifecycle hook usage
- Verify proper directive usage
- Check for proper computed property usage
- Ensure proper event handling
- Verify proper slot usage

## Documentation and Comments

### 1. Code Comments
- Ensure complex logic is explained
- Verify TODO comments include actionable information
- Check that comments explain why, not what
- Ensure comments are up-to-date with code
- Verify proper JSDoc for public APIs
- Check for commented-out code (should be removed)
- Ensure comments add value and are not redundant

### 2. Documentation
- Verify README is comprehensive
- Check for proper API documentation
- Ensure setup instructions are clear
- Verify usage examples are provided
- Check for proper versioning information
- Ensure contribution guidelines are clear
- Verify license information is included

## Tools and Resources

### 1. Linting and Formatting
- ESLint for static code analysis
- Prettier for code formatting
- TypeScript for type checking
- JSDoc for documentation

### 2. Style Guides
- Airbnb JavaScript Style Guide
- Google JavaScript Style Guide
- StandardJS
- JavaScript Standard Style

### 3. Testing Frameworks
- Jest
- Mocha
- Jasmine
- Cypress
- Testing Library
