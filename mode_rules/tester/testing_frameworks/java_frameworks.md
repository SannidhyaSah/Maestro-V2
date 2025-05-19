# Java Testing Frameworks

## Overview
This document provides guidelines for using popular Java testing frameworks for both backend and enterprise applications. It covers best practices, configuration tips, and example patterns for effective testing.

## JUnit 5

### Overview
JUnit 5 is the next generation of JUnit, designed to leverage new features in Java 8 and above, as well as enabling many different styles of testing.

### Key Features
- Annotations for test lifecycle management
- Parameterized tests
- Dynamic tests
- Test templates
- Nested tests for better organization
- Conditional test execution
- Extensions model for customization
- Improved assertions and assumptions

### Installation
```xml
<!-- Maven -->
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.9.2</version>
    <scope>test</scope>
</dependency>

<!-- Gradle -->
testImplementation 'org.junit.jupiter:junit-jupiter:5.9.2'
```

### Configuration
Basic configuration in Maven:
```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>3.0.0</version>
        </plugin>
    </plugins>
</build>
```

### Best Practices
1. **Test Organization**
   - Use descriptive test method names
   - Group related tests with @Nested classes
   - Use @DisplayName for readable test output
   - Organize tests by feature or behavior

2. **Test Lifecycle**
   - Use @BeforeEach and @AfterEach for per-test setup and teardown
   - Use @BeforeAll and @AfterAll for one-time setup and teardown
   - Keep setup and teardown code minimal and focused

3. **Assertions**
   - Use assertAll for multiple related assertions
   - Provide meaningful error messages
   - Use assertThrows for exception testing
   - Consider using AssertJ for fluent assertions

4. **Parameterized Tests**
   - Use @ParameterizedTest for data-driven tests
   - Leverage different sources: @ValueSource, @CsvSource, @MethodSource, etc.
   - Name parameterized tests clearly with name attribute

### Example Test
```java
import org.junit.jupiter.api.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {
    
    private Calculator calculator;
    
    @BeforeEach
    void setUp() {
        calculator = new Calculator();
    }
    
    @Test
    @DisplayName("Addition should work for positive numbers")
    void addPositiveNumbers() {
        assertEquals(5, calculator.add(2, 3), "2 + 3 should equal 5");
    }
    
    @Test
    @DisplayName("Division should throw exception when dividing by zero")
    void divideByZero() {
        Exception exception = assertThrows(
            ArithmeticException.class,
            () -> calculator.divide(1, 0),
            "Division by zero should throw ArithmeticException"
        );
        
        assertTrue(exception.getMessage().contains("zero"));
    }
    
    @ParameterizedTest
    @CsvSource({
        "1, 1, 2",
        "5, 3, 8",
        "10, -5, 5",
        "-10, -5, -15"
    })
    @DisplayName("Addition should work for various inputs")
    void addParameterized(int a, int b, int expected) {
        assertEquals(expected, calculator.add(a, b),
            () -> a + " + " + b + " should equal " + expected);
    }
    
    @Nested
    @DisplayName("Multiplication tests")
    class MultiplicationTests {
        
        @Test
        @DisplayName("Multiplying positive numbers")
        void multiplyPositiveNumbers() {
            assertEquals(6, calculator.multiply(2, 3));
        }
        
        @Test
        @DisplayName("Multiplying by zero")
        void multiplyByZero() {
            assertEquals(0, calculator.multiply(5, 0));
            assertEquals(0, calculator.multiply(0, 5));
        }
        
        @Test
        @DisplayName("Multiplying negative numbers")
        void multiplyNegativeNumbers() {
            assertEquals(6, calculator.multiply(-2, -3));
            assertEquals(-6, calculator.multiply(2, -3));
        }
    }
}
```

## Mockito

### Overview
Mockito is a popular mocking framework for Java that allows you to create and configure mock objects. It lets you write beautiful tests with a clean and simple API.

### Key Features
- Creation of mock objects
- Verification of method calls
- Stubbing of method returns and exceptions
- Argument matchers
- Spy objects
- Verification modes
- BDD-style API

### Installation
```xml
<!-- Maven -->
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-core</artifactId>
    <version>5.3.1</version>
    <scope>test</scope>
</dependency>

<!-- For JUnit 5 integration -->
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-junit-jupiter</artifactId>
    <version>5.3.1</version>
    <scope>test</scope>
</dependency>
```

### Best Practices
1. **Mock Creation**
   - Use @Mock annotation with @ExtendWith(MockitoExtension.class)
   - Inject mocks with @InjectMocks
   - Reset mocks between tests if necessary

2. **Stubbing**
   - Keep stubbing simple and focused
   - Use appropriate argument matchers
   - Stub only what's necessary for the test
   - Consider using BDD-style given/when/then

3. **Verification**
   - Verify important interactions
   - Avoid over-verification
   - Use appropriate verification modes (times, atLeastOnce, etc.)
   - Verify in order when sequence matters

4. **Argument Capture**
   - Use ArgumentCaptor to capture and inspect arguments
   - Verify complex objects with custom matchers

