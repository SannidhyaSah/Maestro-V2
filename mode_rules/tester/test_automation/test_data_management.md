# Test Data Management

## Overview
Effective test data management is crucial for creating reliable, maintainable, and efficient automated tests. This document provides guidelines for managing test data across different testing levels and applications, covering strategies for data creation, isolation, and cleanup.

## Key Principles

1. **Test Data Independence**
   - Each test should have its own independent data
   - Tests should not depend on data created by other tests
   - Tests should clean up after themselves
   - Test data should be isolated from production data

2. **Test Data Minimalism**
   - Use only the data necessary for the test
   - Create focused, purpose-specific test data
   - Avoid unnecessary complexity in test data
   - Minimize dependencies between data entities

3. **Test Data Reproducibility**
   - Test data should be reproducible and consistent
   - Tests should be able to run in any environment
   - Test data creation should be automated
   - Test data should be version-controlled when appropriate

4. **Test Data Security**
   - Never use real sensitive data in tests
   - Properly mask or anonymize production data if used
   - Secure test data storage and access
   - Comply with data protection regulations

## Test Data Strategies

### 1. Test Data Creation Approaches

#### In-line Test Data
- Create data directly in the test
- Best for simple, focused unit tests
- Provides clear visibility of test dependencies
- Keeps test and data tightly coupled

```javascript
// Example: In-line test data in JavaScript
test('should calculate total price correctly', () => {
  // In-line test data
  const cartItems = [
    { id: 1, name: 'Product 1', price: 10.00, quantity: 2 },
    { id: 2, name: 'Product 2', price: 15.50, quantity: 1 },
    { id: 3, name: 'Product 3', price: 5.25, quantity: 3 }
  ];
  
  const cart = new ShoppingCart(cartItems);
  
  // Test calculation
  expect(cart.getTotalPrice()).toBe(51.75); // 10.00*2 + 15.50*1 + 5.25*3
});
```

#### Test Data Builders
- Create reusable builders for complex objects
- Implement sensible defaults with customization options
- Support fluent interfaces for readability
- Enable consistent data creation across tests

```java
// Example: Test data builder in Java
public class UserBuilder {
    private String id = UUID.randomUUID().toString();
    private String email = "test@example.com";
    private String name = "Test User";
    private String passwordHash = "hashed_password";
    private boolean active = true;
    private List<String> roles = Arrays.asList("USER");
    
    public UserBuilder withId(String id) {
        this.id = id;
        return this;
    }
    
    public UserBuilder withEmail(String email) {
        this.email = email;
        return this;
    }
    
    public UserBuilder withName(String name) {
        this.name = name;
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
    
    public UserBuilder withRoles(List<String> roles) {
        this.roles = roles;
        return this;
    }
    
    public UserBuilder asAdmin() {
        this.roles = Arrays.asList("USER", "ADMIN");
        return this;
    }
    
    public User build() {
        User user = new User();
        user.setId(id);
        user.setEmail(email);
        user.setName(name);
        user.setPasswordHash(passwordHash);
        user.setActive(active);
        user.setRoles(roles);
        return user;
    }
    
    public User buildAndSave(UserRepository repository) {
        User user = build();
        return repository.save(user);
    }
}

// Using the builder in a test
@Test
void shouldGrantAdminAccess() {
    // Create test data using builder
    User adminUser = new UserBuilder()
        .withEmail("admin@example.com")
        .asAdmin()
        .build();
    
    boolean hasAccess = securityService.canAccessAdminPanel(adminUser);
    
    assertTrue(hasAccess);
}
```

#### Test Data Factories
- Create specialized factories for different entity types
- Implement methods for common test scenarios
- Support relationships between entities
- Provide cleanup mechanisms

```python
# Example: Test data factory in Python
class UserFactory:
    @staticmethod
    def create_default():
        return {
            "email": f"user-{int(time.time())}@example.com",
            "name": "Test User",
            "password": "Password123!",
            "role": "user"
        }
    
    @staticmethod
    def create_admin():
        user = UserFactory.create_default()
        user["role"] = "admin"
        return user
    
    @staticmethod
    def create_with_attributes(attributes):
        user = UserFactory.create_default()
        user.update(attributes)
        return user
    
    @staticmethod
    def create_in_database(db, attributes=None):
        user_data = UserFactory.create_with_attributes(attributes or {})
        user_id = db.users.insert_one(user_data).inserted_id
        return db.users.find_one({"_id": user_id})
    
    @staticmethod
    def cleanup_test_users(db):
        db.users.delete_many({"email": {"$regex": r"^user-\d+@example\.com$"}})

# Using the factory in a test
def test_user_login(db):
    # Create test user
    user = UserFactory.create_in_database(db, {"password": "TestPassword123"})
    
    # Test login
    result = auth_service.login(user["email"], "TestPassword123")
    
    assert result["success"] is True
    assert "token" in result
    
    # Clean up
    UserFactory.cleanup_test_users(db)
```

