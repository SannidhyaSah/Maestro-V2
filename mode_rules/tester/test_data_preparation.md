# Test Data Preparation

## Overview
This document provides guidelines for effectively preparing, managing, and maintaining test data throughout the software development lifecycle. It covers strategies for test data creation, management, and best practices for ensuring comprehensive and reliable testing.

## Key Principles

1. **Test Data Relevance**
   - Create test data that reflects real-world scenarios
   - Cover both typical and edge cases
   - Include data for all test conditions
   - Align test data with test objectives

2. **Test Data Independence**
   - Ensure tests have independent data sets
   - Avoid dependencies between tests
   - Implement proper data isolation
   - Enable parallel test execution

3. **Test Data Maintainability**
   - Document test data structure and purpose
   - Implement version control for test data
   - Automate test data generation and management
   - Keep test data in sync with application changes

4. **Test Data Security**
   - Protect sensitive test data
   - Comply with data protection regulations
   - Implement proper data masking and anonymization
   - Control access to test data

## Test Data Strategies

### 1. Synthetic Test Data Generation

#### Benefits
- Complete control over data characteristics
- No privacy or security concerns
- Can be generated on demand
- Easily scalable for volume testing

#### Approaches
- **Manual Creation**: Creating test data manually for simple scenarios
- **Scripted Generation**: Using scripts to generate larger volumes of data
- **Data Generation Tools**: Using specialized tools for complex data generation
- **Random Data Generation**: Creating random data with specific constraints

#### Example: JavaScript Test Data Generator
```javascript
// Test data generator for user profiles
class UserDataGenerator {
  static generateUser(overrides = {}) {
    const id = Math.floor(Math.random() * 10000);
    const defaultUser = {
      id: id,
      username: `user${id}`,
      email: `user${id}@example.com`,
      firstName: this.getRandomName('first'),
      lastName: this.getRandomName('last'),
      age: Math.floor(Math.random() * 50) + 18,
      address: {
        street: `${Math.floor(Math.random() * 9999) + 1} Main St`,
        city: this.getRandomCity(),
        state: this.getRandomState(),
        zipCode: String(Math.floor(Math.random() * 90000) + 10000)
      },
      phoneNumber: this.generatePhoneNumber(),
      registrationDate: this.getRandomDate(new Date(2020, 0, 1), new Date()),
      lastLoginDate: this.getRandomDate(new Date(2023, 0, 1), new Date()),
      preferences: {
        theme: Math.random() > 0.5 ? 'light' : 'dark',
        notifications: Math.random() > 0.3,
        newsletter: Math.random() > 0.7
      }
    };
    
    return { ...defaultUser, ...overrides };
  }
  
  static generateUsers(count, overridesFn = null) {
    const users = [];
    for (let i = 0; i < count; i++) {
      const overrides = overridesFn ? overridesFn(i) : {};
      users.push(this.generateUser(overrides));
    }
    return users;
  }
  
  static getRandomName(type) {
    const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Robert', 'Lisa'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson'];
    
    const names = type === 'first' ? firstNames : lastNames;
    return names[Math.floor(Math.random() * names.length)];
  }
  
  static getRandomCity() {
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego'];
    return cities[Math.floor(Math.random() * cities.length)];
  }
  
  static getRandomState() {
    const states = ['CA', 'NY', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI'];
    return states[Math.floor(Math.random() * states.length)];
  }
  
  static generatePhoneNumber() {
    return `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
  }
  
  static getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  
  // Generate specific test cases
  static generateTestCases() {
    return {
      validUser: this.generateUser(),
      minAgeUser: this.generateUser({ age: 18 }),
      maxAgeUser: this.generateUser({ age: 120 }),
      missingEmailUser: this.generateUser({ email: null }),
      invalidEmailUser: this.generateUser({ email: 'not-an-email' }),
      adminUser: this.generateUser({ role: 'admin', permissions: ['read', 'write', 'delete'] }),
      inactiveUser: this.generateUser({ active: false, lastLoginDate: new Date(2022, 0, 1) })
    };
  }
}

