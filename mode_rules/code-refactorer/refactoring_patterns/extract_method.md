# Extract Method/Function Refactoring Pattern

## Overview
The Extract Method (or Extract Function) pattern involves taking a code fragment that can be grouped together and turning it into a method/function with a name that explains its purpose. This pattern is one of the most common and valuable refactoring techniques.

## When to Apply
Apply this pattern when:
- You have a code fragment that can be grouped together
- The code is too long and hard to understand
- The same code appears in multiple places
- A method/function is doing too many things (violating Single Responsibility Principle)
- You need to add a comment to explain what a block of code does
- You have deeply nested conditionals or loops that are hard to follow

## Benefits
- Improves code readability by giving meaningful names to code fragments
- Reduces code duplication
- Makes code more modular and easier to maintain
- Facilitates code reuse
- Makes the code's intent clearer
- Reduces method/function size, making them easier to understand
- Isolates code that might need to change for different reasons
- Makes testing easier by creating smaller, more focused units

## Implementation Steps
1. **Identify the code fragment** to be extracted
2. **Check for variables** that are:
   - Declared in the fragment but used outside it
   - Declared before the fragment but used within it
   - Modified in the fragment and used after it
3. **Determine parameters and return values**:
   - Variables used but not defined in the fragment become parameters
   - Variables modified in the fragment that are used later become return values
4. **Create a new method/function** with a descriptive name
5. **Copy the code fragment** into the new method/function
6. **Adjust local variables** as needed:
   - Replace local variables with parameters
   - Add return statements for modified variables
7. **Replace the original code fragment** with a call to the new method/function
8. **Test** to ensure behavior is preserved

## Example (JavaScript)

### Before
```javascript
function calculateInvoice(customer, orders) {
  let total = 0;
  
  // Calculate subtotal
  for (const order of orders) {
    const price = order.quantity * order.unitPrice;
    total += price;
  }
  
  // Apply discount
  if (customer.loyaltyYears > 5) {
    total *= 0.9; // 10% discount for loyal customers
  } else if (customer.loyaltyYears > 2) {
    total *= 0.95; // 5% discount for regular customers
  }
  
  // Add tax
  const tax = total * 0.2; // 20% tax rate
  total += tax;
  
  return total;
}
```

### After
```javascript
function calculateInvoice(customer, orders) {
  let subtotal = calculateSubtotal(orders);
  let discountedTotal = applyCustomerDiscount(customer, subtotal);
  let total = addTax(discountedTotal);
  return total;
}

function calculateSubtotal(orders) {
  let subtotal = 0;
  for (const order of orders) {
    const price = order.quantity * order.unitPrice;
    subtotal += price;
  }
  return subtotal;
}

function applyCustomerDiscount(customer, total) {
  if (customer.loyaltyYears > 5) {
    return total * 0.9; // 10% discount for loyal customers
  } else if (customer.loyaltyYears > 2) {
    return total * 0.95; // 5% discount for regular customers
  }
  return total;
}

function addTax(amount) {
  const tax = amount * 0.2; // 20% tax rate
  return amount + tax;
}
```

## Example (Python)

### Before
```python
def process_data(data):
    result = []
    
    # Filter invalid entries
    filtered_data = []
    for item in data:
        if item and 'id' in item and 'value' in item:
            filtered_data.append(item)
    
    # Transform data
    transformed_data = []
    for item in filtered_data:
        transformed_item = {
            'identifier': item['id'],
            'value': item['value'] * 2,
            'processed': True
        }
        transformed_data.append(transformed_item)
    
    # Sort by value
    transformed_data.sort(key=lambda x: x['value'], reverse=True)
    
    return transformed_data
```

### After
```python
def process_data(data):
    filtered_data = filter_valid_entries(data)
    transformed_data = transform_data(filtered_data)
    sorted_data = sort_by_value(transformed_data)
    return sorted_data

def filter_valid_entries(data):
    filtered_data = []
    for item in data:
        if item and 'id' in item and 'value' in item:
            filtered_data.append(item)
    return filtered_data

def transform_data(data):
    transformed_data = []
    for item in data:
        transformed_item = {
            'identifier': item['id'],
            'value': item['value'] * 2,
            'processed': True
        }
        transformed_data.append(transformed_item)
    return transformed_data

def sort_by_value(data):
    return sorted(data, key=lambda x: x['value'], reverse=True)
```

## Considerations
- **Method/Function Naming**: Choose a name that clearly describes what the method does, not how it does it
- **Method/Function Length**: Aim for methods/functions that are short and focused on a single task
- **Parameter Count**: Try to limit the number of parameters to maintain readability
- **Side Effects**: Be careful with methods that modify object state; consider returning new objects instead
- **Performance**: In performance-critical code, consider the overhead of additional method/function calls

## Related Patterns
- **Extract Class**: When a method has too many responsibilities that can be grouped
- **Inline Method**: The opposite of Extract Method, used when a method body is more obvious than the method itself
- **Replace Temp with Query**: Extract expressions used to calculate temporary variables into methods
- **Introduce Parameter Object**: When you have too many parameters, group them into an object
- **Decompose Conditional**: Extract complex conditional logic into separate methods
