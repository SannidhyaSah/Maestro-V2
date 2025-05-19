# Python Testing Frameworks

## Overview
This document provides guidelines for using popular Python testing frameworks for both backend and data-oriented applications. It covers best practices, configuration tips, and example patterns for effective testing.

## pytest

### Overview
pytest is a powerful, flexible, and easy-to-use testing framework for Python that makes it easy to write small, readable tests, yet scales to support complex functional testing.

### Key Features
- Simple syntax for writing tests
- Powerful fixture system
- Parameterized testing
- Rich plugin ecosystem
- Detailed test reports
- Auto-discovery of test modules and functions
- Support for setup/teardown at multiple levels
- Parallel test execution

### Installation
```bash
pip install pytest
```

### Configuration
Basic configuration in `pytest.ini`:
```ini
[pytest]
testpaths = tests
python_files = test_*.py
python_classes = Test*
python_functions = test_*
markers =
    slow: marks tests as slow (deselect with '-m "not slow"')
    integration: marks tests as integration tests
addopts = -v
```

### Best Practices
1. **Test Organization**
   - Use clear naming conventions for test files, classes, and functions
   - Group related tests in classes
   - Use descriptive test names that explain the expected behavior
   - Organize tests by feature or component

2. **Fixtures**
   - Use fixtures for test setup and teardown
   - Define fixtures at the appropriate scope (function, class, module, session)
   - Use fixture factories for parameterized setup
   - Compose fixtures for complex setup

3. **Assertions**
   - Use pytest's built-in assertions
   - Provide meaningful error messages
   - Use appropriate assertion helpers for complex comparisons
   - Consider using the `pytest-check` plugin for multiple assertions

4. **Parameterized Tests**
   - Use `@pytest.mark.parametrize` for data-driven tests
   - Use clear parameter names
   - Group related test cases
   - Consider using external data sources for large test sets

### Example Test
```python
import pytest
from app.calculator import Calculator

class TestCalculator:
    @pytest.fixture
    def calculator(self):
        """Return a Calculator instance."""
        return Calculator()
    
    def test_add(self, calculator):
        """Test that addition works with positive numbers."""
        assert calculator.add(2, 3) == 5
    
    def test_add_negative(self, calculator):
        """Test that addition works with negative numbers."""
        assert calculator.add(-1, -2) == -3
        assert calculator.add(-1, 5) == 4
    
    @pytest.mark.parametrize("a, b, expected", [
        (1, 2, 3),
        (0, 0, 0),
        (-1, 1, 0),
        (10, -5, 5)
    ])
    def test_add_parametrized(self, calculator, a, b, expected):
        """Test addition with various inputs."""
        assert calculator.add(a, b) == expected
    
    def test_divide(self, calculator):
        """Test that division works for regular cases."""
        assert calculator.divide(10, 2) == 5
    
    def test_divide_by_zero(self, calculator):
        """Test that division by zero raises an error."""
        with pytest.raises(ValueError) as excinfo:
            calculator.divide(5, 0)
        assert "Cannot divide by zero" in str(excinfo.value)
    
    @pytest.mark.slow
    def test_complex_calculation(self, calculator):
        """Test a more complex calculation that might be slow."""
        # This is a hypothetical slow test
        result = calculator.complex_operation(100)
        assert result > 0

class TestCalculatorWithMock:
    def test_with_dependency(self, mocker):
        """Test a method that has a dependency we want to mock."""
        # Mock the dependency
        mock_service = mocker.Mock()
        mock_service.get_value.return_value = 5
        
        # Create calculator with the mock
        calculator = Calculator(service=mock_service)
        
        # Test the method that uses the dependency
        result = calculator.calculate_with_service(10)
        
        # Verify the result and the interaction
        assert result == 15
        mock_service.get_value.assert_called_once()
```

## unittest

### Overview
unittest is Python's built-in testing framework, inspired by JUnit. It provides a rich set of tools for constructing and running tests.

### Key Features
- Test discovery
- Test fixtures
- Test suites
- Test runners
- Assertions
- Skip decorators
- Subtest context manager

### Best Practices
1. **Test Organization**
   - Organize tests in classes that inherit from `unittest.TestCase`
   - Use descriptive method names starting with `test_`
   - Group related tests in the same class
   - Use docstrings to describe test purpose

