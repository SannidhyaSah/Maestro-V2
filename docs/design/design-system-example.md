# E-Commerce Platform Design System

## Document Information
- **Project Name**: E-Commerce Platform
- **Document Version**: 1.0
- **Last Updated**: 2023-05-15
- **Author**: UI/UX Designer Mode
- **Status**: Approved

## 1. Introduction

### 1.1 Purpose
This design system serves as the single source of truth for the E-Commerce Platform's user interface. It defines the visual language, components, and patterns that create a consistent and cohesive user experience across the platform.

### 1.2 Scope
This design system covers all user-facing interfaces of the E-Commerce Platform, including web and mobile responsive views. It includes visual design elements, components, and interaction patterns.

### 1.3 How to Use This Document
Developers should reference this document when implementing the user interface. All UI components should be built according to these specifications. Any deviations must be approved by the design team.

## 2. Design Principles

### 2.1 Core Principles
1. **Product-Centered**: Showcase products with minimal distraction
2. **Intuitive Navigation**: Make it easy for users to find products and complete purchases
3. **Responsive & Adaptive**: Provide optimal experience across all devices
4. **Consistent Patterns**: Use familiar patterns to reduce cognitive load
5. **Accessible for All**: Ensure the platform is usable by people of all abilities

### 2.2 Voice and Tone
- **Clear**: Use simple, straightforward language
- **Helpful**: Guide users through the shopping process
- **Confident**: Instill trust in the platform and products
- **Friendly**: Create a welcoming shopping environment without being overly casual

### 2.3 Accessibility Standards
This design system adheres to WCAG 2.1 AA standards, ensuring the platform is accessible to users with disabilities. All components have been designed with accessibility in mind, including:
- Sufficient color contrast
- Keyboard navigability
- Screen reader compatibility
- Focus states for interactive elements

## 3. Design Tokens

### 3.1 Color Palette

#### 3.1.1 Primary Colors
- **Primary**: #3B82F6 (RGB: 59, 130, 246) - Used for primary actions, links, and key UI elements
- **Primary Dark**: #1D4ED8 (RGB: 29, 78, 216) - Used for hover states and emphasis
- **Primary Light**: #93C5FD (RGB: 147, 197, 253) - Used for backgrounds and secondary elements

#### 3.1.2 Secondary Colors
- **Secondary**: #10B981 (RGB: 16, 185, 129) - Used for success states and secondary actions
- **Secondary Dark**: #059669 (RGB: 5, 150, 105) - Used for hover states on secondary elements
- **Secondary Light**: #6EE7B7 (RGB: 110, 231, 183) - Used for backgrounds and tertiary elements

#### 3.1.3 Neutral Colors
- **Background**: #FFFFFF (RGB: 255, 255, 255) - Primary background color
- **Surface**: #F9FAFB (RGB: 249, 250, 251) - Secondary background for cards and sections
- **Gray 100**: #F3F4F6 (RGB: 243, 244, 246) - Backgrounds, dividers
- **Gray 300**: #D1D5DB (RGB: 209, 213, 219) - Disabled states, secondary text
- **Gray 500**: #6B7280 (RGB: 107, 114, 128) - Placeholder text, icons
- **Gray 700**: #374151 (RGB: 55, 65, 81) - Secondary text
- **Gray 900**: #111827 (RGB: 17, 24, 39) - Primary text

#### 3.1.4 Semantic Colors
- **Success**: #10B981 (RGB: 16, 185, 129) - Positive actions, confirmations
- **Warning**: #F59E0B (RGB: 245, 158, 11) - Alerts, warnings
- **Error**: #EF4444 (RGB: 239, 68, 68) - Error states, destructive actions
- **Info**: #3B82F6 (RGB: 59, 130, 246) - Informational messages

#### 3.1.5 Color Accessibility
All color combinations used in the interface must meet WCAG 2.1 AA standards for contrast:
- Text: 4.5:1 contrast ratio against its background
- Large text (18pt+): 3:1 contrast ratio against its background
- UI components and graphical objects: 3:1 contrast ratio against adjacent colors

