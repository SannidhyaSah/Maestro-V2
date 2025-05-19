# Consolidated Documentation Guidelines

This document provides comprehensive documentation guidelines that apply across all modes. It combines core documentation principles with specific guidance for different documentation types.

## Documentation Principles

### 1. Audience-Centric
- Identify and understand the target audience
- Tailor content to the audience's knowledge level and needs
- Consider different user roles and personas
- Use language and terminology appropriate for the audience
- Structure content based on audience workflows

### 2. Clear and Concise
- Use plain, simple language
- Avoid unnecessary jargon and acronyms
- Define technical terms when they must be used
- Use active voice and direct instructions
- Keep sentences and paragraphs short and focused

### 3. Comprehensive and Complete
- Cover all necessary information
- Include both conceptual and procedural content
- Provide context and background information
- Include examples, diagrams, and illustrations
- Address common questions and edge cases

### 4. Consistent and Structured
- Use consistent terminology throughout
- Follow consistent formatting and style
- Use standardized templates and structures
- Organize content in a logical hierarchy
- Use consistent naming conventions

### 5. Maintainable and Updatable
- Design documentation for easy updates
- Use modular content where possible
- Implement version control for documentation
- Include last updated dates and version information
- Plan for documentation lifecycle management

## Documentation Types and Guidelines

### 1. Technical Specifications

#### Purpose and Audience
- Detailed technical information for developers and technical stakeholders
- Serves as a reference for implementation and maintenance
- Provides context for technical decisions

#### Key Components
- Overview (purpose, scope, context)
- Architecture (components, data flow, integration points)
- Detailed design (component specifications, data models, APIs)
- Implementation considerations (performance, security, scalability)
- Appendices (technical debt, future enhancements, references)

#### Best Practices
- Use precise, unambiguous technical language
- Include diagrams to illustrate architecture and data flow
- Document design decisions and their rationales
- Include non-functional requirements
- Reference related documents and dependencies

### 2. API Documentation

#### Purpose and Audience
- Reference for developers integrating with the API
- Provides details on endpoints, parameters, and responses
- Enables effective API usage and troubleshooting

#### Key Components
- API overview (purpose, base URL, authentication)
- Endpoints reference (URL, method, parameters, responses)
- Authentication and authorization details
- Common use cases and examples
- Error handling and status codes

#### Best Practices
- Use OpenAPI/Swagger specifications where possible
- Include request and response examples
- Document error scenarios and handling
- Provide code examples in multiple languages
- Include rate limiting and performance considerations

### 3. User Guides

#### Purpose and Audience
- Step-by-step instructions for end users
- Helps users accomplish tasks and use features effectively
- Addresses common questions and scenarios

#### Key Components
- Introduction (purpose, audience, prerequisites)
- Getting started (installation, setup, basic usage)
- Feature-specific instructions
- Troubleshooting and FAQs
- Reference information

#### Best Practices
- Use task-based organization
- Include screenshots and visual aids
- Use numbered steps for procedures
- Highlight tips, notes, and warnings
- Consider different user experience levels

### 4. Architecture Documentation

#### Purpose and Audience
- High-level overview of system architecture
- Provides context for technical decisions
- Serves as a reference for system evolution

#### Key Components
- Executive summary (overview, key decisions)
- System context (boundaries, interfaces)
- Architectural goals and principles
- Component architecture
- Data architecture
- Deployment architecture
- Cross-cutting concerns

#### Best Practices
- Use standard architectural notation (e.g., C4 model)
- Document architectural decisions and their rationales
- Include quality attributes and how they're addressed
- Reference related technical specifications
- Keep high-level documentation separate from implementation details

### 5. Security Documentation

#### Purpose and Audience
- Documents security architecture, controls, and practices
- Provides guidance for secure implementation
- Serves as a reference for security reviews and audits

#### Key Components
- Security overview (objectives, threat model, risk assessment)
- Application security controls
- Infrastructure security controls
- Security operations
- Compliance considerations

#### Best Practices
- Document threat model and risk assessment
- Include security controls and their implementation
- Reference relevant security standards and frameworks
- Document security testing approach and results
- Include security incident response procedures

## Documentation File Structure

The following file structure should be used for project documentation:

1. **Technical Specifications**:
   - Location: `/docs/technical-specs/{component-name}.md`
   - Template: `/mode_rules/shared/documentation/templates/technical_specification_template.md`

2. **API Documentation**:
   - Location: `/docs/api/{service-name}.md`
   - Template: `/mode_rules/shared/documentation/templates/api_documentation_template.md`

3. **User Guides**:
   - Location: `/docs/user-guides/{feature-or-component-name}.md`
   - Template: `/mode_rules/shared/documentation/templates/user_guide_template.md`

4. **Architecture Documentation**:
   - Location: `/docs/architecture/{document-name}.md`
   - Template: `/mode_rules/shared/documentation/templates/architecture_template.md`

5. **Security Documentation**:
   - Location: `/docs/security/{document-name}.md`
   - Template: `/mode_rules/shared/documentation/templates/security_documentation_template.md`

## Mode-Specific Responsibilities

Different modes have specific responsibilities related to documentation:

- **Documentation Writer**: Primary owner of documentation standards, provides detailed guidance
- **Architecture Designer**: Focuses on architecture documentation
- **Security Specialist**: Focuses on security documentation
- **Backend Developer**: Focuses on API and backend component documentation
- **Frontend Developer**: Focuses on UI component and user-facing documentation
