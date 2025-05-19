# Extract Class/Component Refactoring Pattern

## Overview
The Extract Class (or Extract Component) pattern involves creating a new class/component and moving the relevant fields and methods from the old class into the new one. This pattern is used when a class is doing too much or has responsibilities that would be better organized as a separate class.

## When to Apply
Apply this pattern when:
- A class has too many responsibilities (violating the Single Responsibility Principle)
- A class has grown too large and complex
- A subset of fields and methods are closely related and can be grouped
- A class has low cohesion (its methods operate on different subsets of the class's fields)
- You notice feature envy (methods of one class using features of another class extensively)
- Parts of the class change for different reasons or at different rates
- You want to separate domain logic from infrastructure concerns

## Benefits
- Improves class cohesion by grouping related functionality
- Reduces class complexity by breaking it into smaller, more focused classes
- Makes the code more modular and easier to understand
- Facilitates code reuse
- Makes the code more maintainable by isolating changes
- Improves testability by creating smaller, more focused units
- Enhances readability by giving meaningful names to concepts

## Implementation Steps
1. **Identify related fields and methods** that belong together
2. **Create a new class** with a descriptive name
3. **Move the identified fields** to the new class
4. **Move the identified methods** to the new class, adjusting their signatures as needed
5. **Establish the relationship** between the original class and the new class:
   - Composition (has-a relationship)
   - Aggregation (contains-a relationship)
   - Consider whether the new class should be exposed to clients
6. **Adjust visibility** of fields and methods in the new class as appropriate
7. **Update references** in the original class to use the new class
8. **Test** to ensure behavior is preserved

## Example (Java)

### Before
```java
public class Order {
    private String customerName;
    private String customerEmail;
    private String customerAddress;
    private String customerPhone;
    private List<OrderItem> items;
    private double totalPrice;
    private Date orderDate;
    private String status;
    
    public Order(String name, String email, String address, String phone) {
        this.customerName = name;
        this.customerEmail = email;
        this.customerAddress = address;
        this.customerPhone = phone;
        this.items = new ArrayList<>();
        this.orderDate = new Date();
        this.status = "New";
    }
    
    public void addItem(Product product, int quantity) {
        OrderItem item = new OrderItem(product, quantity);
        items.add(item);
        calculateTotal();
    }
    
    public void removeItem(OrderItem item) {
        items.remove(item);
        calculateTotal();
    }
    
    private void calculateTotal() {
        totalPrice = 0;
        for (OrderItem item : items) {
            totalPrice += item.getSubtotal();
        }
    }
    
    public void updateCustomerEmail(String email) {
        this.customerEmail = email;
    }
    
    public void updateCustomerPhone(String phone) {
        this.customerPhone = phone;
    }
    
    public void updateCustomerAddress(String address) {
        this.customerAddress = address;
    }
    
    // Other methods...
}
```

### After
```java
public class Customer {
    private String name;
    private String email;
    private String address;
    private String phone;
    
    public Customer(String name, String email, String address, String phone) {
        this.name = name;
        this.email = email;
        this.address = address;
        this.phone = phone;
    }
    
    public String getName() { return name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
}

public class Order {
    private Customer customer;
    private List<OrderItem> items;
    private double totalPrice;
    private Date orderDate;
    private String status;
    
    public Order(Customer customer) {
        this.customer = customer;
        this.items = new ArrayList<>();
        this.orderDate = new Date();
        this.status = "New";
    }
    
    public Customer getCustomer() {
        return customer;
    }
    
    public void addItem(Product product, int quantity) {
        OrderItem item = new OrderItem(product, quantity);
        items.add(item);
        calculateTotal();
    }
    
    public void removeItem(OrderItem item) {
        items.remove(item);
        calculateTotal();
    }
    
    private void calculateTotal() {
        totalPrice = 0;
        for (OrderItem item : items) {
            totalPrice += item.getSubtotal();
        }
    }
    
    // Other methods...
}
```

## Example (JavaScript/TypeScript)

### Before
```typescript
class UserManager {
  private users: User[] = [];
  private loggedInUser: User | null = null;
  private authToken: string | null = null;
  private tokenExpiration: Date | null = null;
  
  constructor(private apiUrl: string) {}
  
  async fetchUsers(): Promise<User[]> {
    const response = await fetch(`${this.apiUrl}/users`, {
      headers: { Authorization: `Bearer ${this.authToken}` }
    });
    const data = await response.json();
    this.users = data.map(item => new User(item));
    return this.users;
  }
  
  async login(username: string, password: string): Promise<boolean> {
    const response = await fetch(`${this.apiUrl}/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
      const data = await response.json();
      this.authToken = data.token;
      this.tokenExpiration = new Date(data.expiration);
      this.loggedInUser = new User(data.user);
      return true;
    }
    return false;
  }
  
  async logout(): Promise<void> {
    await fetch(`${this.apiUrl}/logout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${this.authToken}` }
    });
    this.authToken = null;
    this.tokenExpiration = null;
    this.loggedInUser = null;
  }
  
  isTokenValid(): boolean {
    return this.authToken !== null && 
           this.tokenExpiration !== null && 
           this.tokenExpiration > new Date();
  }
  
  // Other user management methods...
}
```

### After
```typescript
class AuthService {
  private authToken: string | null = null;
  private tokenExpiration: Date | null = null;
  private loggedInUser: User | null = null;
  
  constructor(private apiUrl: string) {}
  
  async login(username: string, password: string): Promise<boolean> {
    const response = await fetch(`${this.apiUrl}/login`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
      const data = await response.json();
      this.authToken = data.token;
      this.tokenExpiration = new Date(data.expiration);
      this.loggedInUser = new User(data.user);
      return true;
    }
    return false;
  }
  
  async logout(): Promise<void> {
    await fetch(`${this.apiUrl}/logout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${this.authToken}` }
    });
    this.authToken = null;
    this.tokenExpiration = null;
    this.loggedInUser = null;
  }
  
  isTokenValid(): boolean {
    return this.authToken !== null && 
           this.tokenExpiration !== null && 
           this.tokenExpiration > new Date();
  }
  
  getAuthHeaders(): Record<string, string> {
    return { Authorization: `Bearer ${this.authToken}` };
  }
  
  getLoggedInUser(): User | null {
    return this.loggedInUser;
  }
}

class UserManager {
  private users: User[] = [];
  
  constructor(private apiUrl: string, private authService: AuthService) {}
  
  async fetchUsers(): Promise<User[]> {
    const response = await fetch(`${this.apiUrl}/users`, {
      headers: this.authService.getAuthHeaders()
    });
    const data = await response.json();
    this.users = data.map(item => new User(item));
    return this.users;
  }
  
  // Other user management methods...
}
```

## Considerations
- **Class Naming**: Choose a name that clearly describes the responsibility of the new class
- **Relationship Type**: Decide whether the relationship should be composition, aggregation, or inheritance
- **Interface Design**: Consider what methods should be public in the new class
- **Dependency Management**: Be mindful of creating circular dependencies
- **Visibility**: Adjust access modifiers appropriately for the new class
- **Testing**: Ensure both classes are properly tested after extraction

## Related Patterns
- **Extract Method**: Often used before Extract Class to group related code
- **Move Method**: Moving methods between existing classes
- **Hide Delegate**: Hiding the delegate class from clients
- **Introduce Parameter Object**: Creating a class to group parameters
- **Replace Data Value with Object**: Converting a primitive field into an object