// Usage example
const testUsers = UserDataGenerator.generateUsers(100);
const specificTestCases = UserDataGenerator.generateTestCases();

// Generate users with specific characteristics
const premiumUsers = UserDataGenerator.generateUsers(20, (index) => ({
  subscriptionPlan: 'premium',
  subscriptionStartDate: new Date(2023, index % 12, (index % 28) + 1),
  paymentMethod: index % 2 === 0 ? 'credit_card' : 'paypal'
}));
```

### 2. Production Data Subsetting

#### Benefits
- Realistic data patterns and relationships
- Represents actual user behavior
- Includes edge cases that might be missed in synthetic data
- Useful for regression testing

#### Approaches
- **Full Copy**: Creating a complete copy of production data (for small datasets)
- **Subsetting**: Extracting a representative subset of production data
- **Sampling**: Randomly sampling records from production
- **Targeted Extraction**: Extracting specific scenarios or patterns

#### Considerations
- **Data Privacy**: Ensure compliance with privacy regulations
- **Data Masking**: Mask or anonymize sensitive information
- **Data Volume**: Manage the size of the extracted dataset
- **Referential Integrity**: Maintain relationships between data entities

#### Example: SQL for Data Subsetting
```sql
-- Create a subset of production data for testing
-- This example extracts a sample of orders with their related data

-- Step 1: Create temporary tables to hold the subset
CREATE TEMPORARY TABLE temp_orders AS
SELECT * FROM production.orders
WHERE order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
ORDER BY RAND()
LIMIT 1000;

-- Step 2: Extract related customer data
CREATE TEMPORARY TABLE temp_customers AS
SELECT c.*
FROM production.customers c
INNER JOIN temp_orders o ON c.customer_id = o.customer_id;

-- Step 3: Extract related order items
CREATE TEMPORARY TABLE temp_order_items AS
SELECT oi.*
FROM production.order_items oi
INNER JOIN temp_orders o ON oi.order_id = o.order_id;

-- Step 4: Extract related products
CREATE TEMPORARY TABLE temp_products AS
SELECT p.*
FROM production.products p
INNER JOIN temp_order_items oi ON p.product_id = oi.product_id;

-- Step 5: Mask sensitive customer data
UPDATE temp_customers
SET
  email = CONCAT('customer_', customer_id, '@example.com'),
  phone_number = CONCAT('(555) 555-', LPAD(customer_id % 10000, 4, '0')),
  credit_card_number = CONCAT('XXXX-XXXX-XXXX-', RIGHT(credit_card_number, 4)),
  address_line1 = CONCAT(customer_id, ' Main Street'),
  address_line2 = NULL;

-- Step 6: Copy data to test database
INSERT INTO test.customers SELECT * FROM temp_customers;
INSERT INTO test.orders SELECT * FROM temp_orders;
INSERT INTO test.order_items SELECT * FROM temp_order_items;
INSERT INTO test.products SELECT * FROM temp_products;

-- Step 7: Clean up temporary tables
DROP TEMPORARY TABLE temp_orders;
DROP TEMPORARY TABLE temp_customers;
DROP TEMPORARY TABLE temp_order_items;
DROP TEMPORARY TABLE temp_products;
```

### 3. Data Masking and Anonymization

#### Benefits
- Protects sensitive information
- Complies with data protection regulations
- Maintains data relationships and patterns
- Enables use of production-like data

#### Techniques
- **Substitution**: Replacing sensitive values with fictional alternatives
- **Shuffling**: Rearranging values within a column
- **Encryption**: Encrypting sensitive data
- **Nulling**: Removing sensitive data entirely
- **Generalization**: Reducing precision of data (e.g., exact age to age range)

#### Example: Python Data Anonymization Script
```python
import pandas as pd
import numpy as np
from faker import Faker
import hashlib

