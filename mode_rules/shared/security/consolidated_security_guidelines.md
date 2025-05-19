# Consolidated Security Guidelines

This document provides comprehensive security guidelines that apply across all modes. It combines core security principles with specific guidance for application security, infrastructure security, and security testing.

## Core Security Principles

### 1. Defense in Depth
- Implement multiple layers of security controls
- Never rely on a single security measure
- Combine preventive, detective, and corrective controls
- Apply security at different architectural layers
- Consider both technical and non-technical controls

### 2. Principle of Least Privilege
- Grant only the minimum permissions necessary
- Limit access to sensitive functions and data
- Implement proper role-based access control
- Regularly review and audit permissions
- Implement time-limited access when possible

### 3. Secure by Default
- Systems should be secure in their default configuration
- Security should not depend on user actions
- Disable unnecessary features and services
- Use secure default settings
- Implement proper error handling by default

### 4. Zero Trust Architecture
- Never trust, always verify
- Verify explicitly based on all available data points
- Use least privilege access
- Assume breach mentality
- Implement continuous monitoring and validation

### 5. Security by Design
- Integrate security from the beginning of the development lifecycle
- Consider security in all architectural decisions
- Implement threat modeling early in the design process
- Design with security testing in mind
- Document security decisions and assumptions

## Application Security Guidelines

### 1. Authentication
- Implement strong authentication mechanisms
- Use multi-factor authentication for sensitive functions
- Secure credential storage and transmission
- Implement proper session management
- Consider context-aware authentication
- Use secure password policies and storage
- Implement account lockout mechanisms
- Use secure password reset functionality

### 2. Authorization
- Implement proper access control mechanisms
- Use role-based or attribute-based access control
- Verify authorization on every request
- Implement proper error handling for unauthorized access
- Consider fine-grained authorization
- Apply the principle of least privilege
- Implement separation of duties for sensitive operations
- Regularly review and audit access controls

### 3. Data Protection
- Classify data based on sensitivity
- Encrypt sensitive data in transit and at rest
- Implement proper key management
- Apply data minimization principles
- Consider data retention and deletion
- Use secure storage mechanisms
- Implement proper backup and recovery procedures
- Consider privacy regulations and requirements

### 4. Input Validation and Output Encoding
- Validate all input data
- Use positive validation (allowlist) over negative validation (blocklist)
- Implement proper sanitization for different contexts
- Consider validation at multiple layers
- Implement proper error handling for invalid input
- Use context-specific output encoding
- Implement proper content security policies
- Consider all input sources (URL parameters, form fields, headers, cookies, etc.)

### 5. API Security
- Implement proper authentication and authorization
- Use HTTPS for all API communications
- Implement proper rate limiting
- Validate all input data
- Implement proper error handling
- Use proper HTTP methods and status codes
- Consider API versioning
- Document API security requirements

## Infrastructure Security Guidelines

### 1. Network Security
- Implement proper network segmentation
- Use firewalls and network access controls
- Implement intrusion detection/prevention systems
- Use secure communication protocols
- Implement proper logging and monitoring
- Consider DDoS protection
- Implement proper DNS security
- Use VPNs or secure connectivity options for remote access

### 2. Cloud Security
- Implement proper identity and access management
- Use secure configuration for cloud services
- Implement proper logging and monitoring
- Consider data sovereignty and compliance
- Implement proper backup and recovery procedures
- Use encryption for data at rest and in transit
- Implement proper network security controls
- Consider shared responsibility model

### 3. Container Security
- Use minimal base images
- Scan container images for vulnerabilities
- Implement proper access controls
- Use read-only file systems where possible
- Implement proper resource limits
- Use seccomp profiles to restrict system calls
- Implement proper network segmentation
- Consider using container-specific security tools

### 4. Database Security
- Implement proper authentication and authorization
- Use encryption for sensitive data
- Implement proper access controls
- Use parameterized queries to prevent injection attacks
- Implement proper logging and monitoring
- Consider database-specific security features
- Regularly backup and test recovery procedures
- Implement proper patch management

## Security Testing Guidelines

### 1. Static Application Security Testing (SAST)
- Integrate into CI/CD pipeline
- Focus on high-risk areas
- Address critical and high vulnerabilities
- Use multiple tools for better coverage
- Customize rules for your application
- Consider language-specific tools
- Implement proper false positive management
- Document findings and remediation

### 2. Dynamic Application Security Testing (DAST)
- Test in staging environment
- Use authenticated and unauthenticated scans
- Focus on business logic vulnerabilities
- Combine with manual testing
- Integrate into CI/CD pipeline
- Consider API-specific testing
- Document findings and remediation
- Implement proper vulnerability management

### 3. Penetration Testing
- Conduct regular penetration tests
- Focus on business logic vulnerabilities
- Test authentication and authorization
- Test input validation and output encoding
- Test session management
- Test error handling and logging
- Document findings and remediation
- Implement proper vulnerability management

## Mode-Specific Responsibilities

Different modes have specific responsibilities related to security:

- **Security Specialist**: Primary owner of security guidelines, provides detailed implementation guidance
- **Backend Developer**: Implements security controls in backend code
- **Frontend Developer**: Implements security controls in frontend code
- **DevOps Engineer**: Implements security controls in infrastructure and CI/CD
- **Database Expert**: Implements security controls in database design and operations
- **Tester**: Verifies security controls through testing
- **Code Reviewer**: Evaluates security aspects during code review
