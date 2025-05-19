# Code Scanner Tool Selection Guide

## Tool Categories

### 1. Static Application Security Testing (SAST) Tools
- **Purpose**: Analyze source code for security vulnerabilities without executing the program
- **When to Use**: Early in development cycle, integrated into CI/CD pipelines
- **Key Considerations**: Language support, rule configurability, integration capabilities
- **Popular Tools**:
  - **SonarQube**: Comprehensive platform for code quality and security
  - **Checkmarx**: Enterprise-grade static analysis
  - **Fortify**: HP's static code analyzer
  - **CodeQL**: GitHub's semantic code analysis engine
  - **Semgrep**: Lightweight, fast pattern-based scanner
  - **ESLint/TSLint**: JavaScript/TypeScript linters with security rules
  - **Bandit**: Python-specific security linter
  - **SpotBugs/FindSecBugs**: Java bytecode analysis
  - **Brakeman**: Ruby on Rails security scanner
  - **PHPStan/PHPMD**: PHP static analyzers

### 2. Software Composition Analysis (SCA) Tools
- **Purpose**: Analyze dependencies for known vulnerabilities and license issues
- **When to Use**: Throughout development, especially before releases
- **Key Considerations**: Package ecosystem coverage, vulnerability database freshness
- **Popular Tools**:
  - **OWASP Dependency-Check**: Open-source dependency scanner
  - **Snyk**: Dependency vulnerability scanner with remediation
  - **WhiteSource**: Enterprise SCA with license compliance
  - **Black Duck**: Comprehensive open source management
  - **Sonatype Nexus IQ**: Component intelligence platform
  - **FOSSA**: License compliance and vulnerability management
  - **npm audit**: Built-in Node.js dependency scanner
  - **Bundler-audit**: Ruby gem vulnerability scanner
  - **Safety**: Python dependency vulnerability scanner
  - **Retire.js**: JavaScript-specific vulnerability scanner

### 3. Code Quality Analysis Tools
- **Purpose**: Analyze code for maintainability, style, and best practices
- **When to Use**: Continuously during development
- **Key Considerations**: Language-specific rules, customizability, IDE integration
- **Popular Tools**:
  - **SonarQube**: Multi-language code quality platform
  - **ESLint**: JavaScript/TypeScript linter
  - **Pylint/Flake8**: Python linters
  - **RuboCop**: Ruby linter and formatter
  - **StyleCop/FxCop**: C# code quality tools
  - **PMD**: Multi-language source code analyzer
  - **Checkstyle**: Java style checker
  - **JSHint/JSLint**: JavaScript code quality tools
  - **PHP_CodeSniffer**: PHP coding standards checker
  - **Scalastyle**: Scala style checker

### 4. Dynamic Application Security Testing (DAST) Tools
- **Purpose**: Test running applications for vulnerabilities
- **When to Use**: Later in development cycle, on staging environments
- **Key Considerations**: Authentication support, scan depth, false positive rate
- **Popular Tools**:
  - **OWASP ZAP**: Open-source web app scanner
  - **Burp Suite**: Web vulnerability scanner
  - **Acunetix**: Automated web vulnerability scanner
  - **AppScan**: IBM's application security testing suite
  - **WebInspect**: Micro Focus web app security scanner
  - **Netsparker**: Web application security scanner
  - **Arachni**: Open-source web application security scanner
  - **Skipfish**: Active web application security reconnaissance tool
  - **w3af**: Web Application Attack and Audit Framework
  - **Nikto**: Web server scanner

### 5. Interactive Application Security Testing (IAST) Tools
- **Purpose**: Combine static and dynamic analysis during runtime
- **When to Use**: During testing phases
- **Key Considerations**: Language support, performance impact, integration with testing frameworks
- **Popular Tools**:
  - **Contrast Security**: Runtime application self-protection and vulnerability detection
  - **Checkmarx IAST**: Interactive application security testing
  - **Seeker**: Runtime code analysis
  - **Acunetix IAST**: Interactive application security testing
  - **AppScan**: IBM's IAST solution
  - **Hdiv**: Runtime application self-protection
  - **Veracode IAST**: Interactive application security testing
  - **Synopsys Seeker**: Runtime security analysis

