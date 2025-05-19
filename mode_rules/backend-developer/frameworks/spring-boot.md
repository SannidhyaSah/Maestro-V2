# Spring Boot Framework - Backend Developer Rules

## Overview
These rules extend the core Backend Developer rules specifically for Spring Boot-based projects. When implementing backend features using Spring Boot, you must follow these guidelines to ensure high-quality, maintainable, and performant code.

## Spring Boot-Specific Implementation Guidelines

### 1. Project Structure
- **Required Approach**:
  - Use a layered architecture (controller, service, repository)
  - Organize code by feature or domain
  - Use Spring Boot starters for dependencies
  - Implement proper configuration management
  - Separate business logic from framework code
  - Use Spring profiles for environment-specific configuration
  - Follow package naming conventions

### 2. Spring Configuration
- **Required Approach**:
  - Use Java or Kotlin configuration over XML
  - Implement proper property management
  - Use Spring profiles for different environments
  - Configure security properly
  - Implement proper exception handling
  - Use Spring Boot actuator for monitoring
  - Configure logging appropriately

### 3. API Implementation
- **Required Approach**:
  - Use Spring MVC for REST APIs
  - Implement proper request mapping
  - Use ResponseEntity for HTTP responses
  - Validate request inputs with Bean Validation
  - Use consistent response formats
  - Implement proper HTTP status codes
  - Document API with SpringDoc or Swagger

### 4. Authentication and Authorization
- **Required Approach**:
  - Use Spring Security for authentication
  - Implement JWT or OAuth2 for stateless authentication
  - Configure proper CORS settings
  - Implement method-level security with annotations
  - Use role-based or permission-based access control
  - Implement proper password encoding
  - Configure secure session management if needed

### 5. Database Integration
- **Required Approach**:
  - Use Spring Data JPA for database access
  - Implement repository pattern
  - Configure proper connection pooling
  - Use transactions with appropriate propagation
  - Implement proper entity relationships
  - Use query methods or JPQL for simple queries
  - Use Criteria API or native queries for complex queries

### 6. Error Handling
- **Required Approach**:
  - Implement global exception handling with @ControllerAdvice
  - Create custom exception classes for different error types
  - Return appropriate HTTP status codes
  - Use consistent error response format
  - Implement proper logging of exceptions
  - Avoid exposing sensitive information in errors
  - Handle validation errors properly

### 7. Testing
- **Required Approach**:
  - Use JUnit 5 for testing
  - Implement Spring Boot Test for integration testing
  - Use MockMvc for controller testing
  - Implement proper test fixtures
  - Use @DataJpaTest for repository testing
  - Test error handling and edge cases
  - Implement proper test coverage

## Spring Boot Project Structure
For Spring Boot projects, organize your code following this structure:

```
src/
├── main/
│   ├── java/
│   │   └── com/
│   │       └── example/
│   │           └── project/
│   │               ├── ProjectApplication.java       # Main application class
│   │               ├── config/                       # Configuration classes
│   │               │   ├── SecurityConfig.java
│   │               │   └── WebConfig.java
│   │               ├── controller/                   # REST controllers
│   │               │   └── ResourceController.java
│   │               ├── service/                      # Service layer
│   │               │   ├── ResourceService.java
│   │               │   └── impl/
│   │               │       └── ResourceServiceImpl.java
│   │               ├── repository/                   # Data access layer
│   │               │   └── ResourceRepository.java
│   │               ├── model/                        # Domain models
│   │               │   ├── entity/                   # JPA entities
│   │               │   │   └── Resource.java
│   │               │   └── dto/                      # Data transfer objects
│   │               │       ├── ResourceDTO.java
│   │               │       └── request/
│   │               │           └── ResourceRequest.java
│   │               ├── exception/                    # Custom exceptions
│   │               │   ├── ResourceNotFoundException.java
│   │               │   └── GlobalExceptionHandler.java
│   │               └── util/                         # Utility classes
│   │                   └── AppUtils.java
│   └── resources/
│       ├── application.yml                           # Main configuration
│       ├── application-dev.yml                       # Dev environment config
│       ├── application-prod.yml                      # Production environment config
│       └── logback-spring.xml                        # Logging configuration
└── test/
    └── java/
        └── com/
            └── example/
                └── project/
                    ├── controller/                   # Controller tests
                    ├── service/                      # Service tests
                    └── repository/                   # Repository tests
```

## Spring Boot Controller Template
Use this template for creating new Spring Boot controllers:

