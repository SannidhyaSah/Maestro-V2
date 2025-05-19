# Mobile Application Project Type - UI/UX Designer Rules

## Overview
These rules extend the core UI/UX Designer rules specifically for mobile application projects. When designing user interfaces and experiences for mobile applications, you must pay special attention to the unique aspects of mobile interfaces and interactions.

## Mobile-Specific Design Considerations

### 1. Platform Design Guidelines
- **Required Approach**:
  - Follow platform-specific design guidelines (Material Design for Android, Human Interface Guidelines for iOS)
  - Adapt designs for platform-specific patterns and components
  - Consider platform differences in navigation, interaction, and visual style
  - Document platform-specific adaptations
  - Maintain consistency with platform conventions while preserving brand identity

### 2. Screen Size and Density
- **Required Considerations**:
  - Design for multiple device sizes (phones, tablets, foldables)
  - Account for different screen densities and resolutions
  - Create adaptive layouts for different aspect ratios
  - Consider notches, rounded corners, and other hardware variations
  - Design for both portrait and landscape orientations if applicable
  - Specify dimensions in density-independent units

### 3. Touch Interaction Design
- **Required Decisions**:
  - Design appropriately sized touch targets (minimum 44x44 dp)
  - Consider thumb zones and one-handed usage
  - Design for gestures (swipe, pinch, tap, long press)
  - Create touch feedback states
  - Consider edge swipe interactions
  - Design for multi-touch when applicable

### 4. Mobile Navigation Patterns
- **Required Approach**:
  - Select appropriate navigation pattern (tab bar, drawer, bottom sheet, etc.)
  - Design for deep linking and back navigation
  - Consider app switching and multitasking
  - Design for hierarchical navigation
  - Create navigation state indicators
  - Consider one-handed navigation accessibility

### 5. Mobile Performance Considerations
- **Required Approach**:
  - Design with awareness of loading performance
  - Create loading states and skeleton screens
  - Design for offline states and data synchronization
  - Consider battery usage implications
  - Design for intermittent connectivity
  - Create low-data usage options if applicable

### 6. Mobile Input Methods
- **Required Considerations**:
  - Design for virtual keyboard interactions
  - Create mobile-optimized form inputs
  - Consider autocomplete and prediction
  - Design for voice input when applicable
  - Account for keyboard appearance and disappearance
  - Design for biometric authentication if applicable

### 7. Device Capabilities Integration
- **Required Decisions**:
  - Design for camera integration if applicable
  - Consider location services in the user experience
  - Design for push notifications
  - Integrate with device sensors when relevant
  - Design for permission requests
  - Create fallbacks for denied permissions

### 8. Mobile Accessibility
- **Required Considerations**:
  - Design for screen readers (VoiceOver, TalkBack)
  - Create accessible touch targets
  - Ensure sufficient color contrast
  - Design for dynamic text sizes
  - Consider one-handed operation
  - Design for reduced motion preferences

## Mobile Application Design Deliverables
For mobile application projects, you MUST include these additional deliverables:

### 1. Platform-Specific Designs
- Separate designs for iOS and Android if applicable
- Platform-specific component adaptations
- Documentation of platform differences
- Platform-specific interaction patterns
- Adherence to platform guidelines

### 2. Device Adaptation Specifications
- Designs for different device sizes
- Layout adaptations for tablets if applicable
- Orientation changes specifications
- Notch and hardware feature accommodations
- Screen density considerations

### 3. Interactive Prototype
- Clickable prototype of key user flows
- Gesture demonstrations
- Transition and animation specifications
- Navigation patterns
- State transitions

### 4. Mobile Component Library
- Button states (normal, pressed, disabled)
- Form elements and states
- Navigation components
- Card and container components
- Modal and dialog components
- Loading and empty states
- Permission request designs

### 5. App Icon and Launch Screen
- App icon in required sizes
- App icon in different states (if applicable)
- Launch screen design
- App store assets

## Mobile Application Design Questions
Use these additional questions when designing for mobile applications:

1. **Platform Questions**:
   - "Will the app be developed for iOS, Android, or both?"
   - "Should the design follow platform conventions strictly or have a custom look and feel?"
   - "Are there specific platform features we should leverage in the design?"
   - "How should the design adapt between platforms while maintaining brand consistency?"

2. **Device Questions**:
   - "What device types need to be supported (phones, tablets, foldables)?"
   - "What are the minimum and maximum screen sizes to design for?"
   - "Should the app support both portrait and landscape orientations?"
   - "How should the design adapt to different screen sizes and densities?"

3. **Interaction Questions**:
   - "What gestures should be incorporated into the interaction design?"
   - "How should we handle one-handed usage scenarios?"
   - "What feedback mechanisms should we use for touch interactions?"
   - "How should we design for different input methods (touch, voice, etc.)?"

4. **Capability Questions**:
   - "Which device capabilities should be integrated into the experience (camera, location, etc.)?"
   - "How should we design permission request flows?"
   - "What should happen if users deny access to certain device features?"
   - "How should push notifications be incorporated into the experience?"

Remember to document all mobile-specific design decisions in the appropriate sections of the design documentation and ensure they are properly justified with clear rationales based on user needs and platform best practices.
