# JavaScript/TypeScript Refactoring Guidelines

## Overview
This document provides language-specific refactoring guidelines for JavaScript and TypeScript codebases. It covers common code smells, refactoring patterns, and best practices specific to these languages.

## Common JavaScript/TypeScript Code Smells

### 1. Callback Hell (Pyramid of Doom)
Deeply nested callbacks that make code hard to read and maintain.

```javascript
// Code smell
getData(function(a) {
  getMoreData(a, function(b) {
    getEvenMoreData(b, function(c) {
      getYetEvenMoreData(c, function(d) {
        // And so on...
      });
    });
  });
});
```

### 2. Large Functions/Methods
Functions that do too much or are too long.

### 3. Duplicate Code
Similar code structures repeated throughout the codebase.

### 4. Global Variables
Excessive use of global variables leading to potential naming conflicts and side effects.

### 5. Type Coercion Issues
Unexpected behavior due to JavaScript's automatic type coercion.

### 6. Poor Error Handling
Missing or inadequate error handling, especially in asynchronous code.

### 7. Primitive Obsession
Using primitive types instead of small objects for simple tasks.

### 8. Feature Envy
A function that uses features of another object more than its own.

### 9. Shotgun Surgery
A change that requires many small changes to many different classes.

### 10. Any Type Abuse (TypeScript)
Overuse of the `any` type, defeating the purpose of TypeScript's type system.

## JavaScript-Specific Refactoring Patterns

### 1. Replace Callbacks with Promises or Async/Await

#### Before
```javascript
function getUser(userId, callback) {
  database.query('SELECT * FROM users WHERE id = ?', [userId], function(err, result) {
    if (err) {
      callback(err);
      return;
    }
    callback(null, result[0]);
  });
}

getUser(123, function(err, user) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(user);
});
```

#### After (Promises)
```javascript
function getUser(userId) {
  return new Promise((resolve, reject) => {
    database.query('SELECT * FROM users WHERE id = ?', [userId], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result[0]);
    });
  });
}

getUser(123)
  .then(user => console.log(user))
  .catch(err => console.error(err));
```

#### After (Async/Await)
```javascript
async function getUser(userId) {
  return new Promise((resolve, reject) => {
    database.query('SELECT * FROM users WHERE id = ?', [userId], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result[0]);
    });
  });
}

async function displayUser(userId) {
  try {
    const user = await getUser(userId);
    console.log(user);
  } catch (err) {
    console.error(err);
  }
}
```

### 2. Replace Object Literals with Classes

#### Before
```javascript
function createUser(name, email) {
  return {
    name,
    email,
    displayName() {
      return this.name;
    },
    sendEmail(message) {
      console.log(`Sending ${message} to ${this.email}`);
    }
  };
}

const user = createUser('John', 'john@example.com');
```

#### After
```javascript
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  displayName() {
    return this.name;
  }
  
  sendEmail(message) {
    console.log(`Sending ${message} to ${this.email}`);
  }
}

const user = new User('John', 'john@example.com');
```

### 3. Replace Type Checking with Polymorphism

#### Before
```javascript
function calculateArea(shape) {
  if (shape.type === 'circle') {
    return Math.PI * shape.radius * shape.radius;
  } else if (shape.type === 'rectangle') {
    return shape.width * shape.height;
  } else if (shape.type === 'triangle') {
    return (shape.base * shape.height) / 2;
  }
  throw new Error('Unknown shape type');
}
```

#### After
```javascript
class Circle {
  constructor(radius) {
    this.radius = radius;
  }
  
  calculateArea() {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  
  calculateArea() {
    return this.width * this.height;
  }
}

class Triangle {
  constructor(base, height) {
    this.base = base;
    this.height = height;
  }
  
  calculateArea() {
    return (this.base * this.height) / 2;
  }
}
```

### 4. Replace Conditional with Guard Clauses

#### Before
```javascript
function getPayAmount() {
  let result;
  if (isDead) {
    result = deadAmount();
  } else {
    if (isSeparated) {
      result = separatedAmount();
    } else {
      if (isRetired) {
        result = retiredAmount();
      } else {
        result = normalAmount();
      }
    }
  }
  return result;
}
```

