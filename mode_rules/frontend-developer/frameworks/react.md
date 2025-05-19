# React Framework - Frontend Developer Rules

## Overview
These rules extend the core Frontend Developer rules specifically for React-based projects. When implementing frontend features using React, you must follow these guidelines to ensure high-quality, maintainable, and performant code.

## React-Specific Implementation Guidelines

### 1. Component Architecture
- **Required Approach**:
  - Use functional components with hooks as the default approach
  - Implement custom hooks for reusable logic
  - Follow the container/presentational pattern where appropriate
  - Keep components focused on a single responsibility
  - Use React.memo() for performance optimization when appropriate
  - Implement error boundaries for graceful error handling

### 2. State Management
- **Required Approach**:
  - Use useState for simple, component-local state
  - Use useReducer for complex component state
  - Implement Context API for shared state across component trees
  - Consider Redux, Zustand, or Jotai for global application state
  - Follow immutability principles when updating state
  - Implement selectors for derived state
  - Use React Query or SWR for server state management

### 3. Performance Optimization
- **Required Techniques**:
  - Implement code splitting with React.lazy() and Suspense
  - Use React.memo() for expensive render operations
  - Optimize useEffect dependencies
  - Implement useMemo and useCallback appropriately
  - Use virtualization for long lists (react-window or react-virtualized)
  - Implement proper key usage in lists
  - Avoid unnecessary re-renders

### 4. Styling Approach
- **Required Techniques**:
  - Use CSS-in-JS libraries (styled-components, emotion) or CSS Modules
  - Implement theme-based styling
  - Follow component-scoped styling
  - Use CSS variables for dynamic theming
  - Implement responsive styles using media queries or responsive hooks
  - Follow the design system specifications

### 5. Testing Strategy
- **Required Approach**:
  - Use React Testing Library for component tests
  - Test component behavior, not implementation
  - Implement snapshot testing where appropriate
  - Mock external dependencies
  - Test user interactions and accessibility
  - Implement integration tests for complex flows
  - Use MSW for API mocking

### 6. Routing and Navigation
- **Required Approach**:
  - Use React Router or TanStack Router for routing
  - Implement route-based code splitting
  - Handle authentication in routes
  - Implement proper navigation guards
  - Use route parameters for dynamic content
  - Handle 404 and error states

### 7. Form Handling
- **Required Approach**:
  - Use React Hook Form or Formik for complex forms
  - Implement proper form validation
  - Handle form submission states (loading, success, error)
  - Implement accessible form controls
  - Use controlled components for form elements
  - Implement proper error messaging

## React Project Structure
For React projects, organize your code following this structure:

```
src/
├── assets/            # Static assets (images, fonts, etc.)
├── components/        # Reusable components
│   ├── common/        # Truly reusable across the application
│   ├── layout/        # Layout components (Header, Footer, etc.)
│   └── [feature]/     # Feature-specific components
├── hooks/             # Custom hooks
├── pages/             # Page components (route endpoints)
├── services/          # API services and external integrations
├── store/             # State management (Redux, Context, etc.)
├── styles/            # Global styles and themes
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── App.tsx            # Application entry point
```

## React Component Template
Use this template for creating new React components:

```tsx
import React from 'react';
import { useComponentLogic } from './useComponentLogic'; // If using custom hook
import './ComponentName.styles.css'; // Or styled-components/emotion

interface ComponentNameProps {
  // Define props here
  propName: PropType;
}

export const ComponentName: React.FC<ComponentNameProps> = ({ propName }) => {
  // Component logic or custom hook
  const { state, handlers } = useComponentLogic(propName);

  // Render
  return (
    <div className="component-name">
      {/* Component content */}
    </div>
  );
};

// Default props if needed
ComponentName.defaultProps = {
  propName: defaultValue,
};
```

## React Custom Hook Template
Use this template for creating custom hooks:

```tsx
import { useState, useEffect, useCallback } from 'react';

interface UseHookNameParams {
  // Define parameters here
  paramName: ParamType;
}

interface UseHookNameResult {
  // Define return values here
  stateName: StateType;
  handlerName: () => void;
}

export const useHookName = ({ paramName }: UseHookNameParams): UseHookNameResult => {
  // Hook logic
  const [stateName, setStateName] = useState<StateType>(initialState);

  // Effects
  useEffect(() => {
    // Effect logic
    return () => {
      // Cleanup
    };
  }, [paramName]);

  // Handlers
  const handlerName = useCallback(() => {
    // Handler logic
  }, [dependencies]);

  // Return values
  return {
    stateName,
    handlerName,
  };
};
```

## React Best Practices
When implementing React components, follow these best practices:

1. **Component Design**:
   - Keep components small and focused
   - Extract complex logic to custom hooks
   - Use composition over inheritance
   - Implement proper prop validation
   - Use destructuring for props and state

2. **Performance**:
   - Avoid anonymous functions in render
   - Implement proper dependency arrays in hooks
   - Use React.memo() for pure components
   - Avoid unnecessary state updates
   - Implement virtualization for long lists

3. **Accessibility**:
   - Use semantic HTML elements
   - Implement proper ARIA attributes
   - Ensure keyboard navigation
   - Test with screen readers
   - Follow focus management best practices

4. **State Management**:
   - Keep state as local as possible
   - Lift state up when needed
   - Use context for shared state
   - Follow immutability principles
   - Implement proper state initialization
