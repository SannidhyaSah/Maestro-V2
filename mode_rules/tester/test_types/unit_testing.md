# Unit Testing Guidelines

## Overview
Unit testing focuses on testing individual components or functions in isolation from the rest of the system. It verifies that each unit of code performs as expected. This document provides guidelines for effective unit testing across different programming languages and frameworks.

## Key Principles

1. **Test in Isolation**: Each unit test should test a single unit of code in isolation from its dependencies.

2. **Use Mocks and Stubs**: Mock or stub external dependencies to ensure true isolation.

3. **Test Behavior, Not Implementation**: Focus on testing the expected behavior of the unit, not its internal implementation details.

4. **Keep Tests Fast**: Unit tests should execute quickly to provide rapid feedback.

5. **Follow the AAA Pattern**: Structure tests using the Arrange-Act-Assert pattern for clarity.

6. **Test Edge Cases**: Include tests for boundary conditions, error cases, and edge scenarios.

7. **Maintain Test Independence**: Tests should not depend on each other or on the order of execution.

8. **Aim for High Coverage**: Strive for high code coverage, but prioritize critical paths.

## Best Practices

### Test Structure
- Write descriptive test names that explain the expected behavior
- Group related tests using appropriate test framework features
- Keep test code clean and maintainable
- Use setup and teardown methods for common operations
- Test one concept per test

### Test Coverage
- Test all public methods and functions
- Test both positive and negative scenarios
- Test boundary conditions and edge cases
- Test error handling and exceptions
- Verify return values and state changes

### Mocking
- Mock external dependencies (databases, APIs, file systems)
- Use appropriate mocking frameworks for your language
- Reset mocks between tests
- Verify mock interactions when relevant
- Avoid excessive mocking

### Test Maintenance
- Refactor tests when refactoring code
- Keep tests up to date with code changes
- Remove obsolete tests
- Avoid test duplication
- Use test data builders and factories

## Common Unit Testing Frameworks

### JavaScript/TypeScript
- Jest
- Mocha + Chai
- Jasmine
- AVA
- Tape

### Python
- pytest
- unittest
- nose2
- doctest

### Java
- JUnit
- TestNG
- Mockito
- PowerMock

### C#
- MSTest
- NUnit
- xUnit.net
- Moq

### Ruby
- RSpec
- Minitest
- Test::Unit

### Go
- testing package
- testify
- GoConvey

## Unit Testing Templates

### JavaScript/TypeScript with Jest
```javascript
// Function to test
function sum(a, b) {
  return a + b;
}

// Tests
describe('sum function', () => {
  // Test normal case
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
  
  // Test edge case
  test('handles negative numbers', () => {
    expect(sum(-1, -2)).toBe(-3);
  });
  
  // Test error case
  test('returns NaN when inputs are not numbers', () => {
    expect(sum('1', '2')).toBeNaN();
  });
});
```

### Python with pytest
```python
# Function to test
def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

# Tests
def test_divide_normal_case():
    assert divide(10, 2) == 5
    
def test_divide_negative_numbers():
    assert divide(-10, 2) == -5
    
def test_divide_by_zero():
    import pytest
    with pytest.raises(ValueError) as exc_info:
        divide(10, 0)
    assert str(exc_info.value) == "Cannot divide by zero"
```

## Common Pitfalls to Avoid

1. **Testing Implementation Details**: Focus on behavior, not implementation.

2. **Brittle Tests**: Avoid tests that break with minor code changes.

3. **Test Duplication**: Don't repeat the same test logic multiple times.

4. **Slow Tests**: Keep unit tests fast to maintain rapid feedback.

5. **Overreliance on Mocks**: Don't mock everything; use real objects when appropriate.

6. **Insufficient Edge Case Testing**: Don't forget to test boundary conditions.

7. **Testing Private Methods Directly**: Test through public interfaces instead.

8. **Complex Test Setup**: Keep test setup simple and focused.

9. **Ignoring Test Failures**: Address test failures promptly.

10. **Testing Multiple Concerns**: Test one concept per test.

## Integration with CI/CD

- Configure unit tests to run automatically on code commits
- Set up test coverage reporting
- Establish minimum coverage thresholds
- Configure test failure notifications
- Integrate with code quality tools
