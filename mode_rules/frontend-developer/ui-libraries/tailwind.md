# Tailwind CSS - Frontend Developer Rules

## Overview
These rules extend the core Frontend Developer rules specifically for projects using Tailwind CSS. When implementing frontend features with Tailwind CSS, you must follow these guidelines to ensure consistent, maintainable, and performant user interfaces.

## Tailwind CSS Implementation Guidelines

### 1. Utility-First Approach
- **Required Approach**:
  - Use Tailwind's utility classes as the primary styling method
  - Avoid custom CSS except when absolutely necessary
  - Implement component composition with utility classes
  - Use @apply in CSS files only for frequently repeated patterns
  - Follow the utility-first workflow
  - Understand and use Tailwind's responsive prefixes
  - Leverage Tailwind's state variants (hover, focus, etc.)

### 2. Design System Integration
- **Required Approach**:
  - Customize Tailwind's theme in tailwind.config.js to match design system
  - Define custom colors, spacing, typography, and other design tokens
  - Use design system values consistently across components
  - Create custom plugins for complex, repeated patterns
  - Extend Tailwind's default theme rather than replacing it
  - Document custom theme extensions
  - Maintain consistency with design specifications

### 3. Component Patterns
- **Required Techniques**:
  - Create reusable component patterns with consistent class usage
  - Use consistent spacing and sizing utilities
  - Implement proper responsive patterns
  - Create component libraries with documented class patterns
  - Use consistent naming for component variants
  - Document component class patterns
  - Implement proper accessibility attributes

### 4. Layout Implementation
- **Required Approach**:
  - Use Flexbox utilities (flex, items-center, etc.) for simple layouts
  - Implement Grid utilities (grid, grid-cols-*) for complex layouts
  - Use proper spacing utilities (p-*, m-*, gap-*)
  - Implement consistent container patterns
  - Use proper responsive utilities
  - Follow mobile-first responsive design
  - Implement proper z-index management

### 5. Typography
- **Required Approach**:
  - Use Tailwind's typography utilities consistently
  - Implement proper font sizes, weights, and line heights
  - Use proper text colors from the theme
  - Implement consistent heading patterns
  - Use proper text alignment and overflow utilities
  - Implement proper responsive typography
  - Consider using @tailwindcss/typography plugin for rich text

### 6. Form Elements
- **Required Approach**:
  - Create consistent form element styles
  - Implement proper focus states
  - Use proper sizing and spacing for form elements
  - Create accessible form controls
  - Implement proper validation states
  - Use consistent button styles
  - Consider using form libraries with Tailwind integration

### 7. Dark Mode
- **Required Approach**:
  - Implement dark mode using Tailwind's dark: variant
  - Use proper color contrasts in both light and dark modes
  - Test dark mode thoroughly
  - Consider user preferences with prefers-color-scheme
  - Allow user toggle between modes
  - Ensure proper accessibility in both modes
  - Document dark mode implementation

## Tailwind Component Structure
When creating components with Tailwind CSS, follow this structure:

```jsx
import React from 'react';

// Component props interface
interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  onAction?: () => void;
  variant?: 'primary' | 'secondary';
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  onAction,
  variant = 'primary',
}) => {
  // Determine variant classes
  const variantClasses = {
    primary: 'bg-white border border-gray-200',
    secondary: 'bg-gray-50 border border-gray-300',
  };

  return (
    <div className={`rounded-lg shadow-md overflow-hidden ${variantClasses[variant]}`}>
      {imageUrl && (
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {title}
        </h3>
        
        {description && (
          <p className="text-gray-600 mb-4">
            {description}
          </p>
        )}
        
        {onAction && (
          <button 
            onClick={onAction}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
          >
            Learn More
          </button>
        )}
      </div>
    </div>
  );
};
```

## Tailwind Configuration Template
Use this template for configuring Tailwind CSS:

```js
// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  darkMode: 'class', // or 'media' for prefers-color-scheme
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          // Define secondary color palette
        },
        // Add other custom colors
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        // Add other custom fonts
      },
      spacing: {
        // Add custom spacing if needed
      },
      borderRadius: {
        // Add custom border radius values
      },
      boxShadow: {
        // Add custom shadows
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            a: {
              color: theme('colors.primary.600'),
              '&:hover': {
                color: theme('colors.primary.700'),
              },
            },
            // Customize other typography elements
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    // Add custom plugins
  ],
};
```

## Tailwind CSS Best Practices
When implementing Tailwind CSS, follow these best practices:

1. **Class Organization**:
   - Group related utilities together (layout, typography, colors, etc.)
   - Order utilities from most to least important
   - Use consistent ordering across components
   - Consider using Prettier with Tailwind plugin for consistent formatting
   - Use comments to separate logical sections in complex components

2. **Responsive Design**:
   - Follow mobile-first approach
   - Use responsive prefixes consistently
   - Test on multiple screen sizes
   - Use consistent breakpoints
   - Consider extracting repeated responsive patterns

3. **Performance**:
   - Use PurgeCSS (built into Tailwind v2+) to remove unused styles
   - Avoid excessive class variations
   - Consider extracting very common patterns to CSS
   - Use @apply for frequently repeated patterns
   - Optimize for production builds

4. **Accessibility**:
   - Ensure proper color contrast
   - Use proper semantic HTML
   - Add appropriate ARIA attributes
   - Test keyboard navigation
   - Implement proper focus states

5. **Maintainability**:
   - Document component class patterns
   - Create a component library with consistent patterns
   - Use consistent naming conventions
   - Extract complex utility combinations into components
   - Consider using Tailwind's JIT mode for development
