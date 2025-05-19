# Mobile Application Project Type - Architecture Designer Rules

## Overview
These rules extend the core Architecture Designer rules specifically for mobile application projects. When designing architecture for mobile applications, you must pay special attention to the unique aspects of mobile software architecture.

## Mobile-Specific Architecture Considerations

### 1. Application Type
- **Required Decisions**:
  - Native (iOS/Android) vs. Cross-platform approach
  - If cross-platform, framework selection (React Native, Flutter, Xamarin, etc.)
  - If native, language selection (Swift/Objective-C for iOS, Kotlin/Java for Android)
  - Hybrid approaches (when applicable)
  - Progressive Web App vs. native app considerations

### 2. Frontend Architecture
- **Required Decisions**:
  - UI architecture pattern (MVC, MVVM, MVP, Redux, etc.)
  - Navigation architecture
  - State management approach
  - UI component architecture
  - Responsive design for different screen sizes
  - Orientation support strategy

### 3. Backend Integration
- **Required Decisions**:
  - API design for mobile clients (REST, GraphQL, etc.)
  - Authentication and authorization approach
  - Offline data synchronization strategy
  - Push notification architecture
  - File upload/download strategy
  - API versioning approach for app updates

### 4. Data Architecture
- **Required Decisions**:
  - Local data storage approach (SQLite, Realm, Core Data, etc.)
  - Data caching strategy
  - Offline-first vs. online-first approach
  - Data synchronization patterns
  - Conflict resolution strategy
  - Data migration strategy for app updates

### 5. Mobile-Specific Infrastructure
- **Required Decisions**:
  - Backend services architecture
  - CDN strategy for assets
  - Mobile-specific API optimizations
  - Geographic distribution strategy
  - Analytics infrastructure
  - Crash reporting infrastructure

### 6. Mobile Security Architecture
- **Required Decisions**:
  - Secure storage of sensitive data
  - Certificate pinning strategy
  - Biometric authentication integration
  - App permissions strategy
  - Secure communication approach
  - Anti-tampering measures
  - Obfuscation strategy

### 7. Performance Architecture
- **Required Decisions**:
  - App startup optimization
  - Memory management strategy
  - Battery usage optimization
  - Network bandwidth optimization
  - Image loading and caching strategy
  - Background processing approach

### 8. Distribution and Deployment
- **Required Decisions**:
  - App store deployment strategy
  - CI/CD pipeline for mobile
  - Beta testing approach
  - App signing and provisioning
  - Update strategy
  - Feature flagging approach

## Mobile Application Architecture Document Additions
For mobile application projects, you MUST include these additional sections in the architecture document:

### 1. Mobile Platform Strategy
- Platform selection rationale
- Version support strategy
- Device compatibility considerations
- Platform-specific feature utilization

### 2. Mobile UI Architecture
- Screen hierarchy and navigation flow
- UI component architecture
- Responsive design approach for different devices
- Platform design guideline adherence

### 3. Offline Capability Architecture
- Offline data access strategy
- Synchronization mechanism
- Conflict resolution approach
- Recovery from network failures

### 4. Device Capability Integration
- Camera, location, sensors integration
- Platform-specific API usage
- Permission handling strategy
- Fallback mechanisms when permissions denied

## Mobile Application Technology Stack Considerations
When recommending technology stacks for mobile applications, consider these specific factors:

### 1. Development Approach Considerations
- Development speed requirements
- Team expertise (iOS, Android, cross-platform)
- UI complexity and performance requirements
- Native feature requirements
- Long-term maintenance considerations
- Budget constraints
- Time-to-market requirements

### 2. Cross-Platform Framework Considerations (if applicable)
- Performance characteristics
- Native feature access
- UI component fidelity
- Community support and maturity
- Long-term viability
- Learning curve
- Debugging and tooling support

### 3. Backend Service Considerations
- Mobile-specific API requirements
- Authentication mechanisms suitable for mobile
- Push notification requirements
- Offline sync capabilities
- Bandwidth efficiency

## Mobile Application Architecture Questions
Use these additional questions when designing architecture for mobile applications:

1. **Platform Questions**:
   - "Is a native experience required, or is cross-platform acceptable?"
   - "Which platforms must be supported (iOS, Android, both)?"
   - "What are the minimum OS versions that need to be supported?"
   - "Are there specific device types that must be supported (phones, tablets, foldables)?"

2. **Feature Questions**:
   - "Which device capabilities need to be leveraged (camera, location, biometrics, etc.)?"
   - "How important is offline functionality?"
   - "Are there any specific performance requirements (startup time, memory usage)?"
   - "Are push notifications required?"
   - "Is background processing needed?"

3. **User Experience Questions**:
   - "Should the app follow platform-specific design guidelines or have a custom design?"
   - "What screen orientations need to be supported?"
   - "Are there any specific animation or transition requirements?"
   - "How should the app handle different screen sizes and resolutions?"

4. **Distribution Questions**:
   - "What is the update strategy for the app?"
   - "Are there any app store-specific requirements to consider?"
   - "Is enterprise distribution required?"
   - "How will beta testing be handled?"

Remember to document all mobile-specific architectural decisions in the appropriate sections of the architecture document and ensure they are properly justified with clear rationales.