# Initialize Faker
fake = Faker()
Faker.seed(42)  # For reproducibility

# Load the data
customers_df = pd.read_csv('production_customers_export.csv')

# Function to anonymize data
def anonymize_customers(df):
    # Create a copy to avoid modifying the original
    anon_df = df.copy()
    
    # Create consistent anonymization mappings
    customer_id_map = {}
    email_domain_map = {}
    
    # Anonymize personal information
    for index, row in anon_df.iterrows():
        # Generate consistent mappings based on original values
        customer_id = row['customer_id']
        if customer_id not in customer_id_map:
            customer_id_map[customer_id] = fake.uuid4()
        
        email = row['email']
        domain = email.split('@')[1]
        if domain not in email_domain_map:
            email_domain_map[domain] = fake.domain_name()
        
        # Apply anonymization
        anon_df.at[index, 'customer_id'] = customer_id_map[customer_id]
        anon_df.at[index, 'first_name'] = fake.first_name()
        anon_df.at[index, 'last_name'] = fake.last_name()
        anon_df.at[index, 'email'] = f"user_{index}@{email_domain_map[domain]}"
        anon_df.at[index, 'phone'] = fake.phone_number()
        
        # Hash the credit card number but keep the last 4 digits
        cc_number = row['credit_card_number']
        last_four = cc_number[-4:] if isinstance(cc_number, str) and len(cc_number) >= 4 else "0000"
        anon_df.at[index, 'credit_card_number'] = f"XXXX-XXXX-XXXX-{last_four}"
        
        # Anonymize address but keep city and state for geographic distribution
        anon_df.at[index, 'address_line1'] = fake.street_address()
        anon_df.at[index, 'address_line2'] = fake.secondary_address() if np.random.random() > 0.7 else None
        # Keep city and state for geographic distribution analysis
        # anon_df.at[index, 'city'] = row['city']
        # anon_df.at[index, 'state'] = row['state']
        anon_df.at[index, 'zip_code'] = fake.zipcode()
    
    return anon_df

# Anonymize the data
anonymized_customers = anonymize_customers(customers_df)

# Save the anonymized data
anonymized_customers.to_csv('anonymized_customers.csv', index=False)

print(f"Anonymized {len(anonymized_customers)} customer records")
```

### 4. Test Data as Code

#### Benefits
- Version control for test data
- Test data evolves with code
- Reproducible test data setup
- Consistent test data across environments

#### Approaches
- **Data Builders**: Creating test data programmatically
- **Fixtures**: Defining reusable test data sets
- **Seeding Scripts**: Scripts to populate test databases
- **Data Migration**: Using database migration tools for test data

#### Example: Java Test Data Builders
```java
// User entity builder for test data
public class UserBuilder {
    private Long id = null;
    private String email = "test@example.com";
    private String firstName = "Test";
    private String lastName = "User";
    private String passwordHash = "$2a$10$hashed_password";
    private boolean active = true;
    private Set<Role> roles = new HashSet<>(Collections.singletonList(Role.USER));
    private LocalDateTime createdAt = LocalDateTime.now();
    private Address address = new AddressBuilder().build();
    
    public UserBuilder withId(Long id) {
        this.id = id;
        return this;
    }
    
    public UserBuilder withEmail(String email) {
        this.email = email;
        return this;
    }
    
    public UserBuilder withName(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        return this;
    }
    
