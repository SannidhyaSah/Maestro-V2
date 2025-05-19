# Python Code Review Guidelines

## Overview
This document provides guidelines for reviewing Python code. It covers best practices, common pitfalls, and language-specific considerations for Python development.

## Code Style and Formatting

### 1. PEP 8 Compliance
- Verify adherence to PEP 8 style guide
- Check for proper indentation (4 spaces)
- Ensure maximum line length (79-99 characters)
- Verify proper import organization
- Check for proper whitespace usage
- Ensure proper naming conventions

### 2. Naming Conventions
- Modules should have short, lowercase names
- Classes should use CapWords (PascalCase)
- Functions and variables should use snake_case
- Constants should use UPPER_SNAKE_CASE
- Protected members should be prefixed with underscore (_var)
- Private members should be prefixed with double underscore (__var)
- Use self for first parameter in instance methods
- Use cls for first parameter in class methods

### 3. Docstrings
- Verify presence of docstrings for modules, classes, and functions
- Check for proper docstring formatting (PEP 257)
- Ensure docstrings describe purpose, parameters, and return values
- Verify examples in docstrings when appropriate
- Check for proper type hints in docstrings or annotations

## Language Features

### 1. Modern Python
- Use f-strings for string formatting (Python 3.6+)
- Use type hints (Python 3.5+)
- Use pathlib instead of os.path (Python 3.4+)
- Use dataclasses for data containers (Python 3.7+)
- Use walrus operator := when appropriate (Python 3.8+)
- Use structural pattern matching when appropriate (Python 3.10+)

### 2. Functions
- Keep functions small and focused
- Limit the number of parameters
- Use keyword arguments for clarity
- Use default parameters appropriately
- Return early to avoid deep nesting
- Use generators for large data sets
- Use decorators to factor out common functionality

### 3. Classes
- Follow the single responsibility principle
- Implement proper inheritance
- Use composition over inheritance when appropriate
- Implement proper magic methods
- Use properties instead of getters and setters
- Use class and static methods appropriately
- Implement context managers when appropriate

### 4. Collections
- Use list comprehensions instead of map/filter when appropriate
- Use dictionary comprehensions for transforming dictionaries
- Use sets for membership testing
- Use collections module for specialized data structures
- Use defaultdict, Counter, deque when appropriate
- Use enumerate() instead of manual indexing
- Use zip() for parallel iteration

### 5. Error Handling
- Use specific exception types
- Keep try blocks small
- Use context managers for resource cleanup
- Avoid bare except clauses
- Re-raise exceptions properly
- Use finally for cleanup code
- Create custom exceptions when appropriate

## Common Issues to Check

### 1. Performance
- Check for inefficient algorithms
- Look for redundant calculations
- Identify potential memory leaks
- Check for proper use of generators for large data sets
- Verify efficient string operations
- Look for proper use of lazy evaluation
- Check for unnecessary list creation

### 2. Security
- Validate user input
- Check for proper use of subprocess
- Verify secure file operations
- Look for SQL injection vulnerabilities
- Check for proper handling of sensitive data
- Verify secure deserialization
- Check for proper use of cryptography

### 3. Concurrency
- Verify proper use of threading or multiprocessing
- Check for race conditions
- Verify proper synchronization
- Look for deadlock potential
- Check for proper resource cleanup
- Verify proper error handling in concurrent code
- Check for proper use of async/await (Python 3.5+)

### 4. Testing
- Verify adequate test coverage
- Check for proper unit tests
- Verify integration tests for critical paths
- Ensure edge cases are tested
- Check for proper mocking
- Verify test isolation
- Check for proper test descriptions

## Framework-Specific Considerations

### 1. Django
- Verify proper model design
- Check for proper view implementation
- Ensure proper URL routing
- Verify proper form validation
- Check for proper template usage
- Ensure proper security practices
- Verify proper database query optimization

### 2. Flask
- Verify proper application structure
- Check for proper route definitions
- Ensure proper request handling
- Verify proper template usage
- Check for proper error handling
- Ensure proper extension usage
- Verify proper security practices

### 3. FastAPI
- Verify proper path operation definitions
- Check for proper dependency injection
- Ensure proper request validation
- Verify proper response models
- Check for proper error handling
- Ensure proper security implementation
- Verify proper documentation

## Documentation and Comments

### 1. Code Comments
- Ensure complex logic is explained
- Verify TODO comments include actionable information
- Check that comments explain why, not what
- Ensure comments are up-to-date with code
- Verify proper inline documentation
- Check for commented-out code (should be removed)
- Ensure comments add value and are not redundant

### 2. Project Documentation
- Verify README is comprehensive
- Check for proper API documentation
- Ensure setup instructions are clear
- Verify usage examples are provided
- Check for proper versioning information
- Ensure contribution guidelines are clear
- Verify license information is included

## Tools and Resources

### 1. Linting and Formatting
- Flake8 for linting
- Black for code formatting
- isort for import sorting
- mypy for static type checking
- pylint for in-depth analysis
- bandit for security linting

### 2. Style Guides
- PEP 8 (Style Guide for Python Code)
- PEP 257 (Docstring Conventions)
- Google Python Style Guide
- The Hitchhiker's Guide to Python

### 3. Testing Frameworks
- pytest
- unittest
- nose2
- hypothesis for property-based testing
