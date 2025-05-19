# Security Review Checklist

## Overview
This checklist provides a comprehensive framework for evaluating the security aspects of code. It focuses on identifying potential security vulnerabilities, ensuring proper implementation of security controls, and adherence to security best practices.

> **IMPORTANT**: This checklist extends the shared security guidelines defined in `/mode_rules/shared/security/consolidated_security_guidelines.md`. Always refer to the shared guidelines as the foundation for all security reviews. The Security Specialist mode is the primary owner of security guidelines, and Code Reviewer mode should collaborate with Security Specialist mode on security-related code reviews.

## Input Validation and Output Encoding

### 1. Input Validation
- [ ] All user input is validated
- [ ] Validation is performed on the server side
- [ ] Input is validated for type, length, format, and range
- [ ] Validation uses allowlists rather than denylists
- [ ] Validation errors provide minimal information to users
- [ ] Validation is consistent across the application
- [ ] Special characters are properly handled
- [ ] Validation considers all input sources (URL parameters, form fields, headers, cookies, etc.)
- [ ] Structured data is validated against schemas
- [ ] File uploads are properly validated

### 2. Output Encoding
- [ ] Data is properly encoded before being included in output
- [ ] HTML encoding is used for data in HTML context
- [ ] JavaScript encoding is used for data in JavaScript context
- [ ] CSS encoding is used for data in CSS context
- [ ] URL encoding is used for data in URL context
- [ ] Encoding is context-specific
- [ ] Encoding is performed at the point of output
- [ ] Multi-step encoding issues are avoided
- [ ] Character encoding is properly specified
- [ ] Content-Type headers are properly set

## Authentication and Authorization

### 1. Authentication
- [ ] Passwords are stored using strong, adaptive hashing algorithms
- [ ] Multi-factor authentication is implemented for sensitive functions
- [ ] Authentication failures provide minimal information
- [ ] Account lockout is implemented for repeated failures
- [ ] Session IDs are properly generated and managed
- [ ] Authentication credentials are transmitted securely
- [ ] "Remember me" functionality is implemented securely
- [ ] Password reset functionality is secure
- [ ] Authentication is required for all sensitive functions
- [ ] Authentication mechanisms are consistent across the application

### 2. Authorization
- [ ] Authorization checks are performed for all sensitive operations
- [ ] Principle of least privilege is applied
- [ ] Role-based access control is properly implemented
- [ ] Authorization checks are performed on the server side
- [ ] Direct object references are protected
- [ ] Horizontal and vertical privilege escalation is prevented
- [ ] Authorization checks consider resource ownership
- [ ] Authorization bypass through forced browsing is prevented
- [ ] Authorization checks are consistent across the application
- [ ] Authorization failures are properly logged

## Session Management

### 1. Session Security
- [ ] Session IDs are sufficiently random
- [ ] Session IDs are transmitted securely
- [ ] Session IDs are stored securely
- [ ] Sessions have appropriate timeout periods
- [ ] Sessions are properly invalidated on logout
- [ ] New session IDs are generated on authentication
- [ ] Session fixation attacks are prevented
- [ ] Concurrent session control is implemented when appropriate
- [ ] Session data is stored securely
- [ ] Sensitive data is not stored in session if not needed

### 2. Cookie Security
- [ ] Sensitive cookies have the Secure flag
- [ ] Cookies have the HttpOnly flag when appropriate
- [ ] Cookies have appropriate SameSite attribute
- [ ] Cookies have appropriate Domain and Path attributes
- [ ] Cookies have appropriate expiration
- [ ] Session cookies don't persist beyond browser close
- [ ] Cookie values are protected from tampering
- [ ] Sensitive data is not stored in cookies if not needed
- [ ] Cookie prefixes are used when appropriate
- [ ] Cookie jar overflow is prevented

## Data Protection

### 1. Sensitive Data Handling
- [ ] Sensitive data is identified and classified
- [ ] Sensitive data is encrypted in transit
- [ ] Sensitive data is encrypted at rest
- [ ] Encryption uses strong algorithms and key sizes
- [ ] Encryption keys are properly managed
- [ ] Sensitive data is not logged
- [ ] Sensitive data is not stored in client-side storage
- [ ] Sensitive data is not included in URLs
- [ ] Data minimization principles are applied
- [ ] Sensitive data is properly masked in display

### 2. Cryptography
- [ ] Cryptographic modules from trusted libraries are used
- [ ] Strong, standard algorithms are used
- [ ] Appropriate key lengths are used
- [ ] Secure random number generation is used
- [ ] Initialization vectors are properly used
- [ ] Key management is secure
- [ ] Cryptographic operations are properly implemented
- [ ] Weak algorithms are not used
- [ ] Cryptographic protocols are properly configured
- [ ] Certificate validation is properly implemented

## Error Handling and Logging

### 1. Error Handling
- [ ] Errors are handled gracefully
- [ ] Error messages don't reveal sensitive information
- [ ] Custom error pages are used
- [ ] Exceptions are caught and handled appropriately
- [ ] Error handling doesn't introduce security vulnerabilities
- [ ] Stack traces are not exposed to users
- [ ] Error handling is consistent across the application
- [ ] Error handling preserves security context
- [ ] Default error handlers are overridden when necessary
- [ ] Error handling doesn't create denial of service vulnerabilities

