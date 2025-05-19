# Python Refactoring Guidelines

## Overview
This document provides language-specific refactoring guidelines for Python codebases. It covers common code smells, refactoring patterns, and best practices specific to Python.

## Common Python Code Smells

### 1. Excessive Use of Lists and Dictionaries
Using basic data structures where custom classes would be more appropriate.

```python
# Code smell
user = {
    'name': 'John Doe',
    'email': 'john@example.com',
    'age': 30,
    'is_active': True
}

# Functions operating on dictionaries
def get_user_display_name(user_dict):
    return f"{user_dict['name']} ({user_dict['email']})"

def is_user_adult(user_dict):
    return user_dict['age'] >= 18
```

### 2. Long Functions
Functions that do too much or are too long.

### 3. Type Checking with isinstance()
Excessive use of type checking instead of duck typing or proper inheritance.

```python
# Code smell
def process_data(data):
    if isinstance(data, list):
        return [item * 2 for item in data]
    elif isinstance(data, dict):
        return {k: v * 2 for k, v in data.items()}
    elif isinstance(data, str):
        return data * 2
    else:
        raise TypeError("Unsupported data type")
```

### 4. Not Using Python's Built-in Features
Reimplementing functionality that's already available in Python's standard library.

### 5. Improper Exception Handling
Catching all exceptions or having empty except blocks.

```python
# Code smell
try:
    do_something()
except Exception:
    pass  # Silently ignore all errors
```

### 6. Overuse of Global Variables
Using global variables instead of proper function parameters and return values.

### 7. Not Using Context Managers
Not using `with` statements for resource management.

```python
# Code smell
f = open('file.txt', 'r')
content = f.read()
f.close()
```

### 8. Ignoring PEP 8
Not following Python's style guide, leading to inconsistent code.

## Python-Specific Refactoring Patterns

### 1. Replace Dictionary with Class

#### Before
```python
def create_user(name, email, age):
    return {
        'name': name,
        'email': email,
        'age': age,
        'is_active': True
    }

def get_user_display_name(user_dict):
    return f"{user_dict['name']} ({user_dict['email']})"

def is_user_adult(user_dict):
    return user_dict['age'] >= 18

user = create_user('John Doe', 'john@example.com', 30)
display_name = get_user_display_name(user)
```

#### After
```python
class User:
    def __init__(self, name, email, age):
        self.name = name
        self.email = email
        self.age = age
        self.is_active = True
    
    @property
    def display_name(self):
        return f"{self.name} ({self.email})"
    
    def is_adult(self):
        return self.age >= 18

user = User('John Doe', 'john@example.com', 30)
display_name = user.display_name
```

### 2. Replace Type Checking with Polymorphism

#### Before
```python
def process_data(data):
    if isinstance(data, list):
        return [item * 2 for item in data]
    elif isinstance(data, dict):
        return {k: v * 2 for k, v in data.items()}
    elif isinstance(data, str):
        return data * 2
    else:
        raise TypeError("Unsupported data type")
```

#### After
```python
from abc import ABC, abstractmethod

class DataProcessor(ABC):
    @abstractmethod
    def process(self):
        pass

class ListProcessor(DataProcessor):
    def __init__(self, data):
        self.data = data
    
    def process(self):
        return [item * 2 for item in self.data]

class DictProcessor(DataProcessor):
    def __init__(self, data):
        self.data = data
    
    def process(self):
        return {k: v * 2 for k, v in self.data.items()}

class StringProcessor(DataProcessor):
    def __init__(self, data):
        self.data = data
    
    def process(self):
        return self.data * 2

def get_processor(data):
    if isinstance(data, list):
        return ListProcessor(data)
    elif isinstance(data, dict):
        return DictProcessor(data)
    elif isinstance(data, str):
        return StringProcessor(data)
    else:
        raise TypeError("Unsupported data type")

def process_data(data):
    processor = get_processor(data)
    return processor.process()
```

### 3. Replace Exception with Conditional

#### Before
```python
def get_value(dictionary, key):
    try:
        return dictionary[key]
    except KeyError:
        return None
```

#### After
```python
def get_value(dictionary, key):
    return dictionary.get(key)
```

### 4. Use Context Managers

#### Before
```python
def read_file(filename):
    f = open(filename, 'r')
    try:
        content = f.read()
        return content
    finally:
        f.close()
```

#### After
```python
def read_file(filename):
    with open(filename, 'r') as f:
        return f.read()
```

### 5. Replace Loop with Comprehension

#### Before
```python
def double_values(numbers):
    result = []
    for number in numbers:
        result.append(number * 2)
    return result
```

