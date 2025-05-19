# API Service Project Type - Product Manager Rules

## Overview
These rules extend the core Product Manager rules specifically for API service projects. When gathering requirements for API services, you must pay special attention to the unique aspects of API design and implementation.

## API-Specific Requirements Areas

### 1. API Consumer Identification
- **Required Information**:
  - Primary API consumers (internal systems, third-party developers, public)
  - Consumer technical capabilities and constraints
  - Consumer use cases and integration patterns
  - Consumer authentication and authorization needs

### 2. API Design Style
- **Required Information**:
  - API architectural style (REST, GraphQL, gRPC, SOAP, etc.)
  - Versioning strategy requirements
  - Naming convention requirements
  - Resource modeling approach

### 3. API Functionality Requirements
- **Required Information**:
  - Core resources/entities to be exposed
  - Required operations on each resource (CRUD, custom actions)
  - Data filtering, sorting, and pagination requirements
  - Batch operation requirements
  - Real-time/streaming requirements

### 4. API Performance Requirements
- **Required Information**:
  - Expected request volume
  - Response time targets
  - Throughput requirements
  - Rate limiting requirements
  - Caching requirements

### 5. API Security Requirements
- **Required Information**:
  - Authentication requirements
  - Authorization model
  - Data encryption requirements
  - API key management
  - Rate limiting and throttling requirements
  - Security audit and logging requirements

### 6. API Documentation Requirements
- **Required Information**:
  - Documentation format (OpenAPI/Swagger, RAML, API Blueprint, etc.)
  - Documentation hosting requirements
  - Code example requirements
  - Interactive documentation/playground requirements

### 7. API Integration Requirements
- **Required Information**:
  - Systems the API needs to integrate with
  - Data transformation requirements
  - Error handling and propagation requirements
  - Synchronous vs. asynchronous communication patterns

## API Service PRD Additions
For API service projects, you MUST include these additional sections in the PRD:

### 1. API Strategy
- API architectural style justification
- Versioning strategy
- Deprecation policy
- Backward compatibility requirements

### 2. Resource/Endpoint Inventory
- List of all resources/endpoints
- Purpose of each resource/endpoint
- Operations supported on each resource/endpoint
- Data models for each resource

### 3. API-Specific Non-Functional Requirements
- Performance SLAs by endpoint
- Availability requirements
- Scalability requirements
- Monitoring and observability requirements

### 4. API Security Model
- Authentication mechanisms
- Authorization model
- Data protection requirements
- Rate limiting and abuse prevention

### 5. API Documentation Requirements
- Documentation format and tools
- Required documentation components
- Example code requirements
- Developer onboarding materials

## API Service User Story Specifics
When creating user stories for API services, ensure you:

1. **Include Consumer Context**:
   - "As a third-party developer, I want to..."
   - "As an internal system, I want to..."

2. **Address Integration Scenarios**:
   - "As a consumer with limited bandwidth, I want to..."
   - "As a consumer requiring real-time updates, I want to..."

3. **Consider Error Handling Scenarios**:
   - "As an API consumer encountering an error, I want to..."
   - "As an API consumer with invalid credentials, I want to..."

## API Service Requirements Gathering Questions
Use these additional questions when gathering requirements for API services:

1. **Consumer Questions**:
   - "Who are the primary consumers of this API?"
   - "What are the technical capabilities and constraints of these consumers?"
   - "What are the primary use cases for each consumer type?"

2. **Design Style Questions**:
   - "What API architectural style is preferred (REST, GraphQL, gRPC, etc.)?"
   - "What versioning strategy should be employed?"
   - "Are there specific naming conventions or standards that must be followed?"

3. **Functionality Questions**:
   - "What core resources/entities need to be exposed via the API?"
   - "What operations are required for each resource?"
   - "Are there requirements for filtering, sorting, or pagination?"
   - "Are there any batch operation requirements?"
   - "Are there any real-time or streaming data requirements?"

4. **Performance Questions**:
   - "What is the expected request volume?"
   - "What are the response time targets for different endpoints?"
   - "Are there specific throughput requirements?"
   - "What are the caching requirements?"

5. **Security Questions**:
   - "What authentication mechanisms are required?"
   - "What is the authorization model?"
   - "Are there specific data protection requirements?"
   - "What are the rate limiting and throttling requirements?"

6. **Documentation Questions**:
   - "What documentation format is preferred?"
   - "Are interactive documentation or playgrounds required?"
   - "What code examples should be provided?"
   - "How should the documentation be hosted and maintained?"

Remember to document all API-specific requirements in the appropriate sections of the PRD and ensure they are properly prioritized using the MoSCoW method.
