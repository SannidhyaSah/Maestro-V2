# Web Application Project Type - UI/UX Designer Rules

## Overview
These rules extend the core UI/UX Designer rules specifically for web application projects. When designing user interfaces and experiences for web applications, you must pay special attention to the unique aspects of web-based interfaces.

## Web-Specific Design Considerations

### 1. Responsive Design
- **Required Approach**:
  - Design for multiple screen sizes and devices
  - Use a mobile-first or desktop-first approach (based on user demographics)
  - Create breakpoint specifications for key screen sizes
  - Document how layouts adapt across different devices
  - Consider touch vs. mouse interactions
  - Design for both portrait and landscape orientations on mobile devices

### 2. Browser Compatibility
- **Required Considerations**:
  - Design with awareness of browser rendering differences
  - Specify fallback designs for older browsers if required
  - Consider browser-specific limitations
  - Document any browser-specific design adaptations
  - Consider how designs degrade gracefully in limited browsers

### 3. Web Navigation Patterns
- **Required Decisions**:
  - Select appropriate primary navigation pattern (horizontal, vertical, hamburger, etc.)
  - Design secondary navigation systems
  - Create breadcrumb navigation when appropriate
  - Design for deep linking and browser history
  - Consider navigation state indicators
  - Design for both new and returning users

### 4. Web Performance Considerations
- **Required Approach**:
  - Design with awareness of loading performance
  - Create loading states and skeleton screens
  - Consider progressive loading of content
  - Design for offline states if applicable
  - Optimize image usage in designs
  - Consider lazy-loading implications for below-the-fold content

### 5. Web Forms and Input
- **Required Considerations**:
  - Design accessible form layouts
  - Create clear input field specifications
  - Design effective form validation and error states
  - Consider inline vs. batch validation approaches
  - Design for autofill compatibility
  - Create mobile-friendly input experiences

### 6. Web-Specific Interactions
- **Required Decisions**:
  - Design hover states for desktop users
  - Create touch-friendly tap targets for mobile users
  - Design drag-and-drop interactions if applicable
  - Consider scrolling behaviors and scroll-based interactions
  - Design modal and dialog experiences
  - Consider browser-native vs. custom controls

### 7. Web Typography
- **Required Approach**:
  - Select web-safe fonts or web fonts
  - Create responsive typography system
  - Define font fallbacks
  - Consider font loading performance
  - Design for variable font support if applicable
  - Ensure readable text at all screen sizes

### 8. Web Accessibility
- **Required Considerations**:
  - Design for keyboard navigation
  - Create focus states for interactive elements
  - Ensure sufficient color contrast
  - Design for screen reader compatibility
  - Consider reduced motion preferences
  - Design for zoom and text scaling

## Web Application Design Deliverables
For web application projects, you MUST include these additional deliverables:

### 1. Responsive Design Specifications
- Breakpoint definitions
- Layout grids for each breakpoint
- Component behavior across breakpoints
- Device-specific adaptations
- Touch target size guidelines

### 2. Interactive Prototype
- Clickable prototype of key user flows
- Demonstration of responsive behavior
- Interaction specifications
- State transitions
- Navigation patterns

### 3. Web Component Library
- Button states (normal, hover, active, focus, disabled)
- Form elements and states
- Navigation components
- Card and container components
- Modal and dialog components
- Loading and empty states

### 4. Design Tokens
- Color palette with hex/RGB values
- Typography specifications with fallbacks
- Spacing system
- Shadow definitions
- Border and radius definitions
- Transition and animation timing

## Web Application Design Questions
Use these additional questions when designing for web applications:

1. **Responsive Design Questions**:
   - "What are the primary devices and screen sizes users will use to access the application?"
   - "Should we prioritize mobile or desktop experience?"
   - "How should complex interactions adapt to touch interfaces?"
   - "What content should be prioritized on smaller screens?"

2. **Browser Support Questions**:
   - "Which browsers and versions must be supported?"
   - "Are there any specific browser limitations we should be aware of?"
   - "How should the design degrade in older browsers?"
   - "Are there any browser-specific features we should leverage or avoid?"

3. **Performance Questions**:
   - "Are there users with slow internet connections we need to consider?"
   - "How should we handle loading states for content-heavy pages?"
   - "Should the application work offline or in limited connectivity?"
   - "How can we design to minimize perceived loading time?"

4. **Interaction Questions**:
   - "Should we use browser-native controls or custom components?"
   - "How should interactions differ between touch and mouse users?"
   - "What feedback mechanisms should we use for user actions?"
   - "How should we handle form validation and errors?"

Remember to document all web-specific design decisions in the appropriate sections of the design documentation and ensure they are properly justified with clear rationales based on user needs and best practices.
