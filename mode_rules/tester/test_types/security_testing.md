# Security Testing Guidelines

## Overview
Security testing identifies vulnerabilities, threats, and risks in applications and systems to prevent unauthorized access and data breaches. This document provides guidelines for effective security testing across different applications and systems.

> **IMPORTANT**: This document extends the shared security guidelines defined in `/mode_rules/shared/security/consolidated_security_guidelines.md`. Always refer to the shared guidelines as the foundation for all security testing work. The Security Specialist mode is the primary owner of security guidelines, and Tester mode should collaborate with Security Specialist mode on security testing activities.

## Key Principles

1. **Adopt a Security-First Mindset**: Approach testing from an attacker's perspective.

2. **Test Throughout the SDLC**: Integrate security testing at all stages of development.

3. **Use Multiple Testing Techniques**: Combine automated and manual testing approaches.

4. **Stay Current with Threats**: Keep up with emerging security threats and vulnerabilities.

5. **Follow Security Standards**: Align testing with established security standards and frameworks.

6. **Prioritize Based on Risk**: Focus on high-risk areas and critical vulnerabilities first.

7. **Verify Remediation**: Confirm that identified vulnerabilities are properly fixed.

## Types of Security Tests

### Vulnerability Assessment
- Identifies security weaknesses in systems and applications
- Uses automated scanning tools to detect known vulnerabilities
- Provides a comprehensive view of security posture
- Prioritizes vulnerabilities based on severity

### Penetration Testing
- Simulates real-world attacks to exploit vulnerabilities
- Tests defense mechanisms and security controls
- Identifies complex vulnerabilities that automated tools might miss
- Provides context-specific risk assessment

### Security Code Review
- Examines source code for security flaws
- Identifies insecure coding practices
- Detects vulnerabilities early in the development cycle
- Verifies compliance with secure coding standards

### Security Configuration Assessment
- Evaluates system and application configurations
- Identifies misconfigurations and insecure defaults
- Verifies compliance with security baselines
- Assesses access controls and permissions

### Security Compliance Testing
- Verifies adherence to security standards and regulations
- Tests compliance with industry-specific requirements (PCI DSS, HIPAA, etc.)
- Identifies gaps in security controls
- Prepares for security audits and certifications

### Security API Testing
- Tests API security mechanisms
- Verifies authentication and authorization
- Checks for API-specific vulnerabilities
- Tests rate limiting and other API protections

## Common Security Vulnerabilities

### OWASP Top 10 Web Application Vulnerabilities
1. **Injection**: SQL, NoSQL, OS, LDAP injection flaws
2. **Broken Authentication**: Implementation flaws in authentication mechanisms
3. **Sensitive Data Exposure**: Inadequate protection of sensitive data
4. **XML External Entities (XXE)**: Processing of untrusted XML input
5. **Broken Access Control**: Improper enforcement of restrictions
6. **Security Misconfiguration**: Insecure default configurations, error messages, etc.
7. **Cross-Site Scripting (XSS)**: Injection of client-side scripts
8. **Insecure Deserialization**: Untrusted data deserialization
9. **Using Components with Known Vulnerabilities**: Outdated or vulnerable components
10. **Insufficient Logging & Monitoring**: Lack of adequate logging and monitoring

### API Security Vulnerabilities
1. **Broken Object Level Authorization**: Improper access control to API objects
2. **Broken User Authentication**: Flawed authentication mechanisms
3. **Excessive Data Exposure**: Returning excessive data in API responses
4. **Lack of Resources & Rate Limiting**: Missing protection against abuse
5. **Broken Function Level Authorization**: Improper function-level access control
6. **Mass Assignment**: Allowing modification of unexpected properties
7. **Security Misconfiguration**: Insecure default settings or incomplete configurations
8. **Injection**: Various injection flaws in API endpoints
9. **Improper Assets Management**: Outdated or unpatched API documentation and deployments
10. **Insufficient Logging & Monitoring**: Inadequate logging of API activities

## Security Testing Tools

### Vulnerability Scanners
- OWASP ZAP
- Burp Suite
- Nessus
- Acunetix
- Qualys
- Nikto
- OpenVAS

### Static Application Security Testing (SAST)
- SonarQube
- Checkmarx
- Fortify
- Veracode
- Snyk
- ESLint Security Plugin
- Brakeman (Ruby)

### Dynamic Application Security Testing (DAST)
- OWASP ZAP
- Burp Suite Professional
- Arachni
- AppScan
- WebInspect
- Acunetix

### Interactive Application Security Testing (IAST)
- Contrast Security
- Seeker
- InsightAppSec
- AppScan on Cloud

### API Security Testing
- Postman
- SoapUI
- OWASP ZAP API Scan
- Burp Suite
- API Fortress
- 42Crunch

### Security Compliance Testing
- OpenSCAP
- Compliance Sheriff
- Qualys Policy Compliance
- Chef InSpec
- Tenable.io

## Security Testing Process

### 1. Planning
- Define security testing scope and objectives
- Identify security requirements and compliance standards
- Determine testing methodologies and approaches
- Select appropriate security testing tools
- Establish security testing schedule
- Define roles and responsibilities

### 2. Reconnaissance
- Gather information about the target system
- Identify entry points and attack surfaces
- Map application architecture and dependencies
- Discover technologies and components in use
- Identify potential security weaknesses