2. **Setup and Teardown**
   - Use `setUp` and `tearDown` for per-test setup and cleanup
   - Use `setUpClass` and `tearDownClass` for class-level setup and cleanup
   - Use `setUpModule` and `tearDownModule` for module-level setup and cleanup

3. **Assertions**
   - Use the appropriate assertion method for each case
   - Provide meaningful error messages
   - Use `subTest` for parameterized tests

4. **Test Independence**
   - Ensure tests are independent and can run in any order
   - Avoid shared state between tests
   - Clean up resources in tearDown methods

### Example Test
```python
import unittest
from unittest.mock import Mock, patch
from app.user_service import UserService

class TestUserService(unittest.TestCase):
    def setUp(self):
        """Set up test fixtures before each test method."""
        self.user_repository = Mock()
        self.email_service = Mock()
        self.user_service = UserService(
            user_repository=self.user_repository,
            email_service=self.email_service
        )
    
    def tearDown(self):
        """Clean up after each test method."""
        pass
    
    def test_create_user_success(self):
        """Test user creation with valid data."""
        # Arrange
        user_data = {
            "email": "test@example.com",
            "name": "Test User",
            "password": "password123"
        }
        self.user_repository.exists_by_email.return_value = False
        self.user_repository.save.return_value = {"id": 1, **user_data}
        
        # Act
        result = self.user_service.create_user(user_data)
        
        # Assert
        self.assertEqual(result["id"], 1)
        self.assertEqual(result["email"], "test@example.com")
        self.user_repository.exists_by_email.assert_called_once_with("test@example.com")
        self.user_repository.save.assert_called_once()
        self.email_service.send_welcome_email.assert_called_once_with("test@example.com")
    
    def test_create_user_existing_email(self):
        """Test user creation with an email that already exists."""
        # Arrange
        user_data = {
            "email": "existing@example.com",
            "name": "Test User",
            "password": "password123"
        }
        self.user_repository.exists_by_email.return_value = True
        
        # Act & Assert
        with self.assertRaises(ValueError) as context:
            self.user_service.create_user(user_data)
        
        self.assertIn("already exists", str(context.exception))
        self.user_repository.exists_by_email.assert_called_once_with("existing@example.com")
        self.user_repository.save.assert_not_called()
        self.email_service.send_welcome_email.assert_not_called()
    
    def test_get_user_by_id_found(self):
        """Test retrieving a user by ID when the user exists."""
        # Arrange
        user_id = 1
        expected_user = {"id": user_id, "name": "Test User", "email": "test@example.com"}
        self.user_repository.find_by_id.return_value = expected_user
        
        # Act
        result = self.user_service.get_user_by_id(user_id)
        
        # Assert
        self.assertEqual(result, expected_user)
        self.user_repository.find_by_id.assert_called_once_with(user_id)
    
    def test_get_user_by_id_not_found(self):
        """Test retrieving a user by ID when the user does not exist."""
        # Arrange
        user_id = 999
        self.user_repository.find_by_id.return_value = None
        
        # Act & Assert
        with self.assertRaises(ValueError) as context:
            self.user_service.get_user_by_id(user_id)
        
        self.assertIn("not found", str(context.exception))
        self.user_repository.find_by_id.assert_called_once_with(user_id)
    
    @patch('app.user_service.generate_password_hash')
    def test_password_hashing(self, mock_hash_function):
        """Test that passwords are properly hashed during user creation."""
        # Arrange
        mock_hash_function.return_value = "hashed_password"
        user_data = {
            "email": "test@example.com",
            "name": "Test User",
            "password": "password123"
        }
        self.user_repository.exists_by_email.return_value = False
        
        # Act
        self.user_service.create_user(user_data)
        
        # Assert
        mock_hash_function.assert_called_once_with("password123")
        # Verify the saved user has the hashed password
        saved_user = self.user_repository.save.call_args[0][0]
        self.assertEqual(saved_user["password_hash"], "hashed_password")
        self.assertNotIn("password", saved_user)

if __name__ == '__main__':
    unittest.main()
```

## Behave (BDD)

### Overview
Behave is a behavior-driven development (BDD) framework for Python, similar to Cucumber. It allows you to write tests in a natural language style, backed by Python code.

### Key Features
- Natural language test descriptions (Gherkin syntax)
- Step definitions in Python
- Feature files for test scenarios
- Tags for test organization
- Hooks for setup and teardown
- Scenario outlines for parameterized tests
- Rich reporting options

### Installation
```bash
pip install behave
```