#### After
```python
def double_values(numbers):
    return [number * 2 for number in numbers]
```

### 6. Replace Conditional with Dictionary Dispatch

#### Before
```python
def get_operation_result(operation, a, b):
    if operation == 'add':
        return a + b
    elif operation == 'subtract':
        return a - b
    elif operation == 'multiply':
        return a * b
    elif operation == 'divide':
        return a / b
    else:
        raise ValueError(f"Unknown operation: {operation}")
```

#### After
```python
def get_operation_result(operation, a, b):
    operations = {
        'add': lambda x, y: x + y,
        'subtract': lambda x, y: x - y,
        'multiply': lambda x, y: x * y,
        'divide': lambda x, y: x / y
    }
    
    if operation not in operations:
        raise ValueError(f"Unknown operation: {operation}")
    
    return operations[operation](a, b)
```

## Best Practices for Python Refactoring

1. **Follow PEP 8**: Adhere to Python's style guide for consistent code
2. **Use Type Hints**: Add type annotations to improve code clarity and enable static type checking
3. **Leverage Python's Standard Library**: Use built-in functions and modules instead of reinventing the wheel
4. **Embrace Duck Typing**: Focus on behavior rather than concrete types
5. **Use Properties Instead of Getters/Setters**: Leverage Python's property decorator for clean attribute access
6. **Prefer Composition Over Inheritance**: Use composition for code reuse when appropriate
7. **Use Named Tuples or Data Classes for Simple Data Structures**: Leverage these for improved readability
8. **Leverage Context Managers**: Use `with` statements for resource management
9. **Use Generators for Large Data Sets**: Replace lists with generators for memory efficiency
10. **Leverage Functional Programming Features**: Use map, filter, and reduce when appropriate

## Refactoring Tools for Python

1. **Rope**: Library for Python refactoring
2. **PyLint**: Static code analysis tool that can identify code smells
3. **Black**: Code formatter to ensure consistent style
4. **isort**: Tool to sort imports alphabetically and automatically separated into sections
5. **mypy**: Static type checker for Python
6. **pytest**: Testing framework to verify behavior preservation
7. **Sourcery**: AI-powered Python refactoring tool
8. **Flake8**: Tool for style guide enforcement
9. **Bandit**: Tool for finding security issues
10. **IDE Refactoring Tools**: PyCharm, VS Code, and other IDEs have built-in refactoring capabilities

## Framework-Specific Refactoring

### Django
- Extract reusable apps for shared functionality
- Use model inheritance appropriately
- Leverage Django's built-in features instead of custom implementations
- Move business logic from views to models or services
- Use Django forms for validation
- Implement proper model managers for query logic

### Flask
- Use Blueprints for modular applications
- Extract business logic from routes
- Implement proper factory pattern for application creation
- Use extensions for common functionality
- Leverage context locals appropriately

### FastAPI
- Leverage Pydantic models for validation
- Extract dependencies for reusable components
- Use proper path operation decorators
- Implement background tasks for long-running operations
- Leverage async/await for I/O-bound operations

## Python-Specific Code Smells

### 1. String Concatenation in Loops
Using `+=` for string concatenation in loops instead of join.

```python
# Code smell
result = ""
for item in items:
    result += str(item)
```

### 2. Not Using Enumerate
Using a counter variable instead of enumerate.

```python
# Code smell
i = 0
for item in items:
    print(f"{i}: {item}")
    i += 1
```

### 3. Not Using Zip
Using indices to iterate through multiple lists simultaneously.

```python
# Code smell
for i in range(len(names)):
    print(f"{names[i]}: {scores[i]}")
```

### 4. Reinventing the Wheel
Implementing functionality that's already in the standard library.

```python
# Code smell
def get_unique_items(items):
    result = []
    for item in items:
        if item not in result:
            result.append(item)
    return result
```

### 5. Not Using List/Dict/Set Comprehensions
Using loops where comprehensions would be more concise.

```python
# Code smell
squares = []
for i in range(10):
    squares.append(i * i)
```

### 6. Not Using Default Dict
Using complex dictionary initialization with checks.

```python
# Code smell
counts = {}
for word in words:
    if word not in counts:
        counts[word] = 0
    counts[word] += 1
```

### 7. Not Using Named Tuples or Data Classes
Using regular tuples for structured data.

```python
# Code smell
point = (10, 20)
x = point[0]
y = point[1]
```

### 8. Not Using f-strings
Using older string formatting methods.

```python
# Code smell
name = "John"
age = 30
greeting = "Hello, %s. You are %d years old." % (name, age)
```
