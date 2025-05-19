# Material UI Library - Frontend Developer Rules

## Overview
These rules extend the core Frontend Developer rules specifically for projects using Material UI (MUI). When implementing frontend features with Material UI, you must follow these guidelines to ensure consistent, accessible, and performant user interfaces.

## Material UI Implementation Guidelines

### 1. Component Usage
- **Required Approach**:
  - Use MUI components as the foundation for all UI elements
  - Customize components using the theme system rather than direct styling
  - Implement proper component composition following MUI patterns
  - Use the sx prop for one-off styling needs
  - Leverage the Grid system for layouts
  - Use Typography components for text elements
  - Implement proper form controls with FormControl components

### 2. Theming Strategy
- **Required Approach**:
  - Create a comprehensive theme using createTheme
  - Define primary, secondary, and error color palettes
  - Customize typography settings in the theme
  - Define spacing units in the theme
  - Create component variants through the theme
  - Use theme.palette for all color references
  - Implement dark mode support through theme switching

### 3. Styling Methodology
- **Required Techniques**:
  - Use styled components from @mui/material/styles
  - Implement the sx prop for inline styling
  - Use theme-aware styling with theme => ({ ... })
  - Follow the component override pattern for global component styling
  - Use proper spacing with theme.spacing
  - Implement responsive styling using theme breakpoints
  - Avoid direct CSS where possible

### 4. Layout Implementation
- **Required Approach**:
  - Use Container for page-level containment
  - Implement Grid for complex layouts
  - Use Stack for simple linear layouts
  - Implement Box for basic layout needs
  - Use proper spacing with theme.spacing
  - Follow responsive design patterns using breakpoints
  - Implement proper container margins and padding

### 5. Form Implementation
- **Required Approach**:
  - Use Formik or React Hook Form with MUI components
  - Implement TextField for input elements
  - Use Select and MenuItem for dropdown selections
  - Implement Checkbox, Radio, and Switch for boolean inputs
  - Use FormControl, FormLabel, and FormHelperText for proper form structure
  - Implement proper validation and error states
  - Use proper spacing and layout for form elements

### 6. Data Display
- **Required Approach**:
  - Use Table components for tabular data
  - Implement DataGrid for complex data tables
  - Use List and ListItem for list displays
  - Implement Card components for content containers
  - Use Accordion for collapsible content
  - Implement proper loading states with Skeleton
  - Use proper typography variants for content hierarchy

### 7. Navigation and Actions
- **Required Approach**:
  - Use Button components with proper variants
  - Implement AppBar and Toolbar for navigation headers
  - Use Drawer for side navigation
  - Implement Tabs for section navigation
  - Use BottomNavigation for mobile navigation
  - Implement proper icons from @mui/icons-material
  - Use Tooltip for action hints

## Material UI Component Structure
When creating custom components with Material UI, follow this structure:

```jsx
import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Button, useTheme, useMediaQuery } from '@mui/material';

// Styled components
const StyledRoot = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1),
  },
}));

// Component props interface
interface CustomComponentProps {
  title: string;
  description?: string;
  onAction?: () => void;
}

export const CustomComponent: React.FC<CustomComponentProps> = ({
  title,
  description,
  onAction,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StyledRoot>
      <Typography variant={isMobile ? 'h5' : 'h4'} component="h2" gutterBottom>
        {title}
      </Typography>
      
      {description && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
      )}
      
      {onAction && (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={onAction}
          size={isMobile ? 'small' : 'medium'}
        >
          Take Action
        </Button>
      )}
    </StyledRoot>
  );
};
```

## Material UI Theme Template
Use this template for creating a Material UI theme:

```jsx
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Define color palette
const primaryColor = {
  main: '#1976d2',
  light: '#42a5f5',
  dark: '#1565c0',
  contrastText: '#ffffff',
};

const secondaryColor = {
  main: '#9c27b0',
  light: '#ba68c8',
  dark: '#7b1fa2',
  contrastText: '#ffffff',
};

// Create base theme
let theme = createTheme({
  palette: {
    primary: primaryColor,
    secondary: secondaryColor,
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 300,
      fontSize: '6rem',
    },
    h2: {
      fontWeight: 300,
      fontSize: '3.75rem',
    },
    // Define other typography variants...
    button: {
      textTransform: 'none', // Override default uppercase
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 4,
  },
  spacing: 8, // Base spacing unit
  components: {
    // Override default component styles
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Custom button radius
        },
        containedPrimary: {
          boxShadow: '0 4px 6px rgba(25, 118, 210, 0.25)',
        },
      },
      defaultProps: {
        disableElevation: true, // Flat buttons by default
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },
    // Define other component overrides...
  },
});

// Make typography responsive
theme = responsiveFontSizes(theme);

export default theme;
```

## Material UI Best Practices
When implementing Material UI components, follow these best practices:

1. **Component Selection**:
   - Use the most specific component for each UI need
   - Prefer MUI components over custom HTML elements
   - Use composition of MUI components for complex UIs
   - Understand the props and variants of each component
   - Follow Material Design principles

2. **Performance**:
   - Use React.memo for complex MUI components
   - Avoid unnecessary re-renders
   - Use proper key props in lists
   - Implement virtualization for long lists
   - Use proper component composition to minimize renders

3. **Accessibility**:
   - Use proper ARIA attributes when needed
   - Ensure proper color contrast
   - Test keyboard navigation
   - Use proper form labels and helper text
   - Follow focus management best practices

4. **Responsive Design**:
   - Use the breakpoint system consistently
   - Implement responsive props (xs, sm, md, lg, xl)
   - Test on multiple screen sizes
   - Use proper spacing that adapts to screen size
   - Consider touch targets on mobile devices

5. **Theme Consistency**:
   - Always reference theme values for colors
   - Use theme.spacing for all spacing needs
   - Follow typography hierarchy with theme.typography
   - Create component variants through the theme
   - Maintain consistent elevation and shadows
