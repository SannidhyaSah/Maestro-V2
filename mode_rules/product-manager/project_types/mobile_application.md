# Mobile Application Project Type - Product Manager Rules

## Overview
These rules extend the core Product Manager rules specifically for mobile application projects. When gathering requirements for mobile applications, you must pay special attention to the unique aspects of mobile software.

## Mobile-Specific Requirements Areas

### 1. Platform Support
- **Required Information**:
  - Target platforms (iOS, Android, cross-platform)
  - Minimum OS versions to support
  - Device types to support (phones, tablets, foldables)
  - Platform-specific feature requirements

### 2. Mobile UX Requirements
- **Required Information**:
  - Touch interaction patterns
  - Gesture support requirements
  - Screen orientation support (portrait, landscape, both)
  - Navigation patterns (tab bar, hamburger menu, etc.)
  - Platform design guidelines adherence (Material Design, Human Interface Guidelines)

### 3. Mobile Performance Requirements
- **Required Information**:
  - App startup time targets
  - Memory usage constraints
  - Battery usage considerations
  - Data usage limitations
  - Offline capabilities requirements

### 4. Device Capability Requirements
- **Required Information**:
  - Camera usage requirements
  - Location services requirements
  - Biometric authentication requirements
  - Push notification requirements
  - Background processing requirements
  - Sensor usage (accelerometer, gyroscope, etc.)

### 5. Mobile Security Requirements
- **Required Information**:
  - Data storage security requirements
  - Authentication requirements
  - Authorization and permission models
  - Secure communication requirements
  - App store security compliance requirements

### 6. App Distribution Requirements
- **Required Information**:
  - App store distribution plans (Apple App Store, Google Play, etc.)
  - Enterprise distribution requirements
  - Beta testing distribution requirements
  - Update strategy

### 7. Mobile Integration Requirements
- **Required Information**:
  - Integration with platform-specific services (Apple Pay, Google Pay, etc.)
  - Integration with platform-specific features (Siri, Google Assistant, etc.)
  - Third-party SDK requirements
  - Backend API requirements

## Mobile Application PRD Additions
For mobile application projects, you MUST include these additional sections in the PRD:

### 1. Mobile Platform Strategy
- Platform support matrix
- Device support matrix
- OS version support matrix
- Platform-specific feature matrix

### 2. Screen Inventory
- List of all screens in the application
- Purpose of each screen
- Key components on each screen
- User flows between screens

### 3. Mobile-Specific Non-Functional Requirements
- Performance requirements by screen type
- Battery usage requirements
- Data usage requirements
- Offline capabilities requirements

### 4. Device Permissions
- List of all required device permissions
- Justification for each permission
- Timing of permission requests
- Fallback strategies for denied permissions

### 5. App Store Requirements
- App store listing requirements
- Age ratings
- Content policies compliance
- In-app purchase requirements

## Mobile Application User Story Specifics
When creating user stories for mobile applications, ensure you:

1. **Include Device Context**:
   - "As an iPhone user, I want to..."
   - "As an Android tablet user, I want to..."

2. **Address Connection Scenarios**:
   - "As a user with limited data, I want to..."
   - "As a user in offline mode, I want to..."

3. **Consider Device Capability Scenarios**:
   - "As a user who has denied camera permissions, I want to..."
   - "As a user with low battery, I want to..."

## Mobile Application Requirements Gathering Questions
Use these additional questions when gathering requirements for mobile applications:

1. **Platform Questions**:
   - "Which mobile platforms must be supported (iOS, Android, both)?"
   - "What are the minimum OS versions that need to be supported?"
   - "Are there specific device types that must be supported (phones, tablets, foldables)?"

2. **UX Questions**:
   - "Should the app follow platform-specific design guidelines or have a custom design?"
   - "What screen orientations need to be supported?"
   - "What navigation pattern is preferred?"

3. **Device Capability Questions**:
   - "Which device capabilities need to be leveraged (camera, location, biometrics, etc.)?"
   - "How should the app handle cases where users deny permission to these capabilities?"
   - "Are there any background processing requirements?"

4. **Offline Capability Questions**:
   - "Does the app need to function offline?"
   - "What features should be available offline?"
   - "How should data synchronization work when coming back online?"

5. **Distribution Questions**:
   - "How will the app be distributed (public app stores, enterprise distribution)?"
   - "Are there any in-app purchases or subscription requirements?"
   - "What is the update strategy for the app?"

Remember to document all mobile-specific requirements in the appropriate sections of the PRD and ensure they are properly prioritized using the MoSCoW method.
