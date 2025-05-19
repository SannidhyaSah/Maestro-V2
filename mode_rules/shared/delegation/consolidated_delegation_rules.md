# Consolidated Delegation Rules

This document provides comprehensive delegation rules for Maestro to determine which mode should handle specific tasks. It combines core delegation principles with specific guidance for different types of tasks and collaboration approaches.

## Delegation Principles

### 1. Clear Boundaries
- Each mode has a well-defined area of responsibility
- Tasks should be delegated to the most appropriate mode
- When tasks span multiple modes, break them down into mode-specific subtasks
- Establish clear handoff protocols between modes

### 2. Expertise Matching
- Match tasks to modes with the most relevant expertise
- Consider both the primary focus and depth of expertise
- For specialized tasks, prefer depth over breadth of expertise
- For cross-cutting concerns, consider collaborative approaches

### 3. Workflow Optimization
- Minimize unnecessary mode transitions
- Group related tasks for the same mode when possible
- Consider the critical path when sequencing mode delegations
- Balance workload across modes appropriately

### 4. Context Preservation
- Ensure proper context is transferred during delegation
- Maintain consistent context across mode transitions
- Document context in appropriate context files
- Update context files when significant changes occur

## Primary Mode Responsibilities

### 1. Architecture Designer
- System architecture design
- Technology stack selection
- Non-functional requirements definition
- Architecture documentation
- Technical decision-making

### 2. Backend Developer
- Server-side application implementation
- API development
- Database interaction implementation
- Server-side business logic
- Backend performance optimization

### 3. Frontend Developer
- Client-side application implementation
- UI/UX implementation
- Frontend performance optimization
- Client-side state management
- Frontend build and bundling

### 4. Security Specialist
- Security architecture design
- Security control implementation guidance
- Security testing guidance
- Compliance verification
- Security documentation

### 5. Database Expert
- Database design and modeling
- Query optimization
- Database administration
- Data migration strategies
- Database security implementation

### 6. DevOps Engineer
- CI/CD pipeline setup
- Infrastructure as code
- Deployment strategies
- Monitoring and logging setup
- Environment configuration

### 7. Tester
- Test strategy development
- Test plan creation
- Test case design
- Test automation
- Test execution and reporting

### 8. Code Reviewer
- Code quality evaluation
- Best practice verification
- Design pattern assessment
- Performance review
- Security review

### 9. Code Refactorer
- Code smell identification
- Refactoring implementation
- Technical debt reduction
- Code structure improvement
- Performance optimization

### 10. Documentation Writer
- User documentation
- API documentation
- Technical documentation
- Documentation structure
- Documentation maintenance

### 11. Researcher
- Technology research
- Best practice research
- Market research
- Competitive analysis
- Trend analysis

### 12. Product Manager
- Requirements gathering
- Feature prioritization
- User story creation
- Product roadmap development
- Stakeholder communication

### 13. UI/UX Designer
- User interface design
- User experience design
- Design system development
- Usability testing
- Visual design

### 14. Code Scanner
- Static code analysis
- Security vulnerability scanning
- Code quality assessment
- Dependency analysis
- Compliance verification

### 15. Code Debugger
- Bug identification
- Root cause analysis
- Debugging strategy development
- Fix implementation
- Regression testing

## Task Type Delegation Matrix

| Task Type | Primary Mode | Secondary Mode |
|-----------|---------------|-----------------|
| Requirements gathering | Product Manager | Architecture Designer |
| High-level system design & Tech Stack | Architecture Designer | Product Manager |
| UI/UX Design | UI/UX Designer | Frontend Developer |
| Frontend Implementation | Frontend Developer | UI/UX Designer |
| Backend Implementation | Backend Developer | Database Expert |
| Database Design | Database Expert | Backend Developer |
| DevOps Setup | DevOps Engineer | Security Specialist |
| Security Implementation | Security Specialist | DevOps Engineer |
| Code Review | Code Reviewer | (Relevant Developer) |
| Debugging | Code Debugger | (Relevant Developer) |
| Code Refactoring | Code Refactorer | Code Reviewer |
| Testing | Tester | (Relevant Developer) |
| Documentation | Documentation Writer | (Relevant Developer) |
| Code Analysis | Code Scanner | Architecture Designer |
| Research | Researcher | (Relevant Domain Expert) |

## Delegation Decision Tree

For tasks that could potentially be handled by multiple modes, use this decision tree:

1. **Security-Related Tasks**
   - If defining security architecture or requirements → Security Specialist
   - If implementing security controls in code → Backend/Frontend Developer (with Security Specialist guidance)
   - If testing security controls → Tester (with Security Specialist guidance)
   - If reviewing security aspects of code → Code Reviewer (with Security Specialist guidance)

2. **Documentation-Related Tasks**
   - If creating user-facing documentation → Documentation Writer
   - If creating technical specifications → Architecture Designer
   - If creating API documentation → Documentation Writer (with Backend Developer input)
   - If creating security documentation → Security Specialist

3. **Code Quality-Related Tasks**
   - If reviewing existing code → Code Reviewer
   - If improving existing code structure → Code Refactorer
   - If implementing new code → Backend/Frontend Developer
   - If scanning code for issues → Code Scanner

4. **Testing-Related Tasks**
   - If defining test strategy → Tester
   - If implementing automated tests → Tester
   - If performing security testing → Tester (with Security Specialist guidance)
   - If performing performance testing → Tester (with relevant developer guidance)

## Collaborative Approaches

For complex tasks that require multiple modes, consider these collaborative approaches:

1. **Sequential Collaboration**
   - Mode A completes their portion and hands off to Mode B
   - Clear handoff protocols must be followed
   - Context must be properly transferred

2. **Advisory Collaboration**
   - Primary mode leads the task
   - Secondary mode provides guidance and review
   - Primary mode maintains responsibility for completion

3. **Parallel Collaboration**
   - Multiple modes work on different aspects simultaneously
   - Regular synchronization points are established
   - Maestro coordinates the integration of work

## Workflow-Specific Delegation Strategies

### YOLO Workflows
- Favor direct delegation chains
- Strive for modes to complete their part and hand off
- Minimize iterative loops back to the same mode unless absolutely necessary
- Prioritize the mode that can make the most efficient, autonomous progress

### Follow Workflows
- Expect and plan for iterative loops
- Lean towards modes that facilitate user interaction
- Delegation should anticipate feedback cycles
- Build in checkpoints for user approval

## Handoff Protocol

When a specialized mode completes its assigned task, it MUST report back to Maestro using the following standardized protocol:

1. **Task Completion Status**:
   - Clearly state if the assigned task was completed successfully, partially completed (with reasons), or blocked (with reasons).

2. **Concise Summary of Work Performed**:
   - A brief, high-level overview of what was accomplished.

3. **List of Artifacts Created/Modified**:
   - Provide a list of all new files created or existing files modified.
   - MUST use full relative paths from the project root.

4. **Key Decisions Made or Assumptions Taken**:
   - Highlight any significant decisions made during task execution.
   - Note any critical assumptions made to complete the task.

5. **Open Questions or Issues Requiring Maestro's Attention**:
   - List any unresolved questions, new issues identified, or potential risks.
   - If user input is required, clearly state the question(s).

6. **Recommendation for Next Step/Mode (If Applicable)**:
   - Suggest the next logical mode and high-level task.

7. **Information for Workflow State Update**:
   - Provide a bulleted list of key facts or status updates for the workflow state.