### 3.2 Typography

#### 3.2.1 Font Families
- **Primary Font**: Inter - Used for all UI text
- **Secondary Font**: None
- **Fallback Stack**: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif

#### 3.2.2 Type Scale
- **Heading 1**: 32px/40px, 700 weight - Used for page titles
- **Heading 2**: 24px/32px, 700 weight - Used for section headings
- **Heading 3**: 20px/28px, 600 weight - Used for subsection headings
- **Heading 4**: 18px/24px, 600 weight - Used for card headings
- **Subtitle 1**: 16px/24px, 600 weight - Used for emphasized body text
- **Subtitle 2**: 14px/20px, 600 weight - Used for secondary headings
- **Body 1**: 16px/24px, 400 weight - Primary body text
- **Body 2**: 14px/20px, 400 weight - Secondary body text
- **Button**: 14px/20px, 500 weight - Button text
- **Caption**: 12px/16px, 400 weight - Supporting text, labels
- **Overline**: 12px/16px, 500 weight, uppercase, 1px letter spacing - Category labels, tags

#### 3.2.3 Typography Accessibility
- Line height should be at least 1.5 times the font size for body text
- Letter spacing should be at least 0.12 times the font size for body text
- Text should be resizable up to 200% without loss of content or functionality
- Avoid using text in images for critical information

### 3.3 Spacing

#### 3.3.1 Spacing Scale
- **4px (Extra Small)**: Fine adjustments, inner padding
- **8px (Small)**: Standard spacing between related elements
- **16px (Medium)**: Standard spacing between unrelated elements
- **24px (Large)**: Section padding, spacing between groups
- **32px (Extra Large)**: Large section padding
- **48px (2x Extra Large)**: Page section spacing
- **64px (3x Extra Large)**: Major page section spacing

#### 3.3.2 Layout Spacing
- Page margins: 16px on mobile, 32px on tablet, 64px on desktop
- Grid gutters: 16px on mobile, 24px on tablet and desktop
- Section padding: 24px on mobile, 32px on tablet, 48px on desktop

#### 3.3.3 Component Spacing
- Button padding: 8px 16px (small), 12px 24px (medium), 16px 32px (large)
- Card padding: 16px
- Form field spacing: 16px between fields
- Input padding: 8px 12px

### 3.4 Elevation and Shadows

#### 3.4.1 Shadow Levels
- **Level 1**: 0px 1px 2px rgba(0, 0, 0, 0.05) - Subtle elevation (cards, buttons)
- **Level 2**: 0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06) - Medium elevation (dropdowns, popovers)
- **Level 3**: 0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05) - High elevation (modals, dialogs)
- **Level 4**: 0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04) - Highest elevation (important modals)

#### 3.4.2 Elevation Hierarchy
- Use elevation to establish hierarchy and focus
- Higher elevation indicates more importance or active state
- Maintain consistent elevation levels for similar components

### 3.5 Border Radius

#### 3.5.1 Radius Scale
- **Small**: 4px - Used for buttons, inputs, small elements
- **Medium**: 8px - Used for cards, modals, larger containers
- **Large**: 12px - Used for feature sections, large containers
- **Pill**: 9999px - Used for tags, badges, pill buttons
- **Circle**: 50% - Used for avatars, circular buttons

## 4. Components

### 4.1 Buttons

#### 4.1.1 Primary Button
- **Appearance**: Solid background using Primary color, white text
- **States**:
  - Normal: Primary color background
  - Hover: Primary Dark background
  - Active: Darker shade of Primary Dark
  - Focus: Primary color with 3px focus ring in Primary Light
  - Disabled: Gray 300 background, Gray 500 text
- **Sizes**:
  - Small: 32px height, 8px 16px padding
  - Medium: 40px height, 12px 24px padding
  - Large: 48px height, 16px 32px padding
- **Usage Guidelines**: Use for primary actions that drive user forward

