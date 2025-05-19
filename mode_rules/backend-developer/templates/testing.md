# Backend Testing Templates

## Overview
This document provides standardized templates for testing backend components and functionality across different frameworks. These templates should be used as a starting point for creating tests to ensure consistency and comprehensive test coverage.

## Unit Testing Templates

### Node.js with Jest
```javascript
const { functionToTest } = require('../path/to/module');
const mockDependency = require('../path/to/dependency');

// Mock dependencies
jest.mock('../path/to/dependency', () => ({
  someMethod: jest.fn(),
}));

describe('functionToTest', () => {
  // Setup before each test
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Setup mock returns
    mockDependency.someMethod.mockResolvedValue({ id: '123', name: 'Test' });
  });
  
  // Test successful execution
  it('should return expected result when given valid input', async () => {
    // Arrange
    const input = { param: 'value' };
    
    // Act
    const result = await functionToTest(input);
    
    // Assert
    expect(result).toEqual({ success: true, data: { id: '123', name: 'Test' } });
    expect(mockDependency.someMethod).toHaveBeenCalledWith(input);
  });
  
  // Test error handling
  it('should handle errors properly', async () => {
    // Arrange
    const input = { param: 'invalid' };
    const error = new Error('Test error');
    mockDependency.someMethod.mockRejectedValue(error);
    
    // Act & Assert
    await expect(functionToTest(input)).rejects.toThrow('Test error');
  });
  
  // Test edge cases
  it('should handle edge cases', async () => {
    // Arrange
    const input = {};
    
    // Act
    const result = await functionToTest(input);
    
    // Assert
    expect(result).toEqual({ success: false, error: 'Invalid input' });
  });
});
```

### Java with JUnit and Mockito
```java
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ServiceTest {
    
    @Mock
    private Repository repository;
    
    @InjectMocks
    private Service service;
    
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    
    @Test
    void shouldReturnEntityWhenValidIdProvided() {
        // Arrange
        Long id = 1L;
        Entity mockEntity = new Entity(id, "Test Entity");
        when(repository.findById(id)).thenReturn(Optional.of(mockEntity));
        
        // Act
        Entity result = service.getById(id);
        
        // Assert
        assertNotNull(result);
        assertEquals(id, result.getId());
        assertEquals("Test Entity", result.getName());
        verify(repository, times(1)).findById(id);
    }
    
    @Test
    void shouldThrowExceptionWhenInvalidIdProvided() {
        // Arrange
        Long id = 999L;
        when(repository.findById(id)).thenReturn(Optional.empty());
        
        // Act & Assert
        assertThrows(EntityNotFoundException.class, () -> {
            service.getById(id);
        });
        verify(repository, times(1)).findById(id);
    }
    
    @Test
    void shouldSaveEntitySuccessfully() {
        // Arrange
        Entity entity = new Entity(null, "New Entity");
        Entity savedEntity = new Entity(1L, "New Entity");
        when(repository.save(entity)).thenReturn(savedEntity);
        
        // Act
        Entity result = service.create(entity);
        
        // Assert
        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("New Entity", result.getName());
        verify(repository, times(1)).save(entity);
    }
}
```

### Python with pytest
```python
import pytest
from unittest.mock import Mock, patch

from app.services import service_function

@pytest.fixture
def mock_dependency():
    with patch('app.services.dependency') as mock:
        mock.get_data.return_value = {'id': '123', 'name': 'Test'}
        yield mock

def test_service_function_success(mock_dependency):
    # Arrange
    input_data = {'param': 'value'}
    
    # Act
    result = service_function(input_data)
    
    # Assert
    assert result == {'success': True, 'data': {'id': '123', 'name': 'Test'}}
    mock_dependency.get_data.assert_called_once_with(input_data)

def test_service_function_error(mock_dependency):
    # Arrange
    input_data = {'param': 'invalid'}
    mock_dependency.get_data.side_effect = Exception('Test error')
    
    # Act & Assert
    with pytest.raises(Exception) as exc_info:
        service_function(input_data)
    
    assert str(exc_info.value) == 'Test error'

def test_service_function_edge_case(mock_dependency):
    # Arrange
    input_data = {}
    
    # Act
    result = service_function(input_data)
    
    # Assert
    assert result == {'success': False, 'error': 'Invalid input'}
    mock_dependency.get_data.assert_not_called()
```

## Integration Testing Templates