#### Random Data Generation
- Generate random data for variety and edge cases
- Use libraries like Faker for realistic data
- Seed random generators for reproducibility
- Combine with builders or factories for structure

```javascript
// Example: Random data generation with Faker in JavaScript
const { faker } = require('@faker-js/faker');

// Set seed for reproducibility
faker.seed(123);

class UserGenerator {
  static generate(count = 1, overrides = {}) {
    const users = [];
    
    for (let i = 0; i < count; i++) {
      const user = {
        id: faker.string.uuid(),
        email: faker.internet.email(),
        name: faker.person.fullName(),
        address: {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          zipCode: faker.location.zipCode()
        },
        phone: faker.phone.number(),
        createdAt: faker.date.past(),
        ...overrides
      };
      
      users.push(user);
    }
    
    return count === 1 ? users[0] : users;
  }
}

// Using the generator in a test
test('should filter users by state', () => {
  // Generate 50 random users
  const users = UserGenerator.generate(50);
  
  // Generate 10 users from California
  const caUsers = UserGenerator.generate(10, { address: { state: 'California' } });
  
  // Combine all users
  const allUsers = [...users, ...caUsers];
  
  // Test filtering
  const filtered = userService.filterByState(allUsers, 'California');
  
  expect(filtered.length).toBe(10);
  expect(filtered.every(user => user.address.state === 'California')).toBe(true);
});
```

### 2. Test Data Storage Approaches

#### In-Memory Data
- Store test data in memory during test execution
- Best for unit tests and simple integration tests
- Fast and isolated
- No persistence between test runs

```javascript
// Example: In-memory repository for testing
class InMemoryUserRepository {
  constructor() {
    this.users = new Map();
  }
  
  save(user) {
    const id = user.id || Math.random().toString(36).substring(2, 9);
    const savedUser = { ...user, id };
    this.users.set(id, savedUser);
    return savedUser;
  }
  
  findById(id) {
    return this.users.get(id) || null;
  }
  
  findByEmail(email) {
    return Array.from(this.users.values())
      .find(user => user.email === email) || null;
  }
  
  delete(id) {
    this.users.delete(id);
  }
  
  clear() {
    this.users.clear();
  }
}

// Using in-memory repository in tests
test('should find user by email', () => {
  const repo = new InMemoryUserRepository();
  const user = { name: 'Test User', email: 'test@example.com' };
  
  repo.save(user);
  
  const found = repo.findByEmail('test@example.com');
  expect(found).not.toBeNull();
  expect(found.name).toBe('Test User');
  
  // Clean up
  repo.clear();
});
```

#### Test Databases
- Use dedicated databases for testing
- Isolate from production data
- Reset between test runs
- Support complex data relationships

```python
# Example: Test database setup with pytest
import pytest
import pymongo
from bson.objectid import ObjectId

@pytest.fixture(scope="session")
def mongo_client():
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    yield client
    client.close()

@pytest.fixture(scope="function")
def test_db(mongo_client):
    # Use a unique database name for isolation
    db_name = f"test_db_{ObjectId()}"
    db = mongo_client[db_name]
    
    # Set up initial data if needed
    db.users.insert_many([
        {"name": "User 1", "email": "user1@example.com", "role": "user"},
        {"name": "User 2", "email": "user2@example.com", "role": "admin"}
    ])
    
    yield db
    
    # Clean up: drop the test database
    mongo_client.drop_database(db_name)

# Using the test database in a test
def test_find_admin_users(test_db):
    # Find admin users
    admin_users = list(test_db.users.find({"role": "admin"}))
    
    assert len(admin_users) == 1
    assert admin_users[0]["email"] == "user2@example.com"
```

#### Test Containers
- Use containerized databases for testing
- Provide isolated, consistent environments
- Support complex database setups
- Enable parallel test execution

```java
// Example: TestContainers for database testing in Java
@Testcontainers
public class UserRepositoryTest {
    
    @Container
    private static final PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:14")
        .withDatabaseName("testdb")
        .withUsername("test")
        .withPassword("test");
    
    private UserRepository userRepository;
    private DataSource dataSource;
    
    @BeforeEach
    void setUp() throws Exception {
        // Set up data source using container connection details
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(postgres.getJdbcUrl());
        config.setUsername(postgres.getUsername());
        config.setPassword(postgres.getPassword());
        
        dataSource = new HikariDataSource(config);
        
        // Run migrations
        Flyway flyway = Flyway.configure()
            .dataSource(dataSource)
            .load();
        flyway.migrate();
        
        // Create repository
        userRepository = new UserRepositoryImpl(dataSource);
        
        // Insert test data
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(
                 "INSERT INTO users (email, name, password_hash, active) VALUES (?, ?, ?, ?)")) {
            
            stmt.setString(1, "test@example.com");
            stmt.setString(2, "Test User");
            stmt.setString(3, "hashed_password");
            stmt.setBoolean(4, true);
            stmt.executeUpdate();
        }
    }
    
    @AfterEach
    void tearDown() throws Exception {
        // Clean up test data
        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement()) {
            stmt.execute("DELETE FROM users");
        }
    }
    
    @Test
    void shouldFindUserByEmail() {
        // Test repository method
        Optional<User> user = userRepository.findByEmail("test@example.com");
        
        assertTrue(user.isPresent());
        assertEquals("Test User", user.get().getName());
    }
}
```

