# Code Smells Identification Guide

## Overview
Code smells are indicators of potential problems in code. They are not bugs or errors but rather characteristics that suggest the code might benefit from refactoring. This guide helps identify common code smells across different programming languages and paradigms.

## Bloaters
Code smells that indicate code that has grown too large or complex.

### 1. Long Method/Function
**Signs**:
- Method/function is more than 20-30 lines of code
- Method/function performs multiple operations
- Method/function has multiple levels of abstraction
- Method/function has many parameters
- Method/function has many local variables

**Refactoring Solutions**:
- Extract Method/Function
- Replace Temp with Query
- Introduce Parameter Object
- Preserve Whole Object
- Replace Method with Method Object

### 2. Large Class
**Signs**:
- Class has many fields/properties
- Class has many methods
- Class has low cohesion (methods operate on different subsets of fields)
- Class has multiple responsibilities
- Class name is vague or too general

**Refactoring Solutions**:
- Extract Class
- Extract Subclass
- Extract Interface
- Move Method
- Move Field

### 3. Primitive Obsession
**Signs**:
- Using primitive types instead of small objects for simple tasks
- Using constants for coding information
- Using string constants as field names
- Using arrays for structured data

**Refactoring Solutions**:
- Replace Data Value with Object
- Replace Type Code with Class
- Replace Type Code with Subclasses
- Replace Array with Object
- Introduce Parameter Object

### 4. Long Parameter List
**Signs**:
- Method/function has more than 3-4 parameters
- Parameters are related and could be grouped
- Parameters are passed through multiple methods

**Refactoring Solutions**:
- Replace Parameter with Method Call
- Preserve Whole Object
- Introduce Parameter Object
- Remove Flag Argument

## Object-Orientation Abusers
Code smells that indicate incomplete or incorrect use of object-oriented programming principles.

### 1. Switch Statements
**Signs**:
- Complex switch or if-else chains
- Same switch statement appears in multiple places
- Switch based on type codes or class types

**Refactoring Solutions**:
- Replace Conditional with Polymorphism
- Replace Type Code with Subclasses
- Replace Type Code with State/Strategy
- Replace Parameter with Explicit Methods

### 2. Temporary Field
**Signs**:
- Class fields are only used in certain circumstances
- Fields are null or have default values most of the time
- Complex initialization logic for fields

**Refactoring Solutions**:
- Extract Class
- Introduce Null Object
- Move Method

### 3. Refused Bequest
**Signs**:
- Subclass uses only some of the methods and properties inherited from its parents
- Subclass overrides methods to throw exceptions or do nothing

**Refactoring Solutions**:
- Replace Inheritance with Delegation
- Extract Superclass
- Extract Interface

### 4. Alternative Classes with Different Interfaces
**Signs**:
- Two classes perform similar functions but have different method names
- Classes could be unified but have different interfaces

**Refactoring Solutions**:
- Rename Method
- Move Method
- Extract Superclass
- Extract Interface

## Change Preventers
Code smells that make software difficult to change.

### 1. Divergent Change
**Signs**:
- A class is modified for different reasons
- Changes to one feature require changes to multiple classes
- Class has multiple responsibilities

**Refactoring Solutions**:
- Extract Class
- Move Method
- Move Field

### 2. Shotgun Surgery
**Signs**:
- A single change requires modifications to many different classes
- Changes are scattered throughout the codebase
- Related functionality is spread across multiple classes

**Refactoring Solutions**:
- Move Method
- Move Field
- Inline Class

### 3. Parallel Inheritance Hierarchies
**Signs**:
- Creating a subclass in one hierarchy requires creating a subclass in another
- Hierarchies have similar structure and naming patterns

**Refactoring Solutions**:
- Move Method
- Move Field
- Consolidate hierarchies

## Dispensables
Code smells that indicate unnecessary code or complexity.

### 1. Comments
**Signs**:
- Comments explain complex, unclear, or poorly written code
- Comments are outdated or incorrect
- Comments compensate for bad naming or structure

**Refactoring Solutions**:
- Extract Method
- Rename Method
- Introduce Assertion
- Improve naming and structure

