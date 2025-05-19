# Web Application Security

## Overview
This document outlines best practices, common vulnerabilities, and security controls for web applications. These guidelines should be followed to ensure that web applications are protected against common threats and vulnerabilities.

## OWASP Top 10 Vulnerabilities

### 1. Injection
- **Description**: Injection flaws, such as SQL, NoSQL, OS, and LDAP injection, occur when untrusted data is sent to an interpreter as part of a command or query.
- **Prevention**:
  - Use parameterized queries for SQL and NoSQL databases
  - Implement proper input validation and sanitization
  - Use ORM frameworks with parameterized queries
  - Apply the principle of least privilege for database accounts
  - Use prepared statements and stored procedures
  - Implement proper error handling to prevent information disclosure

### 2. Broken Authentication
- **Description**: Application functions related to authentication and session management are often implemented incorrectly, allowing attackers to compromise passwords, keys, or session tokens.
- **Prevention**:
  - Implement multi-factor authentication
  - Use secure password storage with strong hashing algorithms (bcrypt, Argon2)
  - Implement proper session management
  - Use secure cookie attributes (HttpOnly, Secure, SameSite)
  - Implement account lockout mechanisms
  - Enforce strong password policies
  - Implement proper session timeout and invalidation

### 3. Sensitive Data Exposure
- **Description**: Many web applications do not properly protect sensitive data, such as financial, healthcare, and PII.
- **Prevention**:
  - Encrypt sensitive data at rest and in transit
  - Use strong encryption algorithms and proper key management
  - Disable caching for sensitive data
  - Implement proper access controls
  - Classify data and apply appropriate protection
  - Implement data minimization principles
  - Use HTTPS for all connections

### 4. XML External Entities (XXE)
- **Description**: Many older or poorly configured XML processors evaluate external entity references within XML documents.
- **Prevention**:
  - Disable XML external entity processing
  - Use less complex data formats like JSON
  - Patch or upgrade XML processors
  - Implement server-side input validation
  - Use allowlists for input validation

### 5. Broken Access Control
- **Description**: Restrictions on what authenticated users are allowed to do are often not properly enforced.
- **Prevention**:
  - Implement proper access control checks
  - Use role-based access control (RBAC)
  - Deny by default
  - Implement proper session management
  - Validate access control on every request
  - Implement proper error handling for unauthorized access
  - Use security headers like Content-Security-Policy

### 6. Security Misconfiguration
- **Description**: Security misconfiguration is the most commonly seen issue, often resulting from insecure default configurations, incomplete configurations, or verbose error messages.
- **Prevention**:
  - Use secure default configurations
  - Remove unnecessary features, components, and documentation
  - Implement proper error handling
  - Use security headers
  - Keep systems and dependencies updated
  - Implement a secure configuration management process
  - Automate security configuration verification

### 7. Cross-Site Scripting (XSS)
- **Description**: XSS flaws occur when an application includes untrusted data in a new web page without proper validation or escaping.
- **Prevention**:
  - Implement proper input validation and output encoding
  - Use Content-Security-Policy (CSP) headers
  - Use modern frameworks that automatically escape XSS by design
  - Sanitize HTML input
  - Use context-specific output encoding
  - Implement proper cookie security (HttpOnly, Secure, SameSite)

### 8. Insecure Deserialization
- **Description**: Insecure deserialization often leads to remote code execution.
- **Prevention**:
  - Implement integrity checks for serialized objects
  - Enforce strict type constraints during deserialization
  - Isolate deserialization code in low-privilege environments
  - Log deserialization exceptions and failures
  - Monitor deserialization activities
  - Restrict or encrypt serialized data

### 9. Using Components with Known Vulnerabilities
- **Description**: Components, such as libraries, frameworks, and other software modules, run with the same privileges as the application.
- **Prevention**:
  - Keep an inventory of components and their versions
  - Remove unused dependencies
  - Monitor security sources for vulnerabilities
  - Use software composition analysis tools
  - Obtain components from official sources
  - Implement a patch management process
  - Plan for component updates and replacements