### Project Structure
```
features/
  steps/
    user_steps.py
  environment.py
  user_management.feature
```

### Best Practices
1. **Feature Files**
   - Write clear, concise feature descriptions
   - Focus on business value in feature descriptions
   - Use declarative rather than imperative style
   - Keep scenarios independent

2. **Step Definitions**
   - Keep step definitions reusable
   - Use context to share state between steps
   - Implement proper setup and teardown
   - Use step parameters effectively

3. **Test Organization**
   - Group related scenarios in feature files
   - Use tags to categorize tests
   - Use backgrounds for common setup
   - Use scenario outlines for data-driven tests

4. **Hooks**
   - Use hooks for setup and teardown
   - Keep hooks focused and minimal
   - Use tags with hooks for selective execution
   - Clean up resources properly

### Example Feature File
```gherkin
# features/user_management.feature
Feature: User Management
  As a system administrator
  I want to manage user accounts
  So that I can control access to the system

  Background:
    Given the system has no users

  Scenario: Create a new user
    When I create a user with the following details:
      | email           | name      | password    |
      | test@example.com | Test User | password123 |
    Then the user should be created successfully
    And the user should receive a welcome email

  Scenario: Attempt to create a user with an existing email
    Given a user exists with email "existing@example.com"
    When I try to create a user with email "existing@example.com"
    Then I should get an error message containing "already exists"
    And no new user should be created

  Scenario Outline: User validation rules
    When I try to create a user with the following details:
      | email   | name   | password   |
      | <email> | <name> | <password> |
    Then I should get an error message containing "<error_message>"

    Examples:
      | email           | name      | password | error_message       |
      | invalid-email   | Test User | pass123  | Invalid email       |
      | test@example.com |           | pass123  | Name is required    |
      | test@example.com | Test User | short    | Password too short  |
```

### Example Step Definitions
```python
# features/steps/user_steps.py
from behave import given, when, then
from unittest.mock import Mock

@given('the system has no users')
def step_impl(context):
    # Set up a clean environment
    context.user_repository = Mock()
    context.email_service = Mock()
    context.user_service = UserService(
        user_repository=context.user_repository,
        email_service=context.email_service
    )
    context.user_repository.exists_by_email.return_value = False

@given('a user exists with email "{email}"')
def step_impl(context, email):
    # Mock that a user with the given email already exists
    context.user_repository.exists_by_email.side_effect = lambda e: e == email

@when('I create a user with the following details:')
def step_impl(context):
    # Get the user details from the table
    row = context.table[0]
    context.user_data = {
        "email": row['email'],
        "name": row['name'],
        "password": row['password']
    }
    
    # Mock the save method to return a user with an ID
    context.user_repository.save.return_value = {"id": 1, **context.user_data}
    
    # Try to create the user
    try:
        context.result = context.user_service.create_user(context.user_data)
        context.error = None
    except Exception as e:
        context.error = e
        context.result = None

@when('I try to create a user with email "{email}"')
def step_impl(context, email):
    # Try to create a user with the given email
    try:
        context.result = context.user_service.create_user({
            "email": email,
            "name": "Test User",
            "password": "password123"
        })
        context.error = None
    except Exception as e:
        context.error = e
        context.result = None

@when('I try to create a user with the following details:')
def step_impl(context):
    # Same as the other step, but we expect an error
    row = context.table[0]
    context.user_data = {
        "email": row['email'],
        "name": row['name'],
        "password": row['password']
    }
    
    try:
        context.result = context.user_service.create_user(context.user_data)
        context.error = None
    except Exception as e:
        context.error = e
        context.result = None

@then('the user should be created successfully')
def step_impl(context):
    # Verify that the user was created
    assert context.error is None, f"Got an error: {context.error}"
    assert context.result is not None
    assert context.result["id"] == 1
    assert context.result["email"] == context.user_data["email"]
    context.user_repository.save.assert_called_once()

@then('the user should receive a welcome email')
def step_impl(context):
    # Verify that a welcome email was sent
    context.email_service.send_welcome_email.assert_called_once_with(context.user_data["email"])

@then('I should get an error message containing "{text}"')
def step_impl(context, text):
    # Verify that we got an error with the expected message
    assert context.error is not None, "Expected an error but got none"
    assert text in str(context.error), f"Expected '{text}' in error message, got: {context.error}"

@then('no new user should be created')
def step_impl(context):
    # Verify that no user was created
    context.user_repository.save.assert_not_called()
```
