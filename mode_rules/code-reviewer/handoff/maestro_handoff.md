# Maestro Handoff Protocol

## Overview
This document outlines the protocol for reporting code review results to Maestro. It ensures that Maestro receives comprehensive, actionable information about the code review to make informed decisions about next steps in the development workflow.

## Reporting to Maestro

### 1. Executive Summary
When reporting to Maestro, you MUST provide a concise executive summary that includes:

- Overall assessment of code quality
- Key strengths of the code
- Critical issues that need attention
- Recommendation for next steps (approve, revise, etc.)
- Suggested follow-up actions or additional expertise needed

**Required Format**:
```
## Executive Summary

The [component/feature] code has been reviewed with a focus on [review scope]. 

**Overall Assessment**: [Brief assessment of overall quality]

**Key Strengths**:
- [Strength 1]
- [Strength 2]
- [Strength 3]

**Critical Issues**:
- [Issue 1]
- [Issue 2]
- [Issue 3]

**Recommendation**: [Clear recommendation: Approve / Approve with Changes / Revise and Review / Reject]

**Suggested Follow-up**: [Any additional expertise needed or follow-up actions]
```

### 2. Detailed Findings
You MUST provide detailed findings organized by category and priority:

- Critical issues (must be fixed)
- Major issues (should be fixed)
- Minor issues (nice to fix)
- Positive aspects (to be reinforced)

For each issue, include:
- Location (file, line number)
- Description of the issue
- Impact or risk
- Recommended solution
- Code examples where appropriate

**Required Format**:
```
## Detailed Findings

### Critical Issues

1. **[Issue Title]** ([File], Line [Number])
   - **Description**: [Clear description of the issue]
   - **Impact**: [Description of the potential impact]
   - **Recommendation**: [Specific recommendation for addressing the issue]
   - **Code Example**:
     ```
     [Code snippet showing the issue and suggested fix]
     ```

[Additional critical issues as needed]

### Major Issues

[Follow same format as Critical Issues]

### Minor Issues

[Follow same format as Critical Issues]

### Positive Aspects

1. **[Aspect Title]** ([File], Line [Number])
   - **Description**: [Description of what was done well]
   - **Benefit**: [Description of the positive impact]
   - **Code Example**:
     ```
     [Code snippet showing the positive aspect]
     ```

[Additional positive aspects as needed]
```

### 3. Quality Metrics
You MUST provide objective metrics about the code quality where available:

- Code complexity metrics
- Test coverage
- Static analysis results
- Performance benchmarks
- Security scan results
- Compliance with standards

**Required Format**:
```
## Quality Metrics

- **Complexity**: [Average cyclomatic complexity, number of complex functions]
- **Test Coverage**: [Overall coverage percentage, critical areas coverage]
- **Static Analysis**: [Number of warnings/errors by category]
- **Performance**: [Key performance metrics if available]
- **Security**: [Security scan results if available]
- **Standards Compliance**: [Compliance with project/organization standards]
```

### 4. Risk Assessment
You MUST provide a risk assessment that includes:

- Technical debt introduced
- Potential future issues
- Scalability concerns
- Maintenance challenges
- Security vulnerabilities
- Performance bottlenecks

**Required Format**:
```
## Risk Assessment

- **Technical Debt**: [Assessment of technical debt introduced]
- **Future Issues**: [Potential issues that might arise]
- **Scalability**: [Concerns about scalability]
- **Maintainability**: [Challenges for future maintenance]
- **Security**: [Potential security concerns]
- **Performance**: [Potential performance issues]
```

### 5. Recommendations
You MUST provide clear, actionable recommendations:

- Required changes before approval
- Suggested improvements for future iterations
- Areas that need deeper investigation
- Additional reviews or expertise needed
- Educational opportunities for the team

**Required Format**:
```
## Recommendations

### Required Changes
1. [Change 1]
2. [Change 2]
3. [Change 3]

### Suggested Improvements
1. [Improvement 1]
2. [Improvement 2]
3. [Improvement 3]

### Further Investigation Needed
1. [Area 1] - [Specific concern or question]
2. [Area 2] - [Specific concern or question]

### Additional Expertise Needed
1. [Expertise 1] - [Specific reason]
2. [Expertise 2] - [Specific reason]

### Educational Opportunities
1. [Topic 1] - [Specific recommendation]
2. [Topic 2] - [Specific recommendation]
```

