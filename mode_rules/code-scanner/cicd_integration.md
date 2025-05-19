# Code Scanner CI/CD Integration Guide

## Integration Principles

### 1. Shift-Left Security
- Integrate scanning as early as possible in the development lifecycle
- Run lightweight scans on every commit
- Run comprehensive scans at key milestones
- Provide immediate feedback to developers
- Block critical issues from progressing through the pipeline
- Educate developers about identified issues
- Encourage security ownership among developers
- Measure and improve time-to-fix metrics

### 2. Progressive Scanning Strategy
- **Pre-commit Hooks**: Lightweight linting and formatting
- **Pull Request Scans**: Focused SAST and SCA on changed files
- **Branch Merges**: Comprehensive SAST and SCA on affected components
- **Nightly Builds**: Full codebase scans with all tools
- **Release Candidates**: Complete security testing suite including DAST
- **Production Deployment**: Final verification of all security gates
- **Post-Deployment**: Continuous monitoring and verification
- **Scheduled Audits**: Periodic comprehensive security reviews

### 3. Balanced Feedback Loops
- Configure appropriate failure thresholds for each pipeline stage
- Distinguish between blocking and non-blocking issues
- Provide clear, actionable feedback for developers
- Implement grace periods for newly introduced rules
- Track technical debt separately from critical issues
- Establish escalation paths for disputed findings
- Measure and optimize feedback timing
- Balance security requirements with development velocity

## CI/CD Platform Integration

### GitHub Actions

#### Basic SAST Integration
```yaml
name: Code Scanning

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 0 * * 0'  # Weekly scan

jobs:
  analyze:
    name: Analyze
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Initialize CodeQL
      uses: github/codeql-action/init@v2
      with:
        languages: javascript, python

    - name: Perform CodeQL Analysis
      uses: github/codeql-action/analyze@v2
```

#### Dependency Scanning
```yaml
name: Dependency Scanning

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 0 * * 0'  # Weekly scan

jobs:
  dependency-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run OWASP Dependency-Check
        uses: dependency-check/Dependency-Check_Action@main
        with:
          project: 'My Project'
          path: '.'
          format: 'HTML'
          out: 'reports'
      - name: Upload report
        uses: actions/upload-artifact@v3
        with:
          name: dependency-check-report
          path: reports
```

### GitLab CI/CD

#### Multi-Stage Scanning Pipeline
```yaml
stages:
  - build
  - test
  - scan
  - deploy

variables:
  SONAR_USER_HOME: "${CI_PROJECT_DIR}/.sonar"
  GIT_DEPTH: "0"

build:
  stage: build
  script:
    - echo "Building the app"
    # Build commands here

test:
  stage: test
  script:
    - echo "Running tests"
    # Test commands here

sast:
  stage: scan
  image: docker:stable
  variables:
    DOCKER_DRIVER: overlay2
  allow_failure: true
  script:
    - echo "Running SAST scan"
  artifacts:
    reports:
      sast: gl-sast-report.json

dependency_scanning:
  stage: scan
  image: docker:stable
  variables:
    DOCKER_DRIVER: overlay2
  allow_failure: true
  script:
    - echo "Running dependency scan"
  artifacts:
    reports:
      dependency_scanning: gl-dependency-scanning-report.json

sonarqube-check:
  stage: scan
  image: 
    name: sonarsource/sonar-scanner-cli:latest
    entrypoint: [""]
  cache:
    key: "${CI_JOB_NAME}"
    paths:
      - .sonar/cache
  script:
    - sonar-scanner -Dsonar.qualitygate.wait=true
  allow_failure: true

deploy:
  stage: deploy
  script:
    - echo "Deploying application"
  environment: production
  only:
    - main
```

### Azure DevOps

#### Security Scan Task
```yaml
trigger:
- main

pool:
  vmImage: 'ubuntu-latest'

steps:
- task: SonarCloudPrepare@1
  inputs:
    SonarCloud: 'SonarCloud'
    organization: 'your-organization'
    scannerMode: 'CLI'
    configMode: 'AUTO'
    cliProjectKey: 'your-project-key'
    cliProjectName: 'Your Project Name'

- script: |
    echo "Building and testing the application"
    # Build and test commands
  displayName: 'Build and test'

- task: SonarCloudAnalyze@1
  displayName: 'Run SonarCloud analysis'

- task: SonarCloudPublish@1
  inputs:
    pollingTimeoutSec: '300'
  displayName: 'Publish SonarCloud results'

- task: WhiteSource@21
  inputs:
    cwd: '$(System.DefaultWorkingDirectory)'
    projectName: '$(Build.Repository.Name)'
  displayName: 'Run WhiteSource Bolt'
```

### Jenkins

#### Declarative Pipeline with Security Scans
```groovy
pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building the application'
                // Build commands
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests'
                // Test commands
            }
        }
        
        stage('SAST') {
            steps {
                echo 'Running static analysis'
                withSonarQubeEnv('SonarQube') {
                    sh 'sonar-scanner'
                }
            }
        }
        
        stage('Dependency Check') {
            steps {
                echo 'Checking dependencies'
                dependencyCheck additionalArguments: '--format HTML --format XML', odcInstallation: 'OWASP-DC'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }
        
        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying the application'
                // Deploy commands
            }
        }
    }
    
    post {
        always {
            archiveArtifacts artifacts: '**/dependency-check-report.html', allowEmptyArchive: true
            junit '**/test-results/*.xml'
        }
    }
}
```

## Integration Best Practices

### 1. Failure Thresholds
- Configure appropriate quality gates for different pipeline stages
- Block critical security issues from proceeding to production
- Allow non-critical issues to proceed with appropriate tracking
- Implement graduated thresholds based on project maturity
- Consider different thresholds for different types of changes
- Document threshold decisions and review regularly
- Implement override mechanisms for exceptional cases
- Track threshold violations and trends

### 2. Performance Optimization
- Use incremental analysis for faster feedback
- Parallelize independent scanning tools
- Cache scanning results where appropriate
- Optimize scan scope based on changed files
- Schedule resource-intensive scans during off-hours
- Use distributed scanning for large codebases
- Implement timeout mechanisms for scans
- Monitor and optimize scan performance regularly

### 3. Developer Experience
- Provide clear, actionable feedback in familiar tools
- Integrate results into IDE and code review tools
- Include remediation guidance with findings
- Minimize false positives to maintain trust
- Implement easy suppression mechanisms with justification
- Provide self-service tools for pre-commit scanning
- Offer security champions program for support
- Collect and act on developer feedback about the scanning process

### 4. Metrics and Monitoring
- Track scan results over time
- Measure mean time to remediation
- Monitor false positive rates
- Track scan performance and resource usage
- Measure security debt and remediation progress
- Report on compliance with security standards
- Visualize security posture improvements
- Correlate scanning metrics with other quality indicators

### 5. Continuous Improvement
- Regularly update scanning tools and rule sets
- Refine configuration based on feedback and results
- Automate rule tuning based on false positive patterns
- Implement A/B testing for rule changes
- Conduct periodic reviews of scanning effectiveness
- Incorporate lessons learned from security incidents
- Benchmark against industry standards
- Participate in security tool communities