### 10. Insufficient Logging & Monitoring
- **Description**: Insufficient logging and monitoring, coupled with missing or ineffective integration with incident response, allows attackers to further attack systems.
- **Prevention**:
  - Implement proper logging for security-relevant events
  - Ensure log integrity and confidentiality
  - Implement centralized log management
  - Implement proper monitoring and alerting
  - Develop an incident response plan
  - Conduct regular security audits
  - Implement automated security monitoring

## Web Security Headers

### Content-Security-Policy (CSP)
- **Purpose**: Mitigate XSS and data injection attacks
- **Implementation**:
  - Define trusted sources for content
  - Use nonce or hash for inline scripts
  - Implement report-uri for violations
  - Start with report-only mode for testing
  - Gradually tighten the policy

### X-Content-Type-Options
- **Purpose**: Prevent MIME type sniffing
- **Implementation**:
  - Set to "nosniff"
  - Ensure proper Content-Type headers

### X-Frame-Options
- **Purpose**: Protect against clickjacking
- **Implementation**:
  - Set to "DENY" or "SAMEORIGIN"
  - Consider using CSP frame-ancestors instead

### X-XSS-Protection
- **Purpose**: Enable browser's XSS filter
- **Implementation**:
  - Set to "1; mode=block"
  - Consider using CSP instead for modern browsers

### Strict-Transport-Security (HSTS)
- **Purpose**: Enforce HTTPS
- **Implementation**:
  - Set appropriate max-age
  - Include subdomains if appropriate
  - Consider preloading

### Referrer-Policy
- **Purpose**: Control referrer information
- **Implementation**:
  - Set to "no-referrer" or "same-origin"
  - Consider "strict-origin-when-cross-origin" for balanced approach

### Feature-Policy/Permissions-Policy
- **Purpose**: Control browser features
- **Implementation**:
  - Restrict unnecessary features
  - Only enable required features
  - Test thoroughly after implementation

## Client-Side Security

### Cross-Site Request Forgery (CSRF) Protection
- Implement anti-CSRF tokens
- Use SameSite cookie attribute
- Verify origin and referrer headers
- Implement proper session management
- Use proper HTTP methods (GET for read-only operations)

### Browser Storage Security
- Use secure storage mechanisms (HttpOnly cookies for sensitive data)
- Implement proper access controls for localStorage and sessionStorage
- Encrypt sensitive data stored in browser
- Implement proper session timeout and cleanup
- Be cautious with third-party scripts

### Front-End Framework Security
- Keep frameworks and libraries updated
- Use security features provided by frameworks
- Implement proper input validation and output encoding
- Use Content Security Policy
- Implement proper authentication and authorization
- Be cautious with third-party components

## Web Application Firewall (WAF)

### Benefits
- Protection against common web attacks
- Virtual patching for known vulnerabilities
- DDoS protection
- Bot protection
- API security

### Implementation Considerations
- Deploy in monitoring mode first
- Gradually enable blocking rules
- Customize rules for your application
- Monitor for false positives
- Regularly update rules
- Consider both cloud and on-premises options

## Security Testing for Web Applications

### Static Application Security Testing (SAST)
- Integrate into CI/CD pipeline
- Focus on high-risk areas
- Address critical and high vulnerabilities
- Use multiple tools for better coverage
- Customize rules for your application

### Dynamic Application Security Testing (DAST)
- Test in staging environment
- Use authenticated and unauthenticated scans
- Focus on business logic vulnerabilities
- Combine with manual testing
- Integrate into CI/CD pipeline

### Manual Penetration Testing
- Conduct regular penetration tests
- Focus on business logic vulnerabilities
- Test authentication and authorization
- Test input validation and output encoding
- Test session management
- Test error handling and logging