```java
package com.example.project.controller;

import com.example.project.model.dto.ResourceDTO;
import com.example.project.model.dto.request.ResourceRequest;
import com.example.project.service.ResourceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/resources")
@RequiredArgsConstructor
@Tag(name = "Resource API", description = "API for resource management")
public class ResourceController {

    private final ResourceService resourceService;

    @GetMapping
    @Operation(summary = "Get all resources", description = "Returns a paginated list of resources")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved resources")
    public ResponseEntity<Page<ResourceDTO>> getAllResources(Pageable pageable) {
        Page<ResourceDTO> resources = resourceService.getAllResources(pageable);
        return ResponseEntity.ok(resources);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get resource by ID", description = "Returns a resource by its ID")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved resource")
    @ApiResponse(responseCode = "404", description = "Resource not found")
    public ResponseEntity<ResourceDTO> getResourceById(@PathVariable Long id) {
        ResourceDTO resource = resourceService.getResourceById(id);
        return ResponseEntity.ok(resource);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a new resource", description = "Creates a new resource with the provided data")
    @ApiResponse(responseCode = "201", description = "Resource created successfully")
    @ApiResponse(responseCode = "400", description = "Invalid input")
    public ResponseEntity<ResourceDTO> createResource(@Valid @RequestBody ResourceRequest request) {
        ResourceDTO createdResource = resourceService.createResource(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdResource);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update a resource", description = "Updates a resource with the provided data")
    @ApiResponse(responseCode = "200", description = "Resource updated successfully")
    @ApiResponse(responseCode = "400", description = "Invalid input")
    @ApiResponse(responseCode = "404", description = "Resource not found")
    public ResponseEntity<ResourceDTO> updateResource(
            @PathVariable Long id,
            @Valid @RequestBody ResourceRequest request) {
        ResourceDTO updatedResource = resourceService.updateResource(id, request);
        return ResponseEntity.ok(updatedResource);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a resource", description = "Deletes a resource by its ID")
    @ApiResponse(responseCode = "204", description = "Resource deleted successfully")
    @ApiResponse(responseCode = "404", description = "Resource not found")
    public ResponseEntity<Void> deleteResource(@PathVariable Long id) {
        resourceService.deleteResource(id);
        return ResponseEntity.noContent().build();
    }
}
```

## Spring Boot Service Template
Use this template for creating new Spring Boot services:

```java
package com.example.project.service.impl;

import com.example.project.exception.ResourceNotFoundException;
import com.example.project.model.dto.ResourceDTO;
import com.example.project.model.dto.request.ResourceRequest;
import com.example.project.model.entity.Resource;
import com.example.project.repository.ResourceRepository;
import com.example.project.service.ResourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ResourceServiceImpl implements ResourceService {

    private final ResourceRepository resourceRepository;
    private final ResourceMapper resourceMapper;

    @Override
    @Transactional(readOnly = true)
    public Page<ResourceDTO> getAllResources(Pageable pageable) {
        Page<Resource> resources = resourceRepository.findAll(pageable);
        return resources.map(resourceMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public ResourceDTO getResourceById(Long id) {
        Resource resource = findResourceById(id);
        return resourceMapper.toDto(resource);
    }

    @Override
    @Transactional
    public ResourceDTO createResource(ResourceRequest request) {
        Resource resource = resourceMapper.toEntity(request);
        Resource savedResource = resourceRepository.save(resource);
        return resourceMapper.toDto(savedResource);
    }

    @Override
    @Transactional
    public ResourceDTO updateResource(Long id, ResourceRequest request) {
        Resource existingResource = findResourceById(id);
        resourceMapper.updateEntity(existingResource, request);
        Resource updatedResource = resourceRepository.save(existingResource);
        return resourceMapper.toDto(updatedResource);
    }

    @Override
    @Transactional
    public void deleteResource(Long id) {
        Resource resource = findResourceById(id);
        resourceRepository.delete(resource);
    }

    private Resource findResourceById(Long id) {
        return resourceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Resource not found with id: " + id));
    }
}
```

## Spring Boot Best Practices
When implementing Spring Boot applications, follow these best practices:

1. **Dependency Injection**:
   - Use constructor injection over field injection
   - Keep components loosely coupled
   - Use interfaces for service definitions
   - Avoid circular dependencies
   - Use @RequiredArgsConstructor with final fields
   - Minimize component scope
   - Use appropriate bean scopes

2. **Security**:
   - Keep Spring Security updated
   - Use method-level security
   - Implement proper CSRF protection
   - Use secure password encoding
   - Configure proper CORS settings
   - Implement proper authentication
   - Use HTTPS in production

3. **Performance**:
   - Use appropriate caching strategies
   - Configure connection pooling properly
   - Use lazy loading where appropriate
   - Optimize database queries
   - Use pagination for large result sets
   - Configure proper JVM settings
   - Use async processing for long-running tasks

4. **Error Handling**:
   - Implement global exception handling
   - Create custom exception classes
   - Return appropriate HTTP status codes
   - Use consistent error response format
   - Log exceptions properly
   - Handle validation errors
   - Implement proper error messages

5. **Testing**:
   - Write unit tests for services
   - Implement integration tests for controllers
   - Use @DataJpaTest for repository testing
   - Mock external dependencies
   - Test error handling and edge cases
   - Use test slices for faster tests
   - Implement proper test coverage
