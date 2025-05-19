# Handoff Protocol: From Architecture Designer to Database Expert

## Overview
This document outlines the standardized process for receiving work from the Architecture Designer mode. The handoff process ensures that the Database Expert has all necessary information to design, implement, and optimize database solutions that align with the overall system architecture.

## Required Information from Architecture Designer

### 1. System Context

#### 1.1 High-Level Architecture
- Overall system architecture diagram
- Component interactions and data flows
- Integration points with external systems
- Deployment environment details
- Scalability and performance requirements
- High availability and disaster recovery requirements

#### 1.2 Technology Stack
- Approved database technologies and versions
- Constraints on database selection
- Integration with other technologies in the stack
- Infrastructure and hosting environment
- Monitoring and observability tools
- DevOps and CI/CD considerations

#### 1.3 Non-Functional Requirements
- Performance expectations and SLAs
- Scalability requirements (current and projected)
- Availability requirements
- Security and compliance requirements
- Data retention and archiving needs
- Backup and recovery expectations

### 2. Data Requirements

#### 2.1 Conceptual Data Model
- Entity definitions and relationships
- Entity attributes and data types
- Entity cardinality and relationships
- Business rules and constraints
- Data ownership and boundaries
- Domain-specific terminology

#### 2.2 Data Volumes and Patterns
- Estimated data volumes
- Growth projections
- Read/write ratios
- Access patterns and query requirements
- Batch processing requirements
- Reporting and analytics needs

#### 2.3 Data Lifecycle
- Data retention requirements
- Archiving strategy
- Data purging requirements
- Historical data access patterns
- Audit and compliance requirements
- Data migration considerations

### 3. Integration Requirements

#### 3.1 Application Integration
- Application frameworks and ORMs
- Connection pooling requirements
- Transaction management approach
- Caching strategy
- API requirements for data access
- Microservices considerations

#### 3.2 External System Integration
- Third-party system integrations
- Data synchronization requirements
- ETL/ELT processes
- Real-time integration needs
- API gateway considerations
- Event-driven architecture components

#### 3.3 Authentication and Authorization
- Authentication mechanisms
- Authorization model
- Role-based access control requirements
- Multi-tenancy considerations
- Data isolation requirements
- Compliance and regulatory requirements

## Handoff Process

### 1. Initial Handoff Meeting

#### 1.1 Meeting Agenda
- Review of architecture documentation
- Discussion of data requirements
- Clarification of database technology selection
- Identification of constraints and challenges
- Discussion of critical success factors
- Timeline and milestone expectations

#### 1.2 Required Participants
- Architecture Designer
- Database Expert
- Backend Developer (if available)
- Product Manager (for business context)
- DevOps Engineer (for operational considerations)
- Security Specialist (for security requirements)

#### 1.3 Meeting Outcomes
- Shared understanding of requirements
- Clarification of ambiguities
- Identification of missing information
- Agreement on next steps
- Documentation of decisions and action items

### 2. Documentation Review

#### 2.1 Required Documentation
- Architecture overview document
- Data model documentation
- Non-functional requirements specification
- Technology stack documentation
- Security and compliance requirements
- Integration specifications

#### 2.2 Review Process
- Thorough review of all documentation
- Identification of gaps or inconsistencies
- Documentation of questions and concerns
- Request for additional information if needed
- Validation of assumptions

#### 2.3 Review Outcomes
- Comprehensive understanding of requirements
- Documentation of clarifications and decisions
- Updated requirements based on feedback
- Identification of risks and mitigation strategies
- Agreement on scope and boundaries

### 3. Follow-up Questions and Clarifications

#### 3.1 Question Categories
- Data model clarifications
- Technology selection considerations
- Performance and scalability requirements
- Security and compliance details
- Operational requirements
- Integration specifics

#### 3.2 Clarification Process
- Formal documentation of questions
- Scheduled follow-up meetings if needed
- Written responses to questions
- Documentation of answers and decisions
- Validation of understanding

#### 3.3 Clarification Outcomes
- Complete understanding of requirements
- Resolution of ambiguities
- Documentation of decisions
- Updated requirements based on clarifications
- Shared understanding among all stakeholders

## Validation and Acceptance

### 1. Requirements Validation

#### 1.1 Validation Criteria
- Completeness of requirements
- Clarity of specifications
- Feasibility of implementation
- Alignment with system architecture
- Consistency with other components
- Adherence to best practices

#### 1.2 Validation Process
- Review of all requirements
- Documentation of validation results
- Identification of issues or concerns
- Proposal of alternatives if needed
- Discussion of trade-offs

#### 1.3 Validation Outcomes
- Validated requirements
- Documentation of issues and resolutions
- Agreement on implementation approach
- Identification of risks and mitigation strategies
- Shared understanding of constraints

### 2. Acceptance Criteria

#### 2.1 Formal Acceptance
- Confirmation of complete and clear requirements
- Agreement on database technology selection
- Understanding of constraints and limitations
- Acknowledgment of risks and challenges
- Commitment to implementation timeline
- Documentation of acceptance

#### 2.2 Conditional Acceptance
- Documentation of conditions
- Timeline for resolving conditions
- Responsibility for addressing conditions
- Process for verifying resolution
- Impact on implementation timeline

#### 2.3 Rejection Criteria
- Incomplete or unclear requirements
- Infeasible implementation approach
- Unacceptable risks or constraints
- Misalignment with system architecture
- Inadequate performance or scalability considerations
- Insufficient security or compliance measures

## Next Steps and Deliverables

### 1. Database Expert Deliverables

#### 1.1 Initial Deliverables
- Database design document
- Schema definitions
- Data access patterns
- Performance optimization strategy
- Security implementation plan
- Backup and recovery strategy

#### 1.2 Timeline and Milestones
- Design phase completion
- Implementation phase completion
- Testing and validation
- Performance optimization
- Documentation completion
- Handoff to Backend Developer

#### 1.3 Review and Feedback Process
- Regular progress reviews
- Feedback incorporation
- Change management process
- Issue resolution approach
- Final review and approval

### 2. Collaboration with Other Modes

#### 2.1 Backend Developer Collaboration
- Data access layer design
- ORM configuration
- Transaction management
- Connection pooling
- Query optimization
- Performance testing

#### 2.2 DevOps Engineer Collaboration
- Database deployment automation
- Monitoring and alerting setup
- Backup and recovery automation
- High availability configuration
- Database CI/CD pipeline
- Environment configuration

#### 2.3 Security Specialist Collaboration
- Access control implementation
- Data encryption
- Audit logging
- Compliance validation
- Security testing
- Vulnerability assessment
