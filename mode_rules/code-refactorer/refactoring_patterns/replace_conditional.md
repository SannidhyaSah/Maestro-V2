# Replace Conditional with Polymorphism Refactoring Pattern

## Overview
The Replace Conditional with Polymorphism pattern involves replacing conditional logic (if-else statements or switch cases) with polymorphic objects that implement different behaviors through inheritance or interface implementation. This pattern is particularly useful when you have conditional logic that varies based on an object's type or state.

## When to Apply
Apply this pattern when:
- You have conditional logic that depends on an object's type or state
- The same conditional structure appears in multiple places
- You need to add new types or states frequently
- The conditional logic is complex and growing
- You want to make the code more extensible
- You're working in an object-oriented language
- You want to leverage polymorphism for cleaner design

## Benefits
- Eliminates complex conditional logic
- Makes the code more extensible (adding new types requires adding new classes, not modifying existing code)
- Improves code organization by grouping related behavior
- Reduces the risk of forgetting to update all conditional branches when adding new types
- Makes the code more maintainable and easier to understand
- Follows the Open/Closed Principle (open for extension, closed for modification)
- Reduces duplication of conditional structures

## Implementation Steps
1. **Identify the conditional logic** to be replaced
2. **Create a base class or interface** with a method that represents the varying behavior
3. **Create subclasses** for each condition branch
4. **Implement the method** in each subclass with the specific behavior for that condition
5. **Replace the conditional logic** with calls to the polymorphic method
6. **Create factory method** if needed to instantiate the appropriate subclass
7. **Test** to ensure behavior is preserved

## Example (Java)

### Before
```java
public class Bird {
    public static final int EUROPEAN = 0;
    public static final int AFRICAN = 1;
    public static final int NORWEGIAN_BLUE = 2;
    
    private int type;
    private boolean isNailed;
    private int voltage;
    private boolean isCoconut;
    
    public Bird(int type, boolean isNailed, int voltage, boolean isCoconut) {
        this.type = type;
        this.isNailed = isNailed;
        this.voltage = voltage;
        this.isCoconut = isCoconut;
    }
    
    public double getSpeed() {
        switch (type) {
            case EUROPEAN:
                return getBaseSpeed();
            case AFRICAN:
                return getBaseSpeed() - getLoadFactor() * getCoconutCount();
            case NORWEGIAN_BLUE:
                return (isNailed) ? 0 : getBaseSpeed(voltage);
            default:
                throw new RuntimeException("Should be unreachable");
        }
    }
    
    private double getBaseSpeed() {
        return 12.0;
    }
    
    private double getBaseSpeed(int voltage) {
        return Math.min(24.0, voltage * 0.5);
    }
    
    private double getLoadFactor() {
        return 9.8;
    }
    
    private int getCoconutCount() {
        return isCoconut ? 2 : 0;
    }
}
```

### After
```java
public abstract class Bird {
    protected boolean isNailed;
    protected int voltage;
    protected boolean isCoconut;
    
    public Bird(boolean isNailed, int voltage, boolean isCoconut) {
        this.isNailed = isNailed;
        this.voltage = voltage;
        this.isCoconut = isCoconut;
    }
    
    public abstract double getSpeed();
    
    protected double getBaseSpeed() {
        return 12.0;
    }
    
    protected double getLoadFactor() {
        return 9.8;
    }
    
    protected int getCoconutCount() {
        return isCoconut ? 2 : 0;
    }
}

public class EuropeanBird extends Bird {
    public EuropeanBird(boolean isNailed, int voltage, boolean isCoconut) {
        super(isNailed, voltage, isCoconut);
    }
    
    @Override
    public double getSpeed() {
        return getBaseSpeed();
    }
}

public class AfricanBird extends Bird {
    public AfricanBird(boolean isNailed, int voltage, boolean isCoconut) {
        super(isNailed, voltage, isCoconut);
    }
    
    @Override
    public double getSpeed() {
        return getBaseSpeed() - getLoadFactor() * getCoconutCount();
    }
}

public class NorwegianBlueBird extends Bird {
    public NorwegianBlueBird(boolean isNailed, int voltage, boolean isCoconut) {
        super(isNailed, voltage, isCoconut);
    }
    
    @Override
    public double getSpeed() {
        return (isNailed) ? 0 : getBaseSpeed(voltage);
    }
    
    protected double getBaseSpeed(int voltage) {
        return Math.min(24.0, voltage * 0.5);
    }
}

// Factory method to create the appropriate bird
public class BirdFactory {
    public static final int EUROPEAN = 0;
    public static final int AFRICAN = 1;
    public static final int NORWEGIAN_BLUE = 2;
    
    public static Bird createBird(int type, boolean isNailed, int voltage, boolean isCoconut) {
        switch (type) {
            case EUROPEAN:
                return new EuropeanBird(isNailed, voltage, isCoconut);
            case AFRICAN:
                return new AfricanBird(isNailed, voltage, isCoconut);
            case NORWEGIAN_BLUE:
                return new NorwegianBlueBird(isNailed, voltage, isCoconut);
            default:
                throw new RuntimeException("Unknown bird type");
        }
    }
}
```

