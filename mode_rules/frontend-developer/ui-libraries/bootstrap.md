# Bootstrap - Frontend Developer Rules

## Overview
These rules extend the core Frontend Developer rules specifically for projects using Bootstrap. When implementing frontend features with Bootstrap, you must follow these guidelines to ensure consistent, maintainable, and responsive user interfaces.

## Bootstrap Implementation Guidelines

### 1. Grid System Usage
- **Required Approach**:
  - Use Bootstrap's grid system for all layouts
  - Implement proper container usage (container, container-fluid, container-{breakpoint})
  - Use row and col classes correctly
  - Implement proper column sizing and breakpoints
  - Use proper gutters and spacing
  - Follow the 12-column system consistently
  - Implement proper nesting when needed

### 2. Component Usage
- **Required Approach**:
  - Use Bootstrap components as the foundation for UI elements
  - Customize components using Bootstrap's utility classes
  - Follow Bootstrap's component guidelines and documentation
  - Use data attributes for JavaScript functionality
  - Implement proper accessibility attributes
  - Use consistent component variants
  - Extend components rather than creating from scratch

### 3. Utility Classes
- **Required Techniques**:
  - Use Bootstrap's utility classes for spacing, colors, and typography
  - Follow the utility-first approach where appropriate
  - Use consistent spacing utilities (p-*, m-*)
  - Implement proper responsive utilities
  - Use display utilities appropriately
  - Implement flex utilities for alignment
  - Use proper text utilities

### 4. Responsive Design
- **Required Approach**:
  - Follow Bootstrap's mobile-first approach
  - Use proper breakpoint classes (sm, md, lg, xl, xxl)
  - Implement responsive navigation patterns
  - Use responsive utilities for hiding/showing elements
  - Test on multiple screen sizes
  - Use proper responsive typography
  - Implement proper responsive spacing

### 5. Form Implementation
- **Required Approach**:
  - Use Bootstrap's form classes consistently
  - Implement proper form layout (horizontal, vertical, inline)
  - Use proper input groups and form controls
  - Implement validation states and feedback
  - Use proper form labels and help text
  - Implement accessible form controls
  - Use consistent button styles

### 6. Customization
- **Required Approach**:
  - Customize Bootstrap using Sass variables
  - Override variables in a separate file
  - Use proper theming approach
  - Implement custom component styles through Sass
  - Follow Bootstrap's customization guidelines
  - Maintain Bootstrap's responsive behavior
  - Document customizations

### 7. JavaScript Integration
- **Required Approach**:
  - Use Bootstrap's JavaScript components properly
  - Initialize components correctly
  - Use data attributes for configuration
  - Implement proper event handling
  - Follow Bootstrap's JavaScript API
  - Test JavaScript functionality thoroughly
  - Consider using React-Bootstrap or similar for framework integration

## Bootstrap Component Structure
When creating components with Bootstrap, follow this structure:

```html
<!-- Basic Card Component -->
<div class="card shadow-sm mb-4">
  <!-- Card Header (Optional) -->
  <div class="card-header bg-primary text-white">
    <h5 class="card-title mb-0">Card Title</h5>
  </div>
  
  <!-- Card Image (Optional) -->
  <img src="image-url.jpg" class="card-img-top" alt="Description">
  
  <!-- Card Body -->
  <div class="card-body">
    <h5 class="card-title">Card Title</h5>
    <h6 class="card-subtitle mb-2 text-muted">Card Subtitle</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Action Button</a>
  </div>
  
  <!-- Card Footer (Optional) -->
  <div class="card-footer text-muted">
    Last updated 3 mins ago
  </div>
</div>
```

For React with Bootstrap:

```jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';

// Component props interface
interface CustomCardProps {
  title: string;
  subtitle?: string;
  text: string;
  imageUrl?: string;
  onAction?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
}

export const CustomCard: React.FC<CustomCardProps> = ({
  title,
  subtitle,
  text,
  imageUrl,
  onAction,
  variant = 'primary',
}) => {
  return (
    <Card className="shadow-sm mb-4">
      {imageUrl && (
        <Card.Img variant="top" src={imageUrl} alt="" />
      )}
      
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        
        {subtitle && (
          <Card.Subtitle className="mb-2 text-muted">
            {subtitle}
          </Card.Subtitle>
        )}
        
        <Card.Text>{text}</Card.Text>
        
        {onAction && (
          <Button 
            variant={variant} 
            onClick={onAction}
          >
            Learn More
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};
```

