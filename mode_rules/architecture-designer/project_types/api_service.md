# API Service Project Type - Architecture Designer Rules

## Overview
These rules extend the core Architecture Designer rules specifically for API service projects. When designing architecture for API services, you must pay special attention to the unique aspects of API design, implementation, and management.

## API-Specific Architecture Considerations

### 1. API Architectural Style
- **Required Decisions**:
  - REST vs. GraphQL vs. gRPC vs. WebSockets vs. SOAP
  - Synchronous vs. asynchronous communication patterns
  - Request-response vs. event-driven patterns
  - Batch processing capabilities
  - Streaming capabilities
  - API versioning strategy

### 2. API Design
- **Required Decisions**:
  - Resource modeling approach
  - URL/endpoint structure
  - Request/response formats
  - Error handling and status codes
  - Pagination, filtering, and sorting mechanisms
  - Field selection/projection mechanisms
  - Bulk operation support
  - Idempotency strategy

### 3. API Implementation Architecture
- **Required Decisions**:
  - Framework selection
  - Controller/handler structure
  - Middleware architecture
  - Validation approach
  - Serialization/deserialization strategy
  - Exception handling strategy
  - Logging and monitoring approach

### 4. API Security Architecture
- **Required Decisions**:
  - Authentication mechanisms
  - Authorization model
  - API key management
  - Rate limiting and throttling
  - Input validation and sanitization
  - CORS policy (for web APIs)
  - Security headers
  - Encryption requirements

### 5. API Performance Architecture
- **Required Decisions**:
  - Caching strategy
  - Database query optimization
  - Connection pooling
  - Asynchronous processing
  - Compression
  - Response time optimization
  - Batch processing

### 6. API Scalability Architecture
- **Required Decisions**:
  - Horizontal vs. vertical scaling approach
  - Stateless design considerations
  - Load balancing strategy
  - Database scaling strategy
  - Caching infrastructure
  - Rate limiting implementation

### 7. API Documentation and Developer Experience
- **Required Decisions**:
  - API documentation format (OpenAPI/Swagger, RAML, API Blueprint)
  - Interactive documentation tools
  - Code example generation
  - SDK generation strategy
  - Developer portal requirements

### 8. API Governance and Management
- **Required Decisions**:
  - API gateway implementation
  - Monitoring and analytics
  - Versioning implementation
  - Deprecation strategy
  - SLA enforcement
  - API lifecycle management

## API Service Architecture Document Additions
For API service projects, you MUST include these additional sections in the architecture document:

### 1. API Design Guidelines
- Naming conventions
- Resource modeling principles
- URL structure rules
- Request/response format standards
- Error handling standards
- Versioning approach

### 2. API Contract Specifications
- Detailed endpoint documentation
- Request/response schemas
- Authentication requirements
- Rate limiting policies
- Example requests and responses

### 3. API Security Model
- Authentication mechanisms
- Authorization model
- Scope definitions
- Security implementation details
- Threat mitigation strategies

### 4. API Performance and Scalability
- Performance SLAs by endpoint
- Caching strategy details
- Scaling approach
- Resource utilization expectations
- Load testing approach

## API Service Technology Stack Considerations
When recommending technology stacks for API services, consider these specific factors:

### 1. API Framework Considerations
- Performance characteristics
- Developer productivity
- Team expertise
- Ecosystem and library availability
- Long-term support and stability
- Scalability features
- Security features
- Documentation generation capabilities

### 2. API Gateway Considerations
- Traffic management capabilities
- Security features
- Monitoring and analytics
- Transformation capabilities
- Caching features
- Developer portal integration
- Deployment model (cloud, on-premises, hybrid)

### 3. Database Considerations
- Query patterns
- Transaction requirements
- Scaling requirements
- Consistency vs. availability needs
- Development team expertise
- Operational complexity
- Cost considerations

## API Service Architecture Questions
Use these additional questions when designing architecture for API services:

1. **Consumer Questions**:
   - "Who are the primary consumers of this API?"
   - "What are the technical capabilities and constraints of these consumers?"
   - "What are the primary use cases for each consumer type?"
   - "Are there any specific client libraries or SDKs that need to be supported?"

2. **Design Style Questions**:
   - "What API architectural style is preferred (REST, GraphQL, gRPC, etc.)?"
   - "What are the primary factors driving the API design (performance, flexibility, ease of use)?"
   - "Are there existing APIs that this new API needs to be consistent with?"
   - "What versioning strategy should be employed?"

3. **Performance Questions**:
   - "What is the expected request volume?"
   - "What are the response time targets for different endpoints?"
   - "Are there specific throughput requirements?"
   - "What are the caching requirements?"
   - "Are there any specific data volume considerations?"

4. **Security Questions**:
   - "What authentication mechanisms are required?"
   - "What is the authorization model?"
   - "Are there specific data protection requirements?"
   - "What are the rate limiting and throttling requirements?"
   - "Are there any compliance requirements that affect API design?"

5. **Integration Questions**:
   - "What systems will this API need to integrate with?"
   - "Are there any legacy systems with specific integration challenges?"
   - "Are there any specific data transformation requirements?"
   - "What error handling and propagation approach is needed?"

Remember to document all API-specific architectural decisions in the appropriate sections of the architecture document and ensure they are properly justified with clear rationales.