## Example (JavaScript)

### Before
```javascript
class Shape {
  constructor(type) {
    this.type = type;
  }
  
  calculateArea() {
    switch (this.type) {
      case 'circle':
        return Math.PI * this.radius * this.radius;
      case 'rectangle':
        return this.width * this.height;
      case 'triangle':
        return (this.base * this.height) / 2;
      default:
        throw new Error('Unknown shape type');
    }
  }
  
  calculatePerimeter() {
    switch (this.type) {
      case 'circle':
        return 2 * Math.PI * this.radius;
      case 'rectangle':
        return 2 * (this.width + this.height);
      case 'triangle':
        return this.sideA + this.sideB + this.sideC;
      default:
        throw new Error('Unknown shape type');
    }
  }
}

// Usage
const circle = new Shape('circle');
circle.radius = 5;
console.log(circle.calculateArea()); // 78.54

const rectangle = new Shape('rectangle');
rectangle.width = 4;
rectangle.height = 6;
console.log(rectangle.calculateArea()); // 24
```

### After
```javascript
class Shape {
  calculateArea() {
    throw new Error('calculateArea() must be implemented by subclasses');
  }
  
  calculatePerimeter() {
    throw new Error('calculatePerimeter() must be implemented by subclasses');
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  
  calculateArea() {
    return Math.PI * this.radius * this.radius;
  }
  
  calculatePerimeter() {
    return 2 * Math.PI * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  
  calculateArea() {
    return this.width * this.height;
  }
  
  calculatePerimeter() {
    return 2 * (this.width + this.height);
  }
}

class Triangle extends Shape {
  constructor(base, height, sideA, sideB, sideC) {
    super();
    this.base = base;
    this.height = height;
    this.sideA = sideA;
    this.sideB = sideB;
    this.sideC = sideC;
  }
  
  calculateArea() {
    return (this.base * this.height) / 2;
  }
  
  calculatePerimeter() {
    return this.sideA + this.sideB + this.sideC;
  }
}

// Factory function (optional)
function createShape(type, ...args) {
  switch (type) {
    case 'circle':
      return new Circle(...args);
    case 'rectangle':
      return new Rectangle(...args);
    case 'triangle':
      return new Triangle(...args);
    default:
      throw new Error('Unknown shape type');
  }
}

// Usage
const circle = new Circle(5);
console.log(circle.calculateArea()); // 78.54

const rectangle = new Rectangle(4, 6);
console.log(rectangle.calculateArea()); // 24
```

## Example (TypeScript with Strategy Pattern)

