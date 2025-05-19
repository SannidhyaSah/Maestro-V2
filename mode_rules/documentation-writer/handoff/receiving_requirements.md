# Documentation Requirements Handoff Protocol

## Overview
This document outlines the standardized process for receiving documentation requirements from other modes or directly from users. Following this protocol ensures that the Documentation Writer mode has all the necessary information to create effective, accurate, and comprehensive documentation.

## Required Information

### 1. Documentation Purpose and Scope
The Documentation Writer mode MUST receive clear information about:
- The purpose of the documentation
- The scope of what should be covered
- What should be excluded from scope
- The level of detail required

### 2. Target Audience Information
The Documentation Writer mode MUST receive detailed information about the target audience, including:
- Primary and secondary audience groups
- Technical expertise level of each audience
- Prior knowledge assumptions
- Specific user roles and their documentation needs
- Languages and localization requirements

### 3. Documentation Type and Format
The Documentation Writer mode MUST receive specifications for:
- Required documentation types (API docs, user guides, technical specs, etc.)
- Preferred formats (Markdown, HTML, PDF, etc.)
- Style and branding requirements
- Any templates that should be followed
- Publication platforms and their constraints

### 4. Technical Information
The Documentation Writer mode MUST receive comprehensive technical information, including:
- Access to the product, system, or code being documented
- Technical specifications and architecture documents
- API definitions and schemas
- Database models and relationships
- User interface designs and workflows
- Sample code and examples
- Test cases and expected behaviors

### 5. Subject Matter Expert Contacts
The Documentation Writer mode MUST receive:
- Contact information for subject matter experts
- Areas of expertise for each contact
- Availability for technical reviews
- Preferred communication channels
- Review process expectations

### 6. Timeline and Deliverables
The Documentation Writer mode MUST receive clear information about:
- Documentation deadlines
- Milestone expectations
- Review cycles and timelines
- Final deliverable formats
- Publication process and responsibilities

## Handoff Templates

### 1. Documentation Requirements Template

```markdown
# Documentation Requirements

## Basic Information
- **Project/Feature Name**: [Name]
- **Documentation Requestor**: [Name/Role]
- **Date Requested**: [Date]
- **Required Completion Date**: [Date]

## Documentation Purpose
[Describe the purpose of the documentation and the problems it aims to solve]

## Scope
- **In Scope**: [List items that should be covered]
- **Out of Scope**: [List items that should not be covered]
- **Level of Detail**: [Brief/Moderate/Comprehensive]

## Target Audience
- **Primary Audience**: [Description]
  - **Technical Level**: [Beginner/Intermediate/Advanced]
  - **Prior Knowledge**: [Assumptions about what they already know]
  - **Goals**: [What they need to accomplish with this documentation]

- **Secondary Audience**: [Description]
  - **Technical Level**: [Beginner/Intermediate/Advanced]
  - **Prior Knowledge**: [Assumptions about what they already know]
  - **Goals**: [What they need to accomplish with this documentation]

## Documentation Type and Format
- **Documentation Types Needed**:
  - [ ] API Documentation
  - [ ] User Guide
  - [ ] Technical Specification
  - [ ] Reference Documentation
  - [ ] Installation Guide
  - [ ] Tutorial
  - [ ] Other: [Specify]

- **Format Requirements**:
  - **Primary Format**: [Markdown/HTML/PDF/Other]
  - **Style Guide**: [Link or reference]
  - **Branding Requirements**: [Details]
  - **Publication Platform**: [Where the documentation will be published]

## Technical Information
- **Product/Feature Overview**: [Brief description]
- **Access Information**: [How to access the product/code/system]
- **Key Technical Concepts**: [List of important concepts to cover]
- **Related Documentation**: [Links to existing documentation]
- **Code Repositories**: [Links to relevant repositories]
- **API Definitions**: [Links or attachments]
- **Architecture Documents**: [Links or attachments]
- **UI Designs**: [Links or attachments]
- **Sample Data**: [Links or attachments]

## Subject Matter Experts
- **Primary Contact**: [Name]
  - **Role**: [Role]
  - **Areas of Expertise**: [List]
  - **Contact Information**: [Email/Slack/etc.]
  - **Availability**: [Information about availability for questions and reviews]

- **Additional Contacts**:
  - **[Name]**: [Role, Areas of Expertise, Contact Information]
  - **[Name]**: [Role, Areas of Expertise, Contact Information]

## Timeline and Process
- **Draft Completion**: [Date]
- **Technical Review**: [Date]
- **Final Delivery**: [Date]
- **Review Process**: [Description of how reviews will be conducted]
- **Publication Process**: [Description of how the documentation will be published]

## Additional Requirements
[Any additional requirements or considerations]
```

## Mode-Specific Handoff Protocols

### 1. From Architecture Designer Mode
When receiving documentation requirements from the Architecture Designer mode, the Documentation Writer mode should:
- Request the complete architecture documentation
- Clarify which aspects of the architecture need to be documented for different audiences
- Understand the technical terminology and concepts used in the architecture
- Identify diagrams and visual elements that should be included or adapted
- Determine how to present complex architectural concepts to different audience levels

### 2. From Backend/Frontend Developer Mode
When receiving documentation requirements from Developer modes, the Documentation Writer mode should:
- Request access to the codebase and development environment
- Clarify API specifications and usage patterns
- Understand data models and their relationships
- Identify key code examples that should be included
- Determine the appropriate level of technical detail for the target audience

### 3. From UI/UX Designer Mode
When receiving documentation requirements from the UI/UX Designer mode, the Documentation Writer mode should:
- Request access to UI designs and prototypes
- Clarify user workflows and interaction patterns
- Understand design principles and terminology
- Identify screenshots and visual elements that should be included
- Determine how to document the user experience effectively

### 4. From Product Manager Mode
When receiving documentation requirements from the Product Manager mode, the Documentation Writer mode should:
- Clarify product features and their intended use cases
- Understand user personas and their documentation needs
- Identify key workflows that should be documented
- Determine the appropriate tone and style for the target audience
- Understand the business context and value proposition

### 5. From DevOps Engineer Mode
When receiving documentation requirements from the DevOps Engineer mode, the Documentation Writer mode should:
- Request access to deployment and infrastructure configurations
- Clarify deployment processes and environments
- Understand monitoring and maintenance procedures
- Identify key operational tasks that should be documented
- Determine the appropriate level of detail for operations documentation

### 6. From Security Specialist Mode
When receiving documentation requirements from the Security Specialist mode, the Documentation Writer mode should:
- Understand security features and their implementation
- Clarify security best practices that should be documented
- Identify sensitive information that should be handled carefully
- Determine how to document security considerations for different audiences
- Understand compliance requirements that affect documentation

### 7. From Tester Mode
When receiving documentation requirements from the Tester mode, the Documentation Writer mode should:
- Understand test cases and expected behaviors
- Clarify edge cases and error conditions
- Identify common issues and their solutions
- Determine how to document troubleshooting procedures
- Understand quality assurance processes

## Clarification Process
If the provided information is incomplete or unclear, the Documentation Writer mode MUST:
1. Identify specific information gaps
2. Request clarification through appropriate channels
3. Document assumptions made when clarification is not available
4. Highlight areas of uncertainty in draft documentation
5. Seek validation of assumptions during the review process
