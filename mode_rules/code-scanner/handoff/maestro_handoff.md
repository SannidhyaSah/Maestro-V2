# Code Scanner Handoff Protocol for Maestro

## Receiving Requirements from Maestro

### Required Information
When receiving a code scanning task from Maestro, the following information MUST be provided:

1. **Codebase Information**:
   - Repository location/URL
   - Branch or commit to scan
   - Primary programming languages
   - Framework(s) in use
   - Project structure overview

2. **Scanning Objectives**:
   - Primary focus (security, quality, compliance)
   - Specific concerns or areas of interest
   - Required standards or compliance frameworks
   - Previous scanning history (if available)

3. **Project Context**:
   - Project maturity (new, established, legacy)
   - Deployment environment (production, staging, development)
   - Security sensitivity (public-facing, internal, handling sensitive data)
   - User base and access patterns

4. **Operational Requirements**:
   - Urgency and timeline
   - Integration requirements (CI/CD, issue tracking)
   - Reporting format and audience
   - Remediation expectations

### Clarification Questions
If any required information is missing, the Code Scanner MUST ask the following clarification questions:

1. **For Codebase Understanding**:
   - "What are the primary programming languages and frameworks used in this project?"
   - "Are there any specific architectural patterns or components I should be aware of?"
   - "Are there areas of the codebase that should be excluded from scanning?"
   - "Are there any known issues or technical debt I should be aware of?"

2. **For Scanning Focus**:
   - "What is the primary objective of this scan (security vulnerabilities, code quality, compliance)?"
   - "Are there specific types of issues you're particularly concerned about?"
   - "Are there compliance requirements or standards this code needs to meet?"
   - "What level of detail do you need in the results?"

3. **For Context**:
   - "What is the deployment environment for this code?"
   - "Does this code handle sensitive data or critical functionality?"
   - "What is the user base and access model for this application?"
   - "What is the project's current phase and maturity level?"

4. **For Operational Needs**:
   - "What is the timeline for completing this scan?"
   - "How should scan results be integrated with your workflow?"
   - "Who are the primary stakeholders for the scan results?"
   - "What are your expectations for remediation support?"

## Delivering Results to Maestro

### Required Components
When delivering code scanning results to Maestro, the following components MUST be included:

1. **Executive Summary**:
   - Overall risk assessment
   - Key findings by category
   - Compliance status (if applicable)
   - Trend analysis (if previous scans exist)
   - Recommended next steps

2. **Detailed Findings**:
   - Prioritized list of issues
   - Severity and impact assessment
   - Evidence and reproduction steps
   - Root cause analysis
   - Remediation recommendations
   - False positive analysis

3. **Metrics and Visualizations**:
   - Issue counts by severity and category
   - Code quality metrics
   - Scan coverage information
   - Trend visualizations (if applicable)
   - Risk heat maps or matrices

4. **Tool Information**:
   - Tools used and versions
   - Configuration details
   - Rule sets applied
   - Scan limitations or caveats
   - Raw tool outputs (as attachments)

5. **Remediation Guidance**:
   - Prioritized remediation plan
   - Specific fix recommendations
   - Educational resources
   - Verification procedures
   - Recommended follow-up scans

### Follow-up Questions
After delivering results, the Code Scanner SHOULD ask the following follow-up questions:

1. **For Result Clarification**:
   - "Would you like me to explain any specific findings in more detail?"
   - "Are there particular issues you'd like more context or remediation guidance for?"
   - "Do any of the findings require additional verification or investigation?"
   - "Are there findings you believe might be false positives?"

2. **For Next Steps**:
   - "Would you like assistance with implementing any of the recommended fixes?"
   - "Would you like me to help prioritize the remediation efforts?"
   - "Would you like guidance on integrating these scanning tools into your CI/CD pipeline?"
   - "Would you like to schedule a follow-up scan after remediation?"

3. **For Improvement**:
   - "Was the level of detail in the report appropriate for your needs?"
   - "Were the visualizations and metrics helpful for understanding the results?"
   - "Would you prefer different tools or configurations for future scans?"
   - "Are there additional types of analysis you'd like to include in future scans?"

## Handoff to Other Modes

### To Security Specialist
When handing off security-related findings to the Security Specialist mode:

1. **Required Information**:
   - Detailed security vulnerability findings
   - Exploitation potential assessment
   - Attack vectors and scenarios
   - Security tool configurations
   - Raw security scan results

2. **Recommended Format**:
   ```
   ## Security Findings Handoff

   ### Critical Security Issues
   - [List of critical findings with details]

   ### High-Priority Security Issues
   - [List of high-priority findings with details]

   ### Security Tool Configuration
   - [Details of security tools and configurations used]

   ### Recommended Security Assessment
   - [Recommendations for further security testing]
   ```

### To Code Reviewer
When handing off code quality findings to the Code Reviewer mode:

1. **Required Information**:
   - Code quality issues by category
   - Complexity and maintainability metrics
   - Duplication and technical debt assessment
   - Style and best practice violations
   - Code quality tool configurations

2. **Recommended Format**:
   ```
   ## Code Quality Findings Handoff

   ### Critical Quality Issues
   - [List of critical quality issues with details]

   ### Technical Debt Assessment
   - [Assessment of technical debt with metrics]

   ### Code Quality Metrics
   - [Detailed code quality metrics by component]

   ### Recommended Manual Review Areas
   - [Areas that would benefit from manual code review]
   ```

### To DevOps Engineer
When handing off CI/CD integration information to the DevOps Engineer mode:

1. **Required Information**:
   - Tool integration configurations
   - Pipeline stage recommendations
   - Failure threshold configurations
   - Resource requirements
   - Scan performance metrics

2. **Recommended Format**:
   ```
   ## CI/CD Integration Handoff

   ### Recommended Scanning Tools
   - [List of tools with integration details]

   ### Pipeline Configuration
   - [Recommended pipeline configurations with examples]

   ### Quality Gates
   - [Recommended quality gate thresholds]

   ### Resource Requirements
   - [Scanning resource requirements and optimization tips]
   ```
