# Web Application Project Type - Product Manager Rules

## Overview
These rules extend the core Product Manager rules specifically for web application projects. When gathering requirements for web applications, you must pay special attention to the unique aspects of web-based software.

## Web-Specific Requirements Areas

### 1. Browser Compatibility
- **Required Information**:
  - Target browsers and minimum versions
  - Mobile browser support requirements
  - Progressive enhancement vs. graceful degradation approach
  - Specific browser features required or to be avoided

### 2. Responsive Design Requirements
- **Required Information**:
  - Target device types (desktop, tablet, mobile, etc.)
  - Minimum and maximum screen sizes to support
  - Breakpoint strategy
  - Touch vs. mouse interaction requirements
  - Device-specific features to leverage or accommodate

### 3. Web Performance Requirements
- **Required Information**:
  - Target page load times
  - First contentful paint targets
  - Time to interactive targets
  - Performance budgets for different page types
  - Offline capabilities requirements

### 4. Web-Specific User Experience
- **Required Information**:
  - Navigation patterns (SPA vs. MPA)
  - URL structure and routing requirements
  - State management requirements
  - Form handling and validation requirements
  - Error handling and feedback mechanisms

### 5. Web Security Requirements
- **Required Information**:
  - Authentication requirements
  - Authorization and permission models
  - Data protection requirements
  - CSRF, XSS, and other web-specific security concerns
  - Compliance requirements (GDPR, CCPA, etc.)

### 6. SEO Requirements
- **Required Information**:
  - SEO importance (critical, important, not important)
  - Specific SEO requirements (meta tags, structured data, etc.)
  - Server-side rendering requirements
  - URL structure requirements for SEO

### 7. Analytics and Monitoring
- **Required Information**:
  - User behavior tracking requirements
  - Conversion tracking requirements
  - Performance monitoring requirements
  - Error tracking requirements

### 8. Integration Requirements
- **Required Information**:
  - Third-party services to integrate with
  - API requirements
  - Social media integration requirements
  - Payment processing requirements

## Web Application PRD Additions
For web application projects, you MUST include these additional sections in the PRD:

### 1. Web Platform Strategy
- Browser support matrix
- Device support matrix
- Progressive enhancement strategy

### 2. Page/View Inventory
- List of all pages/views in the application
- Purpose of each page/view
- Key components on each page/view
- User flows between pages/views

### 3. Web-Specific Non-Functional Requirements
- Performance requirements by page type
- Accessibility compliance level (WCAG 2.0 A, AA, AAA)
- SEO requirements
- Analytics requirements

### 4. Technical Constraints
- Hosting environment constraints
- CDN requirements
- Domain and SSL requirements
- Third-party script dependencies

## Web Application User Story Specifics
When creating user stories for web applications, ensure you:

1. **Include Device Context**:
   - "As a mobile user, I want to..."
   - "As a desktop user, I want to..."

2. **Address Connection Scenarios**:
   - "As a user with a slow internet connection, I want to..."
   - "As a user in offline mode, I want to..."

3. **Consider Browser-Specific Scenarios**:
   - "As a user with JavaScript disabled, I want to..."
   - "As a user with an older browser, I want to..."

## Web Application Requirements Gathering Questions
Use these additional questions when gathering requirements for web applications:

1. **Platform Questions**:
   - "Which browsers and versions must be supported?"
   - "What is the expected breakdown of device types (desktop/tablet/mobile)?"
   - "Are there any specific browser features that must be supported or avoided?"

2. **Performance Questions**:
   - "What are the performance expectations for different types of pages?"
   - "Are there specific markets with slow internet connections that need to be supported?"
   - "What is the strategy for users on slow connections or with limited data plans?"

3. **UX Questions**:
   - "Should the application function as a Single Page Application or Multi-Page Application?"
   - "What are the requirements for URL structure and deep linking?"
   - "How should the application handle browser history and navigation?"

4. **Offline Capability Questions**:
   - "Does the application need to function offline?"
   - "What features should be available offline?"
   - "How should data synchronization work when coming back online?"

5. **SEO Questions**:
   - "How important is search engine optimization for this application?"
   - "Are there specific SEO requirements or strategies to implement?"
   - "Is server-side rendering required for SEO purposes?"

Remember to document all web-specific requirements in the appropriate sections of the PRD and ensure they are properly prioritized using the MoSCoW method.