    public UserBuilder withPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
        return this;
    }
    
    public UserBuilder withActive(boolean active) {
        this.active = active;
        return this;
    }
    
    public UserBuilder withRoles(Set<Role> roles) {
        this.roles = new HashSet<>(roles);
        return this;
    }
    
    public UserBuilder withAdminRole() {
        this.roles.add(Role.ADMIN);
        return this;
    }
    
    public UserBuilder withCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }
    
    public UserBuilder withAddress(Address address) {
        this.address = address;
        return this;
    }
    
    public User build() {
        User user = new User();
        user.setId(id);
        user.setEmail(email);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setPasswordHash(passwordHash);
        user.setActive(active);
        user.setRoles(roles);
        user.setCreatedAt(createdAt);
        user.setAddress(address);
        return user;
    }
    
    public User buildAndPersist(UserRepository repository) {
        User user = build();
        return repository.save(user);
    }
    
    // Factory methods for common test cases
    public static UserBuilder aRegularUser() {
        return new UserBuilder();
    }
    
    public static UserBuilder anAdmin() {
        return new UserBuilder()
            .withEmail("admin@example.com")
            .withName("Admin", "User")
            .withAdminRole();
    }
    
    public static UserBuilder anInactiveUser() {
        return new UserBuilder()
            .withActive(false)
            .withEmail("inactive@example.com");
    }
}

// Address entity builder
public class AddressBuilder {
    private Long id = null;
    private String street = "123 Main St";
    private String city = "Test City";
    private String state = "TS";
    private String zipCode = "12345";
    private String country = "Test Country";
    
    public AddressBuilder withId(Long id) {
        this.id = id;
        return this;
    }
    
    public AddressBuilder withStreet(String street) {
        this.street = street;
        return this;
    }
    
    public AddressBuilder withCity(String city) {
        this.city = city;
        return this;
    }
    
    public AddressBuilder withState(String state) {
        this.state = state;
        return this;
    }
    
    public AddressBuilder withZipCode(String zipCode) {
        this.zipCode = zipCode;
        return this;
    }
    
    public AddressBuilder withCountry(String country) {
        this.country = country;
        return this;
    }
    
    public Address build() {
        Address address = new Address();
        address.setId(id);
        address.setStreet(street);
        address.setCity(city);
        address.setState(state);
        address.setZipCode(zipCode);
        address.setCountry(country);
        return address;
    }
}

// Using the builders in tests
@Test
void shouldAllowAdminToAccessAdminPanel() {
    // Arrange
    User adminUser = UserBuilder.anAdmin().build();
    
    // Act
    boolean hasAccess = securityService.canAccessAdminPanel(adminUser);
    
    // Assert
    assertTrue(hasAccess);
}

@Test
void shouldNotAllowRegularUserToAccessAdminPanel() {
    // Arrange
    User regularUser = UserBuilder.aRegularUser().build();
    
    // Act
    boolean hasAccess = securityService.canAccessAdminPanel(regularUser);
    
    // Assert
    assertFalse(hasAccess);
}
```

## Test Data for Different Testing Types

### Functional Testing
- Cover all business scenarios
- Include both valid and invalid inputs
- Test boundary conditions
- Include data for all user roles and permissions

### Performance Testing
- Large volumes of realistic data
- Varied data patterns and distributions
- Data that exercises system bottlenecks
- Historical data patterns for trend analysis

### Security Testing
- Data with potential security vulnerabilities
- Test cases for common attack vectors
- Data for permission and access control testing
- Sensitive data handling scenarios

### Compatibility Testing
- Data with special characters and encodings
- Internationalization and localization test data
- Data for different browsers and devices
- Data for different API versions

## Test Data Management Best Practices

1. **Document Test Data Requirements**
   - Define data needs for each test scenario
   - Document data relationships and dependencies
   - Specify data volumes and characteristics
   - Identify sensitive data requirements

2. **Implement Version Control**
   - Version control test data scripts and definitions
   - Track changes to test data over time
   - Align test data versions with application versions
   - Document test data changes

3. **Automate Test Data Management**
   - Automate data generation and setup
   - Implement data cleanup and reset
   - Create self-service data provisioning
   - Integrate with CI/CD pipelines

4. **Ensure Data Quality**
   - Validate test data against requirements
   - Check for data consistency and integrity
   - Verify data relationships
   - Monitor test data health

5. **Implement Data Governance**
   - Define data ownership and responsibilities
   - Establish data security policies
   - Comply with data protection regulations
   - Implement data access controls