### Example Test
```java
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @Mock
    private EmailService emailService;
    
    @InjectMocks
    private UserService userService;
    
    @Captor
    private ArgumentCaptor<User> userCaptor;
    
    @Test
    void shouldCreateUser() {
        // Arrange
        UserDto userDto = new UserDto("john@example.com", "John Doe", "password123");
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User user = invocation.getArgument(0);
            user.setId(1L); // Simulate ID generation
            return user;
        });
        
        // Act
        User createdUser = userService.createUser(userDto);
        
        // Assert
        assertNotNull(createdUser);
        assertEquals(1L, createdUser.getId());
        assertEquals("john@example.com", createdUser.getEmail());
        
        // Verify repository was called
        verify(userRepository).save(userCaptor.capture());
        User savedUser = userCaptor.getValue();
        assertEquals("John Doe", savedUser.getName());
        
        // Verify email service was called
        verify(emailService).sendWelcomeEmail("john@example.com");
    }
    
    @Test
    void shouldThrowExceptionWhenEmailExists() {
        // Arrange
        UserDto userDto = new UserDto("existing@example.com", "John Doe", "password123");
        when(userRepository.existsByEmail("existing@example.com")).thenReturn(true);
        
        // Act & Assert
        Exception exception = assertThrows(
            UserAlreadyExistsException.class,
            () -> userService.createUser(userDto)
        );
        
        assertEquals("User with email existing@example.com already exists", exception.getMessage());
        
        // Verify repository was called but save was not
        verify(userRepository).existsByEmail("existing@example.com");
        verify(userRepository, never()).save(any(User.class));
        verify(emailService, never()).sendWelcomeEmail(anyString());
    }
}
```

## Spring Boot Testing

### Overview
Spring Boot provides excellent support for testing Spring applications with features for testing slices of your application or the entire application context.

### Key Features
- @SpringBootTest for full application context testing
- Slice testing annotations (@WebMvcTest, @DataJpaTest, etc.)
- TestRestTemplate for integration testing
- MockMvc for controller testing
- @MockBean for replacing beans in the application context
- Auto-configured tests

### Installation
```xml
<!-- Maven -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

### Test Types

#### Unit Tests
- Test individual components in isolation
- Use Mockito to mock dependencies
- Fast execution, focused scope

#### Slice Tests
- Test specific layers of the application
- Use annotations like @WebMvcTest, @DataJpaTest, @JsonTest
- Load only relevant parts of the application context

#### Integration Tests
- Test interactions between components
- Use @SpringBootTest for full context
- May use test containers for external dependencies

### Best Practices
1. **Test Pyramid**
   - Write more unit tests than integration tests
   - Use slice tests for specific layers
   - Use full integration tests sparingly

2. **Test Configuration**
   - Use application-test.properties for test-specific configuration
   - Consider using test profiles
   - Use @TestPropertySource for test-specific properties

3. **Database Testing**
   - Use @DataJpaTest for repository tests
   - Consider using in-memory databases for tests
   - Use test containers for realistic database testing
   - Properly manage test data

4. **API Testing**
   - Use @WebMvcTest for controller tests
   - Use MockMvc for testing endpoints
   - Test both successful and error responses
   - Verify response status, headers, and body

### Example Tests

#### Controller Test
```java
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private UserService userService;
    
    @Test
    void shouldReturnUserWhenFound() throws Exception {
        // Arrange
        User user = new User(1L, "john@example.com", "John Doe");
        when(userService.getUserById(1L)).thenReturn(user);
        
        // Act & Assert
        mockMvc.perform(get("/api/users/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.email").value("john@example.com"))
                .andExpect(jsonPath("$.name").value("John Doe"));
    }
    
    @Test
    void shouldReturn404WhenUserNotFound() throws Exception {
        // Arrange
        when(userService.getUserById(999L)).thenThrow(new UserNotFoundException("User not found"));
        
        // Act & Assert
        mockMvc.perform(get("/api/users/999")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("User not found"));
    }
    
    @Test
    void shouldCreateUser() throws Exception {
        // Arrange
        UserDto userDto = new UserDto("john@example.com", "John Doe", "password123");
        User createdUser = new User(1L, "john@example.com", "John Doe");
        
        when(userService.createUser(any(UserDto.class))).thenReturn(createdUser);
        
        // Act & Assert
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"email\":\"john@example.com\",\"name\":\"John Doe\",\"password\":\"password123\"}"))
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", "/api/users/1"))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.email").value("john@example.com"));
    }
}
```

#### Repository Test
```java
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class UserRepositoryTest {
    
    @Autowired
    private TestEntityManager entityManager;
    
    @Autowired
    private UserRepository userRepository;
    
    @Test
    void shouldFindUserByEmail() {
        // Arrange
        User user = new User();
        user.setEmail("test@example.com");
        user.setName("Test User");
        user.setPasswordHash("hashed_password");
        entityManager.persist(user);
        entityManager.flush();
        
        // Act
        Optional<User> found = userRepository.findByEmail("test@example.com");
        
        // Assert
        assertTrue(found.isPresent());
        assertEquals("Test User", found.get().getName());
    }
    
    @Test
    void shouldReturnEmptyWhenEmailNotFound() {
        // Act
        Optional<User> found = userRepository.findByEmail("nonexistent@example.com");
        
        // Assert
        assertFalse(found.isPresent());
    }
    
    @Test
    void shouldFindActiveUsers() {
        // Arrange
        User activeUser1 = new User();
        activeUser1.setEmail("active1@example.com");
        activeUser1.setName("Active User 1");
        activeUser1.setActive(true);
        
        User activeUser2 = new User();
        activeUser2.setEmail("active2@example.com");
        activeUser2.setName("Active User 2");
        activeUser2.setActive(true);
        
        User inactiveUser = new User();
        inactiveUser.setEmail("inactive@example.com");
        inactiveUser.setName("Inactive User");
        inactiveUser.setActive(false);
        
        entityManager.persist(activeUser1);
        entityManager.persist(activeUser2);
        entityManager.persist(inactiveUser);
        entityManager.flush();
        
        // Act
        List<User> activeUsers = userRepository.findByActiveTrue();
        
        // Assert
        assertEquals(2, activeUsers.size());
        assertTrue(activeUsers.stream()
                .allMatch(User::isActive));
    }
}
```
