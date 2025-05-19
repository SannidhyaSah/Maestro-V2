# Web Application Project Type - Architecture Designer Rules

## Overview
These rules extend the core Architecture Designer rules specifically for web application projects. When designing architecture for web applications, you must pay special attention to the unique aspects of web-based software architecture.

## Web-Specific Architecture Considerations

### 1. Frontend Architecture
- **Required Decisions**:
  - Single Page Application (SPA) vs. Multi-Page Application (MPA) approach
  - Client-side rendering vs. server-side rendering vs. hybrid approaches
  - Frontend framework selection (React, Angular, Vue, Svelte, etc.)
  - State management strategy
  - Component architecture and design system approach
  - Build and bundling strategy

### 2. Backend Architecture
- **Required Decisions**:
  - Monolithic vs. microservices approach
  - API design (REST, GraphQL, etc.)
  - Server-side framework selection
  - Authentication and authorization strategy
  - Session management approach
  - Server-side rendering strategy (if applicable)

### 3. Data Architecture
- **Required Decisions**:
  - Database type(s) and specific technology
  - Data access patterns and ORM/data layer approach
  - Caching strategy (browser, CDN, application, database)
  - Data migration and versioning approach
  - Search functionality implementation

### 4. Web-Specific Infrastructure
- **Required Decisions**:
  - Hosting environment (cloud provider, on-premises, hybrid)
  - CDN strategy
  - Static asset management
  - Scaling approach (vertical, horizontal)
  - Geographic distribution strategy
  - Edge computing considerations

### 5. Web Security Architecture
- **Required Decisions**:
  - HTTPS implementation
  - CORS policy
  - CSP (Content Security Policy) strategy
  - Authentication mechanisms
  - CSRF protection
  - XSS prevention
  - Input validation approach
  - API security measures

### 6. Performance Architecture
- **Required Decisions**:
  - Asset optimization strategy
  - Lazy loading approach
  - Code splitting strategy
  - Critical rendering path optimization
  - Performance monitoring approach
  - Performance budgets and enforcement

### 7. Progressive Web App Considerations
- **Required Decisions**:
  - Service worker strategy
  - Offline capabilities
  - Push notification approach
  - App shell architecture
  - Web app manifest configuration

## Web Application Architecture Document Additions
For web application projects, you MUST include these additional sections in the architecture document:

### 1. Frontend Architecture
- Detailed component hierarchy
- Routing strategy
- State management approach
- Frontend build pipeline
- Frontend testing approach

### 2. Responsive Design Architecture
- Breakpoint strategy
- Mobile-first vs. desktop-first approach
- Responsive image strategy
- Touch interaction considerations

### 3. Web Performance Strategy
- Performance budgets by page type
- Loading strategy (critical path, lazy loading, etc.)
- Caching strategy (browser, CDN, application)
- Asset optimization approach

### 4. Browser Compatibility Strategy
- Target browsers and versions
- Progressive enhancement vs. graceful degradation approach
- Polyfill strategy
- Feature detection approach

## Web Application Technology Stack Considerations
When recommending technology stacks for web applications, consider these specific factors:

### 1. Frontend Framework Considerations
- Application complexity and scale
- Team expertise and learning curve
- Performance requirements
- SEO requirements
- Browser support requirements
- Long-term maintenance considerations
- Community size and support
- Integration with existing systems

### 2. Backend Framework Considerations
- Scalability requirements
- Development speed
- Team expertise
- Ecosystem and library availability
- Long-term support and stability
- Performance characteristics
- Hosting environment compatibility

### 3. Database Considerations
- Data structure complexity
- Query patterns
- Scaling requirements
- Consistency vs. availability needs
- Development team expertise
- Operational complexity
- Cost considerations

## Web Application Architecture Questions
Use these additional questions when designing architecture for web applications:

1. **Frontend Questions**:
   - "What is the expected complexity of the UI components?"
   - "How important is SEO for this application?"
   - "What are the browser support requirements?"
   - "Are there any specific performance targets for initial load time?"
   - "Is offline functionality required?"

2. **Backend Questions**:
   - "What is the expected user load and growth trajectory?"
   - "Are there any specific latency requirements for API responses?"
   - "What authentication mechanisms are preferred?"
   - "Are there any compliance requirements that affect backend architecture?"
   - "What is the expected ratio of read vs. write operations?"

3. **Infrastructure Questions**:
   - "What is the geographic distribution of users?"
   - "Are there any specific uptime or availability requirements?"
   - "What is the expected traffic pattern (steady, spiky, seasonal)?"
   - "Are there any specific disaster recovery requirements?"
   - "What is the budget for infrastructure costs?"

Remember to document all web-specific architectural decisions in the appropriate sections of the architecture document and ensure they are properly justified with clear rationales.