#### After
```javascript
function getPayAmount() {
  if (isDead) return deadAmount();
  if (isSeparated) return separatedAmount();
  if (isRetired) return retiredAmount();
  return normalAmount();
}
```

## TypeScript-Specific Refactoring Patterns

### 1. Replace Any with Proper Types

#### Before
```typescript
function processData(data: any): any {
  return {
    id: data.id,
    name: data.name,
    value: data.value * 2
  };
}
```

#### After
```typescript
interface InputData {
  id: number;
  name: string;
  value: number;
}

interface OutputData {
  id: number;
  name: string;
  value: number;
}

function processData(data: InputData): OutputData {
  return {
    id: data.id,
    name: data.name,
    value: data.value * 2
  };
}
```

### 2. Use Discriminated Unions Instead of Type Checking

#### Before
```typescript
interface Shape {
  type: string;
  [key: string]: any;
}

function calculateArea(shape: Shape): number {
  if (shape.type === 'circle') {
    return Math.PI * shape.radius * shape.radius;
  } else if (shape.type === 'rectangle') {
    return shape.width * shape.height;
  } else if (shape.type === 'triangle') {
    return (shape.base * shape.height) / 2;
  }
  throw new Error('Unknown shape type');
}
```

#### After
```typescript
interface Circle {
  type: 'circle';
  radius: number;
}

interface Rectangle {
  type: 'rectangle';
  width: number;
  height: number;
}

interface Triangle {
  type: 'triangle';
  base: number;
  height: number;
}

type Shape = Circle | Rectangle | Triangle;

function calculateArea(shape: Shape): number {
  switch (shape.type) {
    case 'circle':
      return Math.PI * shape.radius * shape.radius;
    case 'rectangle':
      return shape.width * shape.height;
    case 'triangle':
      return (shape.base * shape.height) / 2;
  }
}
```

## Best Practices for JavaScript/TypeScript Refactoring

1. **Add Types Gradually**: When refactoring JavaScript to TypeScript, add types incrementally
2. **Use ESLint and Prettier**: Configure and use these tools to enforce consistent code style
3. **Write Tests First**: Ensure good test coverage before refactoring
4. **Use Modern Language Features**: Leverage modern JavaScript features (ES6+) when refactoring
5. **Prefer Immutability**: Use const, Object.freeze(), and immutable data patterns
6. **Avoid this Confusion**: Be careful with 'this' binding, especially in callbacks
7. **Leverage Functional Programming**: Use map, filter, reduce instead of loops when appropriate
8. **Use Module Pattern**: Organize code into modules with clear responsibilities
9. **Avoid Magic Strings/Numbers**: Replace with named constants
10. **Implement Progressive Enhancement**: Refactor to support newer features while maintaining backward compatibility

## Refactoring Tools for JavaScript/TypeScript

1. **TypeScript Compiler**: Use the TypeScript compiler to catch type errors
2. **ESLint**: Configure with rules that catch common issues
3. **Prettier**: Enforce consistent code formatting
4. **Jest**: For unit testing refactored code
5. **ts-morph**: For programmatic refactoring of TypeScript code
6. **jscodeshift**: For large-scale codebase transformations
7. **IDE Refactoring Tools**: VS Code and WebStorm have built-in refactoring capabilities

## Framework-Specific Refactoring

### React
- Extract components for reusability
- Convert class components to functional components with hooks
- Replace prop drilling with Context API or state management libraries
- Use React.memo for performance optimization
- Extract custom hooks for shared logic

### Angular
- Extract services for shared functionality
- Use OnPush change detection strategy for performance
- Leverage reactive programming with RxJS
- Implement lazy loading for modules
- Use smart and presentational component pattern

### Vue
- Extract components for reusability
- Use composition API instead of options API
- Implement Vuex modules for better state organization
- Use mixins or composition functions for shared logic
- Leverage Vue 3 features for performance improvements