### 3. Vulnerability Assessment
- Perform automated vulnerability scans
- Identify known vulnerabilities in the system
- Analyze scan results and remove false positives
- Prioritize vulnerabilities based on risk
- Document findings and recommendations

### 4. Penetration Testing
- Attempt to exploit identified vulnerabilities
- Test authentication and authorization mechanisms
- Perform injection attacks (SQL, XSS, CSRF, etc.)
- Test business logic vulnerabilities
- Document successful exploits and impact

### 5. Security Code Review
- Review source code for security vulnerabilities
- Identify insecure coding practices
- Verify input validation and output encoding
- Check for hardcoded credentials and secrets
- Assess error handling and logging

### 6. Reporting
- Document all identified vulnerabilities
- Classify vulnerabilities by severity and risk
- Provide clear reproduction steps
- Recommend remediation actions
- Create executive summary for stakeholders

### 7. Remediation Verification
- Verify that vulnerabilities have been fixed
- Retest previously identified issues
- Ensure fixes don't introduce new vulnerabilities
- Document remediation status
- Update security testing documentation

## Security Testing Examples

### SQL Injection Testing
```python
# Example of testing for SQL injection vulnerabilities

# 1. Identify input points that might be vulnerable
vulnerable_endpoints = [
    {'url': '/api/users', 'params': {'id': '1'}},
    {'url': '/api/products', 'params': {'search': 'test'}}
]

# 2. Prepare SQL injection payloads
sql_injection_payloads = [
    "1' OR '1'='1",
    "1; DROP TABLE users--",
    "1' UNION SELECT username, password FROM users--",
    "1' OR 1=1--",
    "'; EXEC xp_cmdshell('dir')--"
]

# 3. Test each endpoint with each payload
for endpoint in vulnerable_endpoints:
    url = endpoint['url']
    for param_name, param_value in endpoint['params'].items():
        for payload in sql_injection_payloads:
            # Create a copy of the original parameters
            test_params = endpoint['params'].copy()
            # Replace the parameter value with the payload
            test_params[param_name] = payload

            # Send the request with the payload
            response = send_request(url, test_params)

            # Analyze the response for signs of SQL injection
            if is_sql_injection_successful(response):
                report_vulnerability({
                    'type': 'SQL Injection',
                    'url': url,
                    'parameter': param_name,
                    'payload': payload,
                    'response': response,
                    'severity': 'High'
                })
```

### Cross-Site Scripting (XSS) Testing
```javascript
// Example of testing for XSS vulnerabilities

// 1. Identify input points that might be vulnerable
const vulnerableEndpoints = [
  { url: '/search', params: { q: 'test' } },
  { url: '/profile', params: { name: 'John' } }
];

// 2. Prepare XSS payloads
const xssPayloads = [
  "<script>alert('XSS')</script>",
  "<img src='x' onerror='alert(\"XSS\")'>",
  "<svg onload='alert(\"XSS\")'>",
  "javascript:alert('XSS')",
  "<iframe src='javascript:alert(`XSS`)'>",
  "'-alert('XSS')-'"
];

// 3. Test each endpoint with each payload
async function testXssVulnerabilities() {
  for (const endpoint of vulnerableEndpoints) {
    const { url, params } = endpoint;

    for (const [paramName, paramValue] of Object.entries(params)) {
      for (const payload of xssPayloads) {
        // Create a copy of the original parameters
        const testParams = { ...params };
        // Replace the parameter value with the payload
        testParams[paramName] = payload;

        // Send the request with the payload
        const response = await sendRequest(url, testParams);

        // Check if the payload is reflected in the response
        if (response.body.includes(payload)) {
          reportVulnerability({
            type: 'Cross-Site Scripting (XSS)',
            url,
            parameter: paramName,
            payload,
            severity: 'High'
          });
        }
      }
    }
  }
}
```

## Security Testing Best Practices

1. **Shift Left Security**: Integrate security testing early in the development lifecycle

2. **Automate When Possible**: Implement automated security testing in CI/CD pipelines

3. **Combine Testing Approaches**: Use both automated and manual testing techniques

4. **Test in Production-Like Environments**: Ensure test environments match production

5. **Maintain Test Data Security**: Protect sensitive test data used in security testing

6. **Stay Updated**: Keep security testing tools and knowledge current

7. **Prioritize Remediation**: Focus on high-risk vulnerabilities first

8. **Document Everything**: Maintain detailed records of security testing activities

9. **Perform Regular Testing**: Schedule recurring security tests, not just one-time assessments

10. **Validate Fixes**: Verify that security vulnerabilities are properly remediated

## Security Testing Metrics

1. **Vulnerability Metrics**
   - Number of vulnerabilities by severity
   - Mean time to detect vulnerabilities
   - Vulnerability density (vulnerabilities per KLOC)
   - Percentage of vulnerabilities remediated

2. **Process Metrics**
   - Security testing coverage
   - Mean time to remediate vulnerabilities
   - Security debt (backlog of security issues)
   - Security testing frequency

3. **Compliance Metrics**
   - Compliance with security standards
   - Security control coverage
   - Policy violations
   - Audit findings

4. **Risk Metrics**
   - Risk exposure score
   - Risk reduction over time
   - Security posture improvement
   - Security incident frequency