## Bootstrap Customization Template
Use this template for customizing Bootstrap with Sass:

```scss
// Custom.scss

// 1. Include functions first (so you can manipulate colors, SVGs, calc, etc)
@import "~bootstrap/scss/functions";

// 2. Include any default variable overrides here
$primary: #0d6efd;
$secondary: #6c757d;
$success: #198754;
$info: #0dcaf0;
$warning: #ffc107;
$danger: #dc3545;
$light: #f8f9fa;
$dark: #212529;

// Custom color
$custom-color: #ff6b6b;
$theme-colors: (
  "primary": $primary,
  "secondary": $secondary,
  "success": $success,
  "info": $info,
  "warning": $warning,
  "danger": $danger,
  "light": $light,
  "dark": $dark,
  "custom": $custom-color
);

// Typography
$font-family-sans-serif: 'Inter', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
$headings-font-weight: 600;

// Border radius
$border-radius: 0.375rem;
$border-radius-lg: 0.5rem;
$border-radius-sm: 0.25rem;

// Spacing
$spacer: 1rem;
$spacers: (
  0: 0,
  1: $spacer * 0.25,
  2: $spacer * 0.5,
  3: $spacer,
  4: $spacer * 1.5,
  5: $spacer * 3,
  6: $spacer * 4.5,
  7: $spacer * 6,
);

// 3. Include remainder of required Bootstrap stylesheets
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/variables-dark";
@import "~bootstrap/scss/maps";
@import "~bootstrap/scss/mixins";
@import "~bootstrap/scss/root";

// 4. Include any optional Bootstrap components as you like
@import "~bootstrap/scss/utilities";
@import "~bootstrap/scss/reboot";
@import "~bootstrap/scss/type";
@import "~bootstrap/scss/images";
@import "~bootstrap/scss/containers";
@import "~bootstrap/scss/grid";
@import "~bootstrap/scss/tables";
@import "~bootstrap/scss/forms";
@import "~bootstrap/scss/buttons";
@import "~bootstrap/scss/transitions";
@import "~bootstrap/scss/dropdown";
@import "~bootstrap/scss/button-group";
@import "~bootstrap/scss/nav";
@import "~bootstrap/scss/navbar";
@import "~bootstrap/scss/card";
@import "~bootstrap/scss/accordion";
@import "~bootstrap/scss/breadcrumb";
@import "~bootstrap/scss/pagination";
@import "~bootstrap/scss/badge";
@import "~bootstrap/scss/alert";
@import "~bootstrap/scss/progress";
@import "~bootstrap/scss/list-group";
@import "~bootstrap/scss/close";
@import "~bootstrap/scss/toasts";
@import "~bootstrap/scss/modal";
@import "~bootstrap/scss/tooltip";
@import "~bootstrap/scss/popover";
@import "~bootstrap/scss/carousel";
@import "~bootstrap/scss/spinners";
@import "~bootstrap/scss/offcanvas";
@import "~bootstrap/scss/placeholders";
@import "~bootstrap/scss/helpers";
@import "~bootstrap/scss/utilities/api";

// 5. Add additional custom code here
.custom-card {
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-5px);
  }
}

// Custom button styles
.btn-custom {
  @include button-variant($custom-color, $custom-color);
}
```

## Bootstrap Best Practices
When implementing Bootstrap, follow these best practices:

1. **Grid System**:
   - Use the grid system consistently
   - Understand breakpoints and responsive behavior
   - Use appropriate container types
   - Avoid mixing Bootstrap grid with custom layout systems
   - Use proper nesting when needed

2. **Component Usage**:
   - Use Bootstrap components as intended
   - Read the documentation for each component
   - Understand component options and variants
   - Use data attributes for JavaScript functionality
   - Extend components rather than creating from scratch

3. **Responsive Design**:
   - Follow mobile-first approach
   - Test on multiple screen sizes
   - Use responsive utilities appropriately
   - Understand how components behave at different breakpoints
   - Use responsive typography

4. **Accessibility**:
   - Follow Bootstrap's accessibility guidelines
   - Use proper ARIA attributes
   - Test keyboard navigation
   - Ensure proper color contrast
   - Use proper form labels and help text

5. **Customization**:
   - Use Sass variables for customization
   - Avoid overriding Bootstrap's CSS directly
   - Document customizations
   - Maintain Bootstrap's responsive behavior
   - Use the theming system properly