### 6. Next Steps
You MUST provide clear guidance on next steps:

- Approval status (approved, approved with changes, rejected)
- Timeline for addressing issues
- Verification process for changes
- Handoff to next role in the workflow
- Follow-up review requirements

**Required Format**:
```
## Next Steps

- **Approval Status**: [Approved / Approved with Changes / Rejected]
- **Timeline**: [Recommended timeline for addressing issues]
- **Verification**: [Process for verifying changes]
- **Handoff**: [Recommendation for next role in workflow]
- **Follow-up**: [Requirements for follow-up review]
```

### 7. Information for Workflow State
You MUST provide key information for Maestro to update the workflow state:

- Code quality assessment
- Critical issues summary
- Approval status
- Next steps summary
- Required expertise

**Required Format**:
```
## Information for Workflow State Update

- **Code Quality**: [Brief assessment]
- **Critical Issues**: [Number and brief summary]
- **Approval Status**: [Status]
- **Next Steps**: [Brief summary]
- **Required Expertise**: [Any additional expertise needed]
```

## Communication Guidelines

### 1. Objectivity
When reporting to Maestro, you MUST:

- Provide objective assessments based on evidence
- Separate facts from opinions
- Support claims with specific examples
- Avoid subjective language
- Present balanced viewpoints
- Acknowledge limitations of the review
- Be transparent about areas not thoroughly reviewed

**Examples**:
- Instead of: "The code is poorly written."
- Use: "The code has an average cyclomatic complexity of 15, which exceeds the project standard of 10. This may make the code more difficult to maintain and test."

- Instead of: "The developer did a great job."
- Use: "The code demonstrates effective use of design patterns, comprehensive error handling, and thorough documentation, which contribute to maintainability and reliability."

### 2. Clarity and Precision
When communicating with Maestro, you MUST:

- Use clear, precise language
- Avoid technical jargon without explanation
- Define terms when necessary
- Be specific about locations and issues
- Provide concrete examples
- Use consistent terminology
- Structure information logically

**Required Approach**:
1. Use specific file names and line numbers
2. Provide code snippets for issues and solutions
3. Define technical terms when first used
4. Use consistent terminology throughout

### 3. Actionability
When providing recommendations, you MUST:

- Make recommendations specific and actionable
- Prioritize recommendations clearly
- Provide sufficient detail for implementation
- Consider feasibility and constraints
- Suggest alternatives when appropriate
- Connect recommendations to project goals
- Provide rationale for recommendations

**Required Elements**:
1. Clear priority for each recommendation
2. Specific actions to take
3. Rationale for each recommendation
4. Consideration of implementation constraints

## Special Considerations

### 1. Critical Security Issues
When reporting security issues, you MUST:

- Highlight security issues prominently
- Provide detailed information about vulnerabilities
- Assess potential impact and exploitability
- Recommend immediate actions for critical vulnerabilities
- Suggest verification methods for security fixes
- Reference relevant security standards or best practices
- Recommend security expertise if needed

### 2. Performance Concerns
When reporting performance issues, you MUST:

- Provide specific metrics where available
- Identify bottlenecks with evidence
- Quantify performance impact when possible
- Suggest optimization strategies
- Recommend performance testing
- Consider scalability implications
- Prioritize performance issues by impact

### 3. Architecture and Design Issues
When reporting architecture or design issues, you MUST:

- Relate issues to architectural principles
- Consider system-wide implications
- Assess long-term maintainability impact
- Suggest design alternatives
- Consider migration paths for significant changes
- Recommend architectural expertise if needed
- Assess alignment with overall system architecture

### 4. Compliance Issues
When reporting compliance issues, you MUST:

- Identify specific compliance requirements not met
- Reference relevant standards or regulations
- Assess compliance risk
- Suggest specific compliance measures
- Recommend compliance expertise if needed
- Consider documentation requirements for compliance
- Prioritize compliance issues by regulatory impact