### Node.js API Testing with Supertest
```javascript
const request = require('supertest');
const app = require('../app');
const db = require('../db');

describe('API Integration Tests', () => {
  // Setup before all tests
  beforeAll(async () => {
    await db.connect();
    await db.seed();
  });
  
  // Cleanup after all tests
  afterAll(async () => {
    await db.clear();
    await db.disconnect();
  });
  
  // Test GET endpoint
  describe('GET /api/resources', () => {
    it('should return all resources', async () => {
      const response = await request(app)
        .get('/api/resources')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
    
    it('should filter resources by status', async () => {
      const response = await request(app)
        .get('/api/resources?status=active')
        .expect(200);
      
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.data.every(item => item.status === 'active')).toBe(true);
    });
  });
  
  // Test POST endpoint
  describe('POST /api/resources', () => {
    it('should create a new resource', async () => {
      const newResource = {
        name: 'Test Resource',
        description: 'Created during test',
        status: 'active'
      };
      
      const response = await request(app)
        .post('/api/resources')
        .send(newResource)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201);
      
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.name).toBe(newResource.name);
    });
    
    it('should return validation error for invalid input', async () => {
      const invalidResource = {
        // Missing required name field
        description: 'Invalid resource'
      };
      
      const response = await request(app)
        .post('/api/resources')
        .send(invalidResource)
        .expect(422);
      
      expect(response.body).toHaveProperty('error');
      expect(response.body.error.details).toContainEqual(
        expect.objectContaining({ field: 'name' })
      );
    });
  });
});
```

### Spring Boot API Testing
```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class ResourceControllerIntegrationTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Autowired
    private ResourceRepository resourceRepository;
    
    @BeforeEach
    void setUp() {
        resourceRepository.deleteAll();
        
        // Seed test data
        Resource resource1 = new Resource();
        resource1.setName("Test Resource 1");
        resource1.setStatus("active");
        
        Resource resource2 = new Resource();
        resource2.setName("Test Resource 2");
        resource2.setStatus("inactive");
        
        resourceRepository.saveAll(Arrays.asList(resource1, resource2));
    }
    
    @Test
    void shouldGetAllResources() throws Exception {
        mockMvc.perform(get("/api/resources")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data", hasSize(2)))
                .andExpect(jsonPath("$.data[0].name").exists())
                .andExpect(jsonPath("$.data[0].status").exists());
    }
    
    @Test
    void shouldFilterResourcesByStatus() throws Exception {
        mockMvc.perform(get("/api/resources?status=active")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].status").value("active"));
    }
    
    @Test
    void shouldCreateResource() throws Exception {
        ResourceDTO newResource = new ResourceDTO();
        newResource.setName("New Resource");
        newResource.setDescription("Created in test");
        newResource.setStatus("active");
        
        mockMvc.perform(post("/api/resources")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newResource)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.id").exists())
                .andExpect(jsonPath("$.data.name").value("New Resource"));
        
        // Verify resource was saved to database
        List<Resource> resources = resourceRepository.findAll();
        assertEquals(3, resources.size());
    }
    
    @Test
    void shouldReturnValidationErrorForInvalidInput() throws Exception {
        // Missing required name field
        ResourceDTO invalidResource = new ResourceDTO();
        invalidResource.setDescription("Invalid resource");
        
        mockMvc.perform(post("/api/resources")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidResource)))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(jsonPath("$.error").exists())
                .andExpect(jsonPath("$.error.details[0].field").value("name"));
    }
}
```

## Testing Best Practices

### 1. Test Structure
- Follow the Arrange-Act-Assert (AAA) pattern
- Group related tests with descriptive names
- Keep tests independent and isolated
- Use setup and teardown methods for common operations
- Test one concept per test
- Use descriptive test names that explain the expected behavior

### 2. Test Coverage
- Aim for high test coverage (80%+) for critical code paths
- Test happy paths, error paths, and edge cases
- Test input validation and error handling
- Test business logic thoroughly
- Test API contracts and responses
- Consider property-based testing for complex algorithms
- Implement integration tests for critical flows

### 3. Mocking
- Mock external dependencies
- Use appropriate mocking frameworks
- Reset mocks between tests
- Verify mock interactions when relevant
- Avoid excessive mocking
- Consider using test doubles (stubs, spies) when appropriate
- Mock at the right level of abstraction

### 4. Database Testing
- Use in-memory databases for unit tests
- Implement proper test data setup and teardown
- Use transactions to roll back changes
- Consider using test containers for integration tests
- Test database migrations
- Test complex queries
- Implement proper cleanup between tests

### 5. API Testing
- Test all API endpoints
- Verify response status codes
- Validate response formats and schemas
- Test authentication and authorization
- Test error responses
- Test pagination and filtering
- Consider using contract testing
