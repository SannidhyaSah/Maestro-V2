# Vue Framework - Frontend Developer Rules

## Overview
These rules extend the core Frontend Developer rules specifically for Vue-based projects. When implementing frontend features using Vue, you must follow these guidelines to ensure high-quality, maintainable, and performant code.

## Vue-Specific Implementation Guidelines

### 1. Component Architecture
- **Required Approach**:
  - Use the Composition API as the default approach for Vue 3
  - Use the Options API only when maintaining Vue 2 projects
  - Implement single-file components (SFCs)
  - Keep components focused on a single responsibility
  - Use slots for flexible component composition
  - Implement proper prop validation
  - Use provide/inject for deep component communication

### 2. State Management
- **Required Approach**:
  - Use reactive refs and computed for component-local state
  - Implement Pinia (Vue 3) or Vuex (Vue 2) for global state
  - Follow the modules pattern for organizing store
  - Use composables for reusable stateful logic
  - Implement proper reactivity
  - Use watchers judiciously
  - Consider VueQuery or similar for server state

### 3. Performance Optimization
- **Required Techniques**:
  - Implement proper key usage in v-for directives
  - Use shallowRef when appropriate
  - Implement dynamic imports for code splitting
  - Use keep-alive for caching components
  - Optimize computed properties
  - Implement proper dependency tracking
  - Use virtual scrolling for long lists

### 4. Styling Approach
- **Required Techniques**:
  - Use scoped styles in single-file components
  - Implement CSS variables for theming
  - Use preprocessors (SCSS, Less) for complex styling
  - Follow BEM or similar methodology for CSS class naming
  - Implement responsive styles
  - Use Vue's class and style bindings for dynamic styling
  - Follow the design system specifications

### 5. Testing Strategy
- **Required Approach**:
  - Use Vue Test Utils for component testing
  - Implement Vitest or Jest for unit testing
  - Use component testing library for user-centric tests
  - Mock external dependencies
  - Test component behavior and rendering
  - Implement snapshot testing where appropriate
  - Use Cypress or similar for E2E testing

### 6. Routing and Navigation
- **Required Approach**:
  - Use Vue Router for routing
  - Implement route guards for authentication
  - Use route meta fields for route metadata
  - Implement nested routes where appropriate
  - Use route parameters for dynamic content
  - Implement proper navigation and transitions
  - Handle 404 and error states

### 7. Form Handling
- **Required Approach**:
  - Use v-model for simple forms
  - Implement VeeValidate or similar for complex forms
  - Use custom form components
  - Implement proper form validation
  - Handle form submission states
  - Implement accessible form controls
  - Use composition functions for form logic

## Vue Project Structure
For Vue projects, organize your code following this structure:

```
src/
├── assets/            # Static assets
├── components/        # Reusable components
│   ├── common/        # Truly reusable across the application
│   ├── layout/        # Layout components
│   └── [feature]/     # Feature-specific components
├── composables/       # Composition functions
├── router/            # Vue Router configuration
├── store/             # Pinia/Vuex store
│   └── modules/       # Store modules
├── views/             # Page components (route endpoints)
├── services/          # API services
├── utils/             # Utility functions
└── App.vue            # Root component
```

## Vue Component Template (Composition API)
Use this template for creating new Vue components with Composition API:

```vue
<template>
  <div class="component-name">
    <!-- Component template -->
    <slot name="header"></slot>
    <div v-if="isLoading">Loading...</div>
    <div v-else>{{ formattedData }}</div>
    <button @click="handleClick">{{ buttonText }}</button>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, defineProps, defineEmits } from 'vue';
import { useComponentLogic } from '@/composables/useComponentLogic';

// Props
const props = defineProps({
  propName: {
    type: String,
    required: true,
    validator: (value) => value.length > 0
  },
  optionalProp: {
    type: Number,
    default: 0
  }
});

// Emits
const emit = defineEmits(['update', 'action']);

// State
const isLoading = ref(false);
const localData = ref(null);

// Composables
const { data, actions } = useComponentLogic(props.propName);

// Computed
const formattedData = computed(() => {
  return localData.value ? `Formatted: ${localData.value}` : '';
});

const buttonText = computed(() => {
  return isLoading.value ? 'Processing...' : 'Submit';
});

// Watchers
watch(() => props.propName, (newValue) => {
  console.log('Prop changed:', newValue);
  fetchData();
});

// Methods
const fetchData = async () => {
  isLoading.value = true;
  try {
    localData.value = await someAsyncOperation();
    emit('update', localData.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.value = false;
  }
};

const handleClick = () => {
  actions.doSomething();
  emit('action', { id: props.propName });
};

// Lifecycle
onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.component-name {
  /* Component styles */
}
</style>
```

## Vue Composable Template
Use this template for creating composables:

```js
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

export function useComposableName(param) {
  // State
  const state = ref(null);
  const isLoading = ref(false);
  const error = ref(null);

  // Computed
  const computedValue = computed(() => {
    return state.value ? transformData(state.value) : null;
  });

  // Methods
  const fetchData = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const result = await apiService.getData(param);
      state.value = result;
    } catch (err) {
      error.value = err.message;
      console.error('Error in useComposableName:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const updateData = (newData) => {
    // Update logic
  };

  // Watchers
  watch(() => param, () => {
    fetchData();
  });

  // Lifecycle
  onMounted(() => {
    fetchData();
  });

  onUnmounted(() => {
    // Cleanup if needed
  });

  // Return
  return {
    // State
    state,
    isLoading,
    error,
    
    // Computed
    computedValue,
    
    // Methods
    fetchData,
    updateData
  };
}
```

## Vue Best Practices
When implementing Vue components, follow these best practices:

1. **Component Design**:
   - Keep components small and focused
   - Use props for component configuration
   - Emit events for parent communication
   - Use slots for flexible content
   - Implement proper prop validation

2. **Performance**:
   - Use proper keys in v-for
   - Avoid expensive operations in computed properties
   - Use shallowRef for large objects when appropriate
   - Implement proper dependency tracking
   - Use keep-alive for frequently toggled components

3. **Accessibility**:
   - Use semantic HTML elements
   - Implement proper ARIA attributes
   - Ensure keyboard navigation
   - Test with screen readers
   - Follow focus management best practices

4. **State Management**:
   - Keep state as local as possible
   - Use composables for reusable logic
   - Implement Pinia/Vuex for global state
   - Follow immutability principles
   - Use watchers judiciously