## Tool Selection Matrix

### By Programming Language

#### Java
- **SAST**: SonarQube, SpotBugs, PMD, Checkstyle, Fortify
- **SCA**: OWASP Dependency-Check, Snyk, Sonatype Nexus IQ
- **Quality**: SonarQube, PMD, Checkstyle, JaCoCo (coverage)
- **IAST**: Contrast Security, Seeker

#### JavaScript/TypeScript
- **SAST**: ESLint, SonarQube, CodeQL, Semgrep
- **SCA**: npm audit, Snyk, Retire.js, OWASP Dependency-Check
- **Quality**: ESLint, SonarQube, JSHint, Prettier (formatting)
- **IAST**: Contrast Security

#### Python
- **SAST**: Bandit, Pylint, SonarQube, Semgrep
- **SCA**: Safety, Snyk, OWASP Dependency-Check
- **Quality**: Pylint, Flake8, Black (formatting), mypy (type checking)
- **IAST**: Contrast Security

#### C#/.NET
- **SAST**: SonarQube, Roslynator, CodeQL, Fortify
- **SCA**: OWASP Dependency-Check, Snyk, WhiteSource
- **Quality**: StyleCop, FxCop, SonarQube
- **IAST**: Contrast Security

#### Ruby
- **SAST**: Brakeman, RuboCop, CodeQL
- **SCA**: Bundler-audit, Snyk, OWASP Dependency-Check
- **Quality**: RuboCop, Reek, Flay (duplication)
- **IAST**: Contrast Security

#### PHP
- **SAST**: PHPMD, PHPStan, SonarQube, Semgrep
- **SCA**: Composer audit, OWASP Dependency-Check, Snyk
- **Quality**: PHP_CodeSniffer, PHPMD, PHPStan
- **IAST**: Contrast Security

### By Project Type

#### Web Applications
- **Essential**: OWASP ZAP (DAST), SonarQube (SAST), Dependency scanners (SCA)
- **Recommended**: Semgrep, language-specific linters, IAST tools
- **Advanced**: Burp Suite Pro, Checkmarx, Fortify

#### Mobile Applications
- **Essential**: MobSF (Mobile Security Framework), Dependency scanners
- **Recommended**: SonarQube, language-specific linters
- **Advanced**: Appknox, NowSecure

#### APIs
- **Essential**: API-focused DAST (OWASP ZAP), SonarQube, Dependency scanners
- **Recommended**: Postman security testing, API contract validators
- **Advanced**: 42Crunch, APIsec

#### Microservices
- **Essential**: SonarQube, Dependency scanners, Container scanners
- **Recommended**: Service-to-service security testing, API security
- **Advanced**: Cloud configuration scanners, IAST tools

#### Legacy Applications
- **Essential**: SonarQube with relaxed rules, Dependency scanners
- **Recommended**: Incremental scanning approaches, technical debt trackers
- **Advanced**: Custom rule sets, architectural analysis tools

## Tool Configuration Best Practices

### 1. Rule Selection and Customization
- Start with industry-standard rule sets (OWASP Top 10, CWE Top 25)
- Customize rules based on project context and risk profile
- Disable irrelevant rules to reduce noise
- Create custom rules for project-specific requirements
- Document rule customization decisions

### 2. Severity Thresholds
- Define clear severity levels (Critical, High, Medium, Low)
- Set appropriate thresholds for CI/CD pipeline failures
- Consider different thresholds for different environments
- Adjust thresholds based on project maturity
- Document severity definitions and thresholds

### 3. False Positive Management
- Implement systematic false positive tracking
- Use tool-specific exclusion mechanisms
- Document all exclusions with justification
- Regularly review exclusions for validity
- Consider code annotations for inline suppressions

### 4. Performance Optimization
- Configure incremental analysis where supported
- Use appropriate exclusion patterns for generated code
- Schedule comprehensive scans strategically
- Parallelize scanning when possible
- Optimize rule selection for scan time vs. coverage

### 5. Integration Configuration
- Configure appropriate tool outputs (JSON, XML, HTML)
- Set up integration with issue tracking systems
- Configure notifications for new findings
- Implement trend analysis and reporting
- Ensure secure handling of scan results
