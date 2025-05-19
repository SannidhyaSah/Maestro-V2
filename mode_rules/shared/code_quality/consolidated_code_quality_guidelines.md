# Consolidated Code Quality Guidelines

This document provides comprehensive code quality guidelines that apply across all modes. It combines core code quality principles with specific guidance for code review, refactoring, and language-specific best practices.

## Code Quality Principles

### 1. Readability
- Write code that is easy to read and understand
- Use meaningful names for variables, functions, and classes
- Follow consistent formatting and style
- Include appropriate comments and documentation
- Structure code in a logical and intuitive way

### 2. Maintainability
- Write code that is easy to modify and extend
- Follow SOLID principles and design patterns
- Keep functions and classes small and focused
- Minimize dependencies between components
- Avoid duplication and promote reuse

### 3. Reliability
- Write code that works correctly under all conditions
- Handle errors and edge cases appropriately
- Include comprehensive tests
- Validate inputs and outputs
- Implement proper logging and monitoring

### 4. Performance
- Write code that is efficient and scalable
- Optimize critical paths and bottlenecks
- Consider resource usage (CPU, memory, network, disk)
- Implement appropriate caching strategies
- Use asynchronous operations where appropriate

### 5. Security
- Write code that is secure by design
- Follow secure coding practices
- Validate and sanitize all inputs
- Protect sensitive data
- Implement proper authentication and authorization

## Code Quality Metrics

### 1. Complexity Metrics
- Cyclomatic Complexity: Should not exceed 10 for any function
- Cognitive Complexity: Should not exceed 15 for any function
- Depth of Inheritance: Should not exceed 3 levels
- Number of Parameters: Should not exceed 4 for any function
- Function Length: Should not exceed 30 lines of code

### 2. Duplication Metrics
- Duplicate Code: Should not exceed 5% of codebase
- Copy-Paste Detection: Should identify and refactor duplicated logic

### 3. Test Coverage Metrics
- Line Coverage: Should exceed 80% for critical components
- Branch Coverage: Should exceed 70% for critical components
- Mutation Testing: Should achieve at least 60% mutation score

### 4. Documentation Metrics
- Public API Documentation: Should be 100% documented
- Code Comments: Should explain "why" not "what"
- README Files: Should exist for all major components

### 5. Issue Metrics
- Bug Density: Should not exceed 0.1 bugs per 100 lines of code
- Technical Debt Ratio: Should not exceed 5% of development time

## Code Review Guidelines

### 1. Functionality
- Code works as expected
- Edge cases are handled
- Error handling is appropriate
- Performance is acceptable
- Security considerations are addressed

### 2. Structure
- Code follows SOLID principles
- Classes and functions have single responsibilities
- Dependencies are minimized and explicit
- Design patterns are applied appropriately
- Code is organized logically

### 3. Style
- Code follows project style guidelines
- Naming is clear and consistent
- Formatting is consistent
- Comments are appropriate and helpful
- Documentation is complete and accurate

### 4. Tests
- Tests cover the functionality
- Tests are comprehensive and robust
- Tests are readable and maintainable
- Tests run efficiently
- Edge cases are tested

## Code Refactoring Guidelines

### 1. When to Refactor
- When adding new features to existing code
- When fixing bugs in existing code
- When code smells are identified
- When technical debt becomes a burden
- When performance issues are identified

### 2. Refactoring Techniques
- Extract Method: Move code fragment to a separate method
- Extract Class: Move related fields and methods to a new class
- Rename: Change names to better reflect purpose
- Move Method/Field: Move to a more appropriate class
- Replace Conditional with Polymorphism: Use polymorphism instead of conditionals
- Introduce Parameter Object: Replace multiple parameters with an object
- Decompose Conditional: Extract complex conditional logic into methods
- Consolidate Duplicate Code: Remove duplicated code
- Remove Dead Code: Delete unused code

### 3. Refactoring Process
- Ensure tests exist before refactoring
- Make small, incremental changes
- Run tests after each change
- Document significant refactorings
- Review refactored code

## Common Code Smells

### 1. Bloaters
- Long Method: Methods with too many lines
- Large Class: Classes with too many responsibilities
- Primitive Obsession: Using primitives instead of small objects
- Long Parameter List: Methods with too many parameters
- Data Clumps: Groups of variables that appear together

### 2. Object-Orientation Abusers
- Switch Statements: Complex conditional logic
- Temporary Field: Fields used only in certain circumstances
- Refused Bequest: Subclasses that don't use inherited methods
- Alternative Classes with Different Interfaces: Similar classes with different interfaces

### 3. Change Preventers
- Divergent Change: A class is modified for different reasons
- Shotgun Surgery: A single change requires many small changes
- Parallel Inheritance Hierarchies: Creating a subclass in one hierarchy requires creating one in another

### 4. Dispensables
- Comments: Excessive or unnecessary comments
- Duplicate Code: The same code structure in multiple places
- Lazy Class: Classes that do too little
- Data Class: Classes with only fields and getters/setters
- Dead Code: Unused code
- Speculative Generality: Unused "just in case" code

## Language-Specific Guidelines

### 1. JavaScript/TypeScript
- Use modern ES6+ features
- Prefer const and let over var
- Use async/await for asynchronous code
- Implement proper error handling for promises
- Use TypeScript for type safety
- Follow functional programming principles where appropriate
- Use appropriate design patterns

### 2. Python
- Follow PEP 8 style guide
- Use type hints
- Write docstrings for all public functions and classes
- Use list/dict comprehensions where appropriate
- Follow the Zen of Python
- Use appropriate design patterns
- Implement proper error handling

### 3. Java
- Follow standard Java naming conventions
- Use appropriate design patterns
- Implement proper exception handling
- Use streams and functional interfaces
- Follow SOLID principles
- Use appropriate collections
- Implement proper resource management

## Mode-Specific Responsibilities

Different modes have specific responsibilities related to code quality:

- **Code Reviewer**: Primary evaluator of code quality during reviews
- **Code Scanner**: Implements automated checks for code quality
- **Code Refactorer**: Improves existing code to meet quality standards
- **Backend Developer**: Applies standards to backend code
- **Frontend Developer**: Applies standards to frontend code