#### 4.1.2 Secondary Button
- **Appearance**: Outlined button with Primary color border and text
- **States**:
  - Normal: White background, Primary color border and text
  - Hover: Primary Light background
  - Active: Darker shade of Primary Light
  - Focus: White background with 3px focus ring in Primary Light
  - Disabled: Gray 100 background, Gray 300 border and text
- **Usage Guidelines**: Use for secondary actions that don't need emphasis

#### 4.1.3 Icon Button
- **Appearance**: Icon only, with optional tooltip
- **States**: Same as Primary or Secondary buttons
- **Sizes**: 32px, 40px, or 48px square
- **Usage Guidelines**: Use when space is limited or for common actions with recognizable icons

### 4.2 Form Elements

#### 4.2.1 Text Input
- **Appearance**: White background, Gray 300 border, 1px border width
- **States**:
  - Normal: Gray 300 border
  - Focus: Primary color border, light blue focus ring
  - Filled: Gray 300 border
  - Error: Error color border, error message below
  - Disabled: Gray 100 background, Gray 300 border
- **Usage Guidelines**: Use for all text input fields

#### 4.2.2 Checkbox
- **Appearance**: Square with rounded corners
- **States**:
  - Unchecked: White background, Gray 300 border
  - Checked: Primary color background, white checkmark
  - Focus: Primary color with focus ring
  - Disabled: Gray 100 background, Gray 300 border
- **Usage Guidelines**: Use for multiple selection options

#### 4.2.3 Radio Button
- **Appearance**: Circle with smaller circle when selected
- **States**: Similar to checkbox
- **Usage Guidelines**: Use for single selection from a list of options

### 4.3 Navigation

#### 4.3.1 Navigation Bar
- **Appearance**: White background, subtle shadow
- **Behavior**: Fixed at top on scroll
- **Variants**: Desktop (full menu), Mobile (hamburger menu)
- **Usage Guidelines**: Use for main site navigation

#### 4.3.2 Tabs
- **Appearance**: Text with indicator line
- **States**:
  - Normal: Gray 700 text
  - Active: Primary color text, indicator line
  - Hover: Darker text
  - Disabled: Gray 300 text
- **Usage Guidelines**: Use for switching between related content sections

### 4.4 Containers

#### 4.4.1 Card
- **Appearance**: White background, Level 1 shadow, Medium border radius
- **Variants**: Product card, Content card, Action card
- **Usage Guidelines**: Use for containing related content or products

#### 4.4.2 Modal/Dialog
- **Appearance**: White background, Level 3 shadow, Medium border radius
- **Behavior**: Appears over content with background overlay
- **Usage Guidelines**: Use for focused tasks requiring user attention

## 5. Patterns

### 5.1 Product Listing Pattern
- Grid layout with responsive columns (1 on mobile, 2 on tablet, 4 on desktop)
- Consistent product cards with image, title, price, and action button
- Filtering and sorting options at the top

### 5.2 Checkout Flow Pattern
- Linear progress indicator showing checkout steps
- One primary action per step
- Clear summary of order information
- Validation before proceeding to next step

## 6. Accessibility Guidelines

### 6.1 Keyboard Navigation
- All interactive elements must be keyboard accessible
- Focus order should follow visual layout
- Focus states must be clearly visible
- Keyboard shortcuts for power users where appropriate

### 6.2 Screen Reader Support
- All images must have alt text
- Form fields must have associated labels
- ARIA attributes used where appropriate
- Semantic HTML structure

## 7. Implementation Notes

### 7.1 For Developers
- Use the provided design tokens as CSS variables
- Implement components as reusable modules
- Ensure responsive behavior works across all breakpoints
- Test all interactive elements for accessibility

### 7.2 For Designers
- Use the component library for consistency
- Follow the spacing system for layouts
- Adhere to the type scale for all text
- Maintain the color system for all UI elements

---

## Approval
- **UI/UX Designer**: Approved
- **User/Stakeholder**: Approved
- **Date**: 2023-05-15