### 2. Logging
- [ ] Security-relevant events are logged
- [ ] Logs include necessary context but not sensitive data
- [ ] Log integrity is protected
- [ ] Log access is controlled
- [ ] Logs are stored securely
- [ ] Log format is consistent and parseable
- [ ] Timestamps are included in logs
- [ ] Logs include appropriate identifiers (session, user, etc.)
- [ ] Logging doesn't create performance issues
- [ ] Log levels are appropriate

## Injection Prevention

### 1. SQL Injection
- [ ] Parameterized queries or prepared statements are used
- [ ] ORM frameworks are used properly
- [ ] User input is not directly concatenated into SQL
- [ ] Stored procedures are used when appropriate
- [ ] Least privilege database accounts are used
- [ ] Error messages don't reveal database information
- [ ] Input validation is applied to database inputs
- [ ] Database queries are properly escaped if parameterization is not possible
- [ ] Dynamic SQL is avoided when possible
- [ ] Database connections are secured

### 2. Other Injection Types
- [ ] Command injection is prevented
- [ ] LDAP injection is prevented
- [ ] XPath injection is prevented
- [ ] XML injection is prevented
- [ ] SSI injection is prevented
- [ ] Email header injection is prevented
- [ ] Template injection is prevented
- [ ] NoSQL injection is prevented
- [ ] GraphQL injection is prevented
- [ ] Log injection is prevented

## Client-Side Security

### 1. Cross-Site Scripting (XSS)
- [ ] Output encoding is used for all data in HTML context
- [ ] Content Security Policy is implemented
- [ ] X-XSS-Protection header is set
- [ ] JavaScript frameworks' built-in XSS protections are used
- [ ] DOM-based XSS is prevented
- [ ] Reflected XSS is prevented
- [ ] Stored XSS is prevented
- [ ] HTML sanitization is used when allowing HTML input
- [ ] JavaScript event handlers are properly secured
- [ ] Iframe security is properly configured

### 2. Cross-Site Request Forgery (CSRF)
- [ ] Anti-CSRF tokens are used for state-changing operations
- [ ] SameSite cookie attribute is used
- [ ] Referrer checking is implemented as a defense in depth
- [ ] Critical functions require re-authentication
- [ ] GET requests are idempotent
- [ ] CSRF protections are consistently applied
- [ ] Token implementation is secure
- [ ] Token validation is performed on the server side
- [ ] CSRF protections consider Single Page Applications
- [ ] Custom headers are used for AJAX requests when appropriate

## Configuration and Deployment

### 1. Security Headers
- [ ] Content-Security-Policy is configured
- [ ] X-Content-Type-Options is set to nosniff
- [ ] X-Frame-Options is configured
- [ ] Strict-Transport-Security is enabled
- [ ] Referrer-Policy is configured
- [ ] Feature-Policy/Permissions-Policy is configured
- [ ] Cache-Control headers are properly set
- [ ] X-XSS-Protection is configured
- [ ] Public-Key-Pins is configured (if appropriate)
- [ ] Headers are consistently applied across the application

### 2. Secure Deployment
- [ ] Development artifacts are not included in production
- [ ] Debug features are disabled in production
- [ ] Default accounts and passwords are changed
- [ ] Unnecessary features and components are disabled
- [ ] Server configuration is hardened
- [ ] TLS is properly configured
- [ ] Error handling is production-appropriate
- [ ] Sensitive configuration is not in code
- [ ] Deployment process is secure
- [ ] Production environments are properly isolated

## Third-Party Components

### 1. Dependency Management
- [ ] Dependencies are from trusted sources
- [ ] Dependencies are up to date
- [ ] Dependencies are scanned for vulnerabilities
- [ ] Unnecessary dependencies are removed
- [ ] Dependency versions are pinned
- [ ] Dependency integrity is verified
- [ ] Dependency update process is in place
- [ ] Vulnerable dependencies are identified and addressed
- [ ] License compliance is verified
- [ ] Dependencies are properly documented

### 2. Third-Party Integrations
- [ ] Third-party services are properly authenticated
- [ ] Data sent to third parties is minimized
- [ ] Third-party callbacks are properly validated
- [ ] Third-party JavaScript is properly isolated
- [ ] Third-party services have appropriate SLAs
- [ ] Fallbacks exist for third-party service failures
- [ ] Third-party permissions are minimized
- [ ] Third-party data handling is compliant with requirements
- [ ] Third-party security practices are assessed
- [ ] Third-party integration is properly documented

## Mobile-Specific Concerns

### 1. Mobile API Security
- [ ] APIs used by mobile apps are secured
- [ ] Mobile-specific authentication is secure
- [ ] API keys are properly protected
- [ ] Certificate pinning is implemented
- [ ] API responses don't contain excessive data
- [ ] API versioning is properly handled
- [ ] API rate limiting is implemented
- [ ] Mobile API endpoints validate client authenticity
- [ ] Sensitive operations require additional authentication
- [ ] API security is consistent with web security

### 2. Mobile Client Security
- [ ] Sensitive data storage on device is minimized
- [ ] App permissions are minimized
- [ ] Certificate validation is properly implemented
- [ ] App transport security is properly configured
- [ ] Inter-app communication is secured
- [ ] WebView implementation is secure
- [ ] Clipboard usage is secure
- [ ] Biometric authentication is properly implemented
- [ ] App obfuscation is implemented when appropriate
- [ ] Rooted/jailbroken device detection is implemented when appropriate

## Conclusion
This checklist provides a comprehensive framework for evaluating code security. Not all items will apply to every codebase or review, and the importance of each item may vary based on project context and security requirements. Use this as a starting point and adapt it to your specific needs.