### Before
```typescript
enum PaymentType {
  CreditCard,
  PayPal,
  BankTransfer,
  Bitcoin
}

class PaymentProcessor {
  processPayment(amount: number, type: PaymentType, details: any): boolean {
    switch (type) {
      case PaymentType.CreditCard:
        // Credit card processing logic
        console.log(`Processing credit card payment of $${amount}`);
        console.log(`Card number: ${details.cardNumber}`);
        console.log(`Expiry: ${details.expiry}`);
        console.log(`CVV: ${details.cvv}`);
        // Validate card details, connect to payment gateway, etc.
        return true;
        
      case PaymentType.PayPal:
        // PayPal processing logic
        console.log(`Processing PayPal payment of $${amount}`);
        console.log(`Email: ${details.email}`);
        // Connect to PayPal API, etc.
        return true;
        
      case PaymentType.BankTransfer:
        // Bank transfer processing logic
        console.log(`Processing bank transfer of $${amount}`);
        console.log(`Account: ${details.accountNumber}`);
        console.log(`Routing: ${details.routingNumber}`);
        // Connect to banking API, etc.
        return true;
        
      case PaymentType.Bitcoin:
        // Bitcoin processing logic
        console.log(`Processing Bitcoin payment of $${amount}`);
        console.log(`Wallet: ${details.walletId}`);
        // Connect to blockchain, etc.
        return true;
        
      default:
        throw new Error(`Unsupported payment type: ${type}`);
    }
  }
}
```

### After
```typescript
interface PaymentStrategy {
  process(amount: number, details: any): boolean;
}

class CreditCardPayment implements PaymentStrategy {
  process(amount: number, details: any): boolean {
    console.log(`Processing credit card payment of $${amount}`);
    console.log(`Card number: ${details.cardNumber}`);
    console.log(`Expiry: ${details.expiry}`);
    console.log(`CVV: ${details.cvv}`);
    // Validate card details, connect to payment gateway, etc.
    return true;
  }
}

class PayPalPayment implements PaymentStrategy {
  process(amount: number, details: any): boolean {
    console.log(`Processing PayPal payment of $${amount}`);
    console.log(`Email: ${details.email}`);
    // Connect to PayPal API, etc.
    return true;
  }
}

class BankTransferPayment implements PaymentStrategy {
  process(amount: number, details: any): boolean {
    console.log(`Processing bank transfer of $${amount}`);
    console.log(`Account: ${details.accountNumber}`);
    console.log(`Routing: ${details.routingNumber}`);
    // Connect to banking API, etc.
    return true;
  }
}

class BitcoinPayment implements PaymentStrategy {
  process(amount: number, details: any): boolean {
    console.log(`Processing Bitcoin payment of $${amount}`);
    console.log(`Wallet: ${details.walletId}`);
    // Connect to blockchain, etc.
    return true;
  }
}

class PaymentProcessor {
  private strategies: Map<string, PaymentStrategy> = new Map();
  
  constructor() {
    this.strategies.set('creditCard', new CreditCardPayment());
    this.strategies.set('paypal', new PayPalPayment());
    this.strategies.set('bankTransfer', new BankTransferPayment());
    this.strategies.set('bitcoin', new BitcoinPayment());
  }
  
  processPayment(amount: number, type: string, details: any): boolean {
    const strategy = this.strategies.get(type);
    if (!strategy) {
      throw new Error(`Unsupported payment type: ${type}`);
    }
    return strategy.process(amount, details);
  }
  
  addPaymentStrategy(type: string, strategy: PaymentStrategy): void {
    this.strategies.set(type, strategy);
  }
}
```

## Considerations
- **Class Explosion**: This pattern can lead to a proliferation of classes, especially for complex conditional logic
- **Performance**: In some cases, polymorphism might have a slight performance overhead compared to direct conditionals
- **Complexity**: For very simple conditionals, this pattern might introduce unnecessary complexity
- **Factory Method**: Consider using a factory method or factory class to create the appropriate objects
- **Strategy Pattern**: For behavior that varies independently of object type, consider the Strategy pattern
- **State Pattern**: For behavior that varies based on an object's state, consider the State pattern

## Related Patterns
- **Strategy Pattern**: Encapsulates algorithms in separate classes and makes them interchangeable
- **State Pattern**: Allows an object to alter its behavior when its internal state changes
- **Factory Method**: Creates objects without specifying the exact class to create
- **Abstract Factory**: Creates families of related objects
- **Command Pattern**: Encapsulates a request as an object, allowing parameterization of clients with different requests