### 2. Duplicate Code
**Signs**:
- Same code structure in multiple places
- Same code in multiple classes
- Similar code with slight variations

**Refactoring Solutions**:
- Extract Method
- Extract Class
- Pull Up Method
- Form Template Method

### 3. Lazy Class
**Signs**:
- Class doesn't do enough to justify its existence
- Class has few responsibilities
- Class was useful but has been refactored to the point of triviality

**Refactoring Solutions**:
- Inline Class
- Collapse Hierarchy
- Remove redundant classes

### 4. Data Class
**Signs**:
- Class has only fields/properties and getters/setters
- Class has no behavior
- Other classes manipulate the data class extensively

**Refactoring Solutions**:
- Move Method
- Encapsulate Field
- Encapsulate Collection
- Remove Setting Method

### 5. Dead Code
**Signs**:
- Code is never executed
- Unreachable code
- Unused variables, parameters, methods, or classes
- Commented-out code

**Refactoring Solutions**:
- Delete unused code
- Remove dead parameters
- Remove unused methods and classes

### 6. Speculative Generality
**Signs**:
- Unused abstract classes or interfaces
- Unnecessary delegation
- Methods with unused parameters
- Code written for "future use"

**Refactoring Solutions**:
- Collapse Hierarchy
- Inline Class
- Remove Parameter
- Remove unused flexibility

## Couplers
Code smells that indicate excessive coupling between classes.

### 1. Feature Envy
**Signs**:
- Method uses features of another class more than its own
- Method accesses data from another object more than its own data
- Method would make more sense in another class

**Refactoring Solutions**:
- Move Method
- Extract Method
- Move behavior closer to data

### 2. Inappropriate Intimacy
**Signs**:
- Classes have too many dependencies on each other
- Classes access each other's private fields or methods
- Changes to one class frequently require changes to another

**Refactoring Solutions**:
- Move Method
- Move Field
- Extract Class
- Replace Inheritance with Delegation
- Hide Delegate

### 3. Message Chains
**Signs**:
- Object calls methods on another object, which calls methods on yet another object
- Long chains of method calls like `a.getB().getC().doSomething()`
- Client depends on navigation through object structure

**Refactoring Solutions**:
- Hide Delegate
- Extract Method
- Move Method

### 4. Middle Man
**Signs**:
- Class delegates most of its work to another class
- Class has many simple delegation methods
- Class adds little value

**Refactoring Solutions**:
- Remove Middle Man
- Inline Method
- Replace Delegation with Inheritance

## Other Smells

### 1. Incomplete Library Class
**Signs**:
- Library classes don't provide all the features you need
- You need to extend library functionality but can't modify the library

**Refactoring Solutions**:
- Introduce Foreign Method
- Introduce Local Extension

### 2. Global Data
**Signs**:
- Use of global variables or singletons
- Data accessible from anywhere in the program
- Unclear data ownership

**Refactoring Solutions**:
- Encapsulate Variable
- Encapsulate Field
- Replace Global Reference with Gateway

### 3. Mutable Data
**Signs**:
- Data that can be modified from multiple places
- Variables with unclear lifecycle
- Side effects from operations

**Refactoring Solutions**:
- Encapsulate Variable
- Split Variable
- Remove Setting Method
- Replace Derived Variable with Query
- Use immutable data structures

### 4. Mysterious Name
**Signs**:
- Names that don't clearly communicate purpose
- Cryptic abbreviations
- Generic names like "Manager", "Processor", "Data", "Info"

**Refactoring Solutions**:
- Rename Method
- Rename Variable
- Rename Class
- Rename Field

### 5. Loops
**Signs**:
- Complex loops with multiple responsibilities
- Nested loops
- Loops that could be replaced with higher-order functions

**Refactoring Solutions**:
- Replace Loop with Pipeline
- Extract Method
- Move accumulation to collecting parameter

## Conclusion
Identifying code smells is the first step in the refactoring process. Not all code smells require immediate refactoring, and the decision to refactor should be based on the impact of the smell on code quality, maintainability, and the cost of refactoring. Use this guide to identify potential issues in your code and apply appropriate refactoring patterns to improve code quality.