### 3. Test Data Cleanup Strategies

#### Transactional Rollback
- Wrap tests in transactions
- Automatically roll back after test completion
- Efficient for database tests
- Maintains database state between tests

```java
// Example: Transactional tests in Spring Boot
@SpringBootTest
@Transactional
public class UserServiceIntegrationTest {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private UserRepository userRepository;
    
    @Test
    void shouldCreateUser() {
        // Create test data
        UserDto userDto = new UserDto("test@example.com", "Test User", "password123");
        
        // Execute service method
        User createdUser = userService.createUser(userDto);
        
        // Verify user was created
        assertNotNull(createdUser.getId());
        assertEquals("test@example.com", createdUser.getEmail());
        
        // No need for cleanup - transaction will be rolled back automatically
    }
}
```

#### Explicit Cleanup
- Explicitly delete test data after tests
- Use tearDown methods or afterEach hooks
- Provides more control over cleanup process
- Works across different storage types

```javascript
// Example: Explicit cleanup in Jest
describe('User API', () => {
  // Track created user IDs for cleanup
  const createdUserIds = [];
  
  afterEach(async () => {
    // Clean up users created during tests
    for (const userId of createdUserIds) {
      await userApi.deleteUser(userId);
    }
    createdUserIds.length = 0; // Clear the array
  });
  
  test('should create a new user', async () => {
    const userData = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123'
    };
    
    const response = await userApi.createUser(userData);
    
    // Track created user for cleanup
    createdUserIds.push(response.data.id);
    
    expect(response.status).toBe(201);
    expect(response.data.email).toBe(userData.email);
  });
});
```

#### Database Reset
- Reset database to known state before tests
- Use database snapshots or schema recreation
- Ensures consistent starting point
- May be slower than other approaches

```python
# Example: Database reset in pytest
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import Base, User

@pytest.fixture(scope="session")
def engine():
    return create_engine("sqlite:///:memory:")

@pytest.fixture(scope="session")
def tables(engine):
    Base.metadata.create_all(engine)
    yield
    Base.metadata.drop_all(engine)

@pytest.fixture
def db_session(engine, tables):
    connection = engine.connect()
    transaction = connection.begin()
    Session = sessionmaker(bind=connection)
    session = Session()
    
    # Insert initial data
    admin = User(email="admin@example.com", name="Admin User", role="admin")
    session.add(admin)
    session.commit()
    
    yield session
    
    # Rollback transaction to reset database state
    transaction.rollback()
    connection.close()

# Using the session in a test
def test_create_user(db_session):
    # Create a new user
    user = User(email="test@example.com", name="Test User", role="user")
    db_session.add(user)
    db_session.commit()
    
    # Verify user was created
    saved_user = db_session.query(User).filter_by(email="test@example.com").first()
    assert saved_user is not None
    assert saved_user.name == "Test User"
    
    # No need for cleanup - transaction will be rolled back
```

## Test Data for Different Testing Levels

### Unit Testing
- Use simple, focused test data
- Create data in-line or with builders
- Mock external dependencies
- Keep data minimal and purpose-specific

### Integration Testing
- Use more complex, realistic data
- Test relationships between components
- Consider using test databases or containers
- Implement proper data isolation and cleanup

### End-to-End Testing
- Use production-like data
- Test complete user journeys
- Consider data volume and variety
- Implement comprehensive cleanup strategies

## Common Test Data Challenges and Solutions

### Challenge: Test Data Interdependencies
- **Problem**: Tests depend on data created by other tests
- **Solution**: Make each test create its own data or use shared fixtures with proper isolation

### Challenge: Slow Test Data Setup
- **Problem**: Creating test data is time-consuming
- **Solution**: Use efficient data creation strategies, caching, or shared setup for test suites

### Challenge: Test Data Maintenance
- **Problem**: Test data becomes outdated as application evolves
- **Solution**: Use data builders/factories that evolve with the application model

### Challenge: Realistic Test Data
- **Problem**: Test data doesn't represent real-world scenarios
- **Solution**: Use data generation libraries, anonymized production data, or realistic data models

### Challenge: Test Data in CI/CD
- **Problem**: Managing test data in CI/CD environments
- **Solution**: Use containerized databases, automated setup scripts, or cloud-based test environments
