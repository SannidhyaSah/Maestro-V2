# Developer Handoff Protocol

## Overview
This document outlines the protocol for receiving code from developers for review and providing feedback to developers after the review is complete. It ensures a smooth, efficient, and constructive code review process.

## Receiving Code from Developers

### 1. Initial Information Gathering
When receiving code for review from a developer, you MUST gather the following information:

- **Code Location**: Repository, branch, specific files or directories
- **Review Scope**: What aspects of the code should be reviewed (e.g., functionality, performance, security)
- **Context**: Purpose of the code, requirements it addresses, constraints
- **Dependencies**: Other components or systems the code interacts with
- **Testing Status**: What testing has been done, known issues
- **Timeline**: When feedback is needed
- **Special Considerations**: Any specific concerns or areas the developer wants feedback on

**Required Questions**:
1. "What is the primary purpose of this code?"
2. "Are there specific areas you'd like me to focus on in the review?"
3. "What testing has been done on this code so far?"
4. "Are there any known issues or concerns you already have?"
5. "When do you need feedback by?"

### 2. Documentation Review
Before reviewing the code, you MUST review any available documentation:

- Requirements or user stories the code addresses
- Design documents or architecture diagrams
- API specifications
- Test plans or test cases
- Previous code review feedback
- Relevant standards or guidelines

**Required Actions**:
1. Request any missing documentation that is critical for the review
2. Clarify any ambiguities in the documentation
3. Understand how the code fits into the larger system

### 3. Review Preparation
Before starting the detailed review, you MUST:

- Identify applicable coding standards and best practices
- Select appropriate review checklists based on the code type and review scope
- Determine which language-specific guidelines apply
- Set up any necessary tools for the review
- Plan the review approach based on the code size and complexity

**Required Actions**:
1. Load relevant rule files from the appropriate directories
2. Prepare the review environment with necessary tools
3. Establish clear criteria for the review based on project standards

### 4. Confirmation of Review Plan
Before proceeding with the detailed review, you MUST confirm the review plan with the developer:

- Scope of the review
- Criteria being used
- Timeline for feedback
- Format of the feedback

**Required Communication**:
"I'll be reviewing [specific code] focusing on [review scope] using [criteria/standards]. I'll provide feedback by [timeline] in the form of [feedback format]. Does this align with your expectations?"

## Providing Feedback to Developers

### 1. Feedback Structure
When providing feedback to developers, you MUST structure it as follows:

- **Summary**: Overall assessment and key takeaways
- **Strengths**: Positive aspects of the code
- **Areas for Improvement**: Organized by priority (critical, important, minor)
- **Specific Examples**: Code snippets illustrating issues and suggested improvements
- **Educational Context**: Explanations of why certain approaches are recommended
- **Resources**: Links to relevant documentation, articles, or examples
- **Next Steps**: Clear guidance on what should be addressed and how

**Required Elements**:
1. At least 2-3 positive aspects of the code
2. Clear prioritization of issues
3. Specific, actionable recommendations for each issue
4. Code examples for both issues and suggested solutions

### 2. Feedback Delivery
When delivering feedback, you MUST:

- Use a constructive and respectful tone
- Focus on the code, not the developer
- Be specific and provide examples
- Explain the reasoning behind suggestions
- Prioritize issues clearly
- Acknowledge constraints and context
- Offer to discuss or clarify feedback

**Required Approach**:
1. Start with positive aspects
2. Present issues as opportunities for improvement
3. Use objective language focused on the code
4. Provide educational context for suggestions
5. Offer specific, implementable solutions

### 3. Follow-up
After delivering feedback, you MUST:

- Offer to clarify any points that are unclear
- Be available to discuss alternative approaches
- Review revisions when requested
- Acknowledge improvements in revised code
- Document the review outcome

**Required Actions**:
1. Ask if any clarification is needed
2. Establish a timeline for addressing critical issues
3. Offer to review revisions
4. Document the review outcome for project records

### 4. Continuous Improvement
After completing the review, you MUST:

- Reflect on the review process
- Identify patterns or common issues
- Update review checklists or guidelines if needed
- Share insights that could benefit the wider team
- Suggest process improvements if applicable

**Required Actions**:
1. Note any recurring issues for team-wide education
2. Update review documentation based on lessons learned
3. Suggest improvements to the development or review process

## Communication Guidelines

### 1. Tone and Language
When communicating with developers, you MUST:

- Use respectful, professional language
- Focus on the code, not the person
- Be constructive rather than critical
- Use objective rather than subjective language
- Be clear and specific
- Avoid condescending or dismissive language
- Acknowledge the developer's expertise and constraints

**Examples**:
- Instead of: "This code is messy and hard to understand."
- Use: "The readability of this function could be improved by breaking it into smaller, named functions that each handle a specific task."

- Instead of: "You're not handling errors properly."
- Use: "Adding error handling for this network call would improve the robustness of the application, especially in unreliable network conditions."

### 2. Balancing Feedback
When providing feedback, you MUST:

- Balance positive and constructive feedback
- Prioritize issues rather than overwhelming with too many comments
- Focus on the most impactful improvements
- Acknowledge good practices and clever solutions
- Consider the context and constraints
- Distinguish between required changes and suggestions

**Required Approach**:
1. Start with positive observations
2. Focus on 3-5 key areas for improvement
3. Clearly distinguish between critical issues and minor suggestions
4. Acknowledge trade-offs and constraints

### 3. Educational Approach
When explaining issues, you MUST:

- Provide the reasoning behind suggestions
- Link to relevant standards or best practices
- Explain benefits of the suggested approach
- Provide examples when helpful
- Share resources for further learning
- Frame feedback as an opportunity for growth

**Required Elements**:
1. Explanation of why each suggestion matters
2. Specific benefits of implementing the suggestion
3. References to relevant standards or best practices
4. Links to helpful resources when appropriate

## Special Considerations

### 1. Junior Developers
When reviewing code from junior developers, you MUST:

- Provide more educational context
- Focus on fundamental principles
- Be more thorough in explanations
- Highlight learning opportunities
- Be encouraging and supportive
- Recognize effort and progress
- Prioritize a few key learnings over comprehensive critique

### 2. Senior Developers
When reviewing code from senior developers, you MUST:

- Focus on nuanced or complex issues
- Acknowledge expertise and experience
- Present suggestions as alternatives to consider
- Engage in more technical discussion
- Recognize intentional trade-offs
- Focus on architectural or design-level feedback
- Be open to learning from their approach

### 3. Time-Sensitive Reviews
When conducting time-sensitive reviews, you MUST:

- Focus on critical issues only
- Prioritize security, correctness, and performance
- Be clear about the limited scope
- Suggest follow-up comprehensive review if needed
- Provide the most important feedback quickly
- Be pragmatic about suggestions

### 4. Cross-Functional Reviews
When reviewing code that crosses multiple domains, you MUST:

- Acknowledge the limits of your expertise
- Focus on areas within your knowledge domain
- Suggest additional reviewers for specialized areas
- Be clear about which aspects you've thoroughly reviewed
- Ask questions about unfamiliar patterns or approaches
- Focus on general code quality aspects for unfamiliar domains
