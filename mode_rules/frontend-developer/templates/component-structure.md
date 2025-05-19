# Frontend Component Structure Templates

## Overview
This document provides standardized templates for component structure across different frontend frameworks. These templates should be used as a starting point for creating new components to ensure consistency and maintainability.

## React Component Templates

### Functional Component with TypeScript
```tsx
import React, { useState, useEffect } from 'react';
import './ComponentName.css'; // or styled-components/emotion

// Types
interface ComponentNameProps {
  /** Description of the prop */
  propName: string;
  /** Description of the optional prop */
  optionalProp?: number;
  /** Callback function description */
  onAction?: (data: any) => void;
}

/**
 * ComponentName - Component description
 * 
 * Detailed description of the component's purpose and usage.
 * Include any important notes or considerations.
 */
export const ComponentName: React.FC<ComponentNameProps> = ({
  propName,
  optionalProp = 0,
  onAction,
}) => {
  // State
  const [state, setState] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Effects
  useEffect(() => {
    // Effect logic
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch data or perform side effects
        const result = await someAsyncOperation();
        setState(result);
      } catch (error) {
        console.error('Error in ComponentName:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Cleanup logic (if needed)
    };
  }, [propName]); // Dependencies

  // Event handlers
  const handleClick = () => {
    if (onAction) {
      onAction({ id: propName, value: state });
    }
  };

  // Render helpers
  const renderContent = () => {
    if (isLoading) {
      return <div className="loading">Loading...</div>;
    }
    
    return (
      <div className="content">
        {state}
        {optionalProp > 0 && <span>{optionalProp}</span>}
      </div>
    );
  };

  // Main render
  return (
    <div className="component-name">
      <h2>{propName}</h2>
      {renderContent()}
      <button onClick={handleClick}>Action</button>
    </div>
  );
};

// PropTypes (if not using TypeScript)
// ComponentName.propTypes = {
//   propName: PropTypes.string.isRequired,
//   optionalProp: PropTypes.number,
//   onAction: PropTypes.func,
// };

// Default props (alternative to default parameters)
// ComponentName.defaultProps = {
//   optionalProp: 0,
// };

export default ComponentName;
```

### React Custom Hook
```tsx
import { useState, useEffect, useCallback } from 'react';

// Types
interface UseHookNameParams {
  /** Description of the parameter */
  param: string;
  /** Description of the optional parameter */
  optionalParam?: number;
}

interface UseHookNameResult {
  /** Description of the data */
  data: any | null;
  /** Description of the loading state */
  isLoading: boolean;
  /** Description of the error state */
  error: Error | null;
  /** Description of the refresh function */
  refresh: () => void;
}

/**
 * useHookName - Hook description
 * 
 * Detailed description of the hook's purpose and usage.
 * Include any important notes or considerations.
 */
export const useHookName = ({
  param,
  optionalParam = 0,
}: UseHookNameParams): UseHookNameResult => {
  // State
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Fetch data function
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch data or perform side effects
      const result = await someAsyncOperation(param, optionalParam);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      console.error('Error in useHookName:', err);
    } finally {
      setIsLoading(false);
    }
  }, [param, optionalParam]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Return values
  return {
    data,
    isLoading,
    error,
    refresh: fetchData,
  };
};

export default useHookName;
```

## Angular Component Templates

### Angular Component with TypeScript
```typescript
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SomeService } from './some.service';

/**
 * ComponentName - Component description
 * 
 * Detailed description of the component's purpose and usage.
 * Include any important notes or considerations.
 */
@Component({
  selector: 'app-component-name',
  templateUrl: './component-name.component.html',
  styleUrls: ['./component-name.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentNameComponent implements OnInit, OnDestroy {
  /**
   * Description of the input property
   */
  @Input() inputProp: string;
  
  /**
   * Description of the optional input property
   */
  @Input() optionalInput: number = 0;
  
  /**
   * Description of the output event
   */
  @Output() actionEvent = new EventEmitter<any>();

  // Public properties
  public data: any[] = [];
  public isLoading = false;
  public error: string | null = null;

  // Private properties
  private destroy$ = new Subject<void>();

  constructor(private someService: SomeService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Public methods
  public handleAction(): void {
    this.actionEvent.emit({
      id: this.inputProp,
      value: this.optionalInput
    });
  }

  public trackByFn(index: number, item: any): number {
    return item.id;
  }

  // Private methods
  private fetchData(): void {
    this.isLoading = true;
    this.error = null;
    
    this.someService.getData(this.inputProp)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          this.data = result;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching data:', err);
          this.error = 'Failed to load data. Please try again.';
          this.isLoading = false;
        }
      });
  }
}
```

### Angular Service
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, catchError, tap, shareReplay } from 'rxjs/operators';

/**
 * ServiceName - Service description
 * 
 * Detailed description of the service's purpose and usage.
 * Include any important notes or considerations.
 */
@Injectable({
  providedIn: 'root'
})
export class ServiceNameService {
  // Private properties
  private apiUrl = 'https://api.example.com';
  private dataSubject = new BehaviorSubject<any[]>([]);
  
  // Public observables
  public data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Public methods
  /**
   * Get data from the API
   * @param id - The ID to fetch data for
   * @returns Observable of the data
   */
  public getData(id: string): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/data/${id}`)
      .pipe(
        map(response => response.data),
        tap(data => this.dataSubject.next(data)),
        catchError(this.handleError),
        shareReplay(1)
      );
  }

  /**
   * Create a new item
   * @param item - The item to create
   * @returns Observable of the created item
   */
  public createItem(item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/data`, item)
      .pipe(
        tap(newItem => {
          const currentData = this.dataSubject.value;
          this.dataSubject.next([...currentData, newItem]);
        }),
        catchError(this.handleError)
      );
  }

  // Private methods
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
```

## Vue Component Templates

### Vue 3 Component with Composition API
```vue
<template>
  <div class="component-name">
    <h2>{{ props.title }}</h2>
    
    <div v-if="isLoading" class="loading">
      Loading...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else class="content">
      <p>{{ data }}</p>
      <slot name="content"></slot>
    </div>
    
    <button @click="handleAction" :disabled="isLoading">
      {{ buttonText }}
    </button>
    
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, defineProps, defineEmits } from 'vue';
import { useDataFetching } from '@/composables/useDataFetching';

/**
 * ComponentName - Component description
 * 
 * Detailed description of the component's purpose and usage.
 * Include any important notes or considerations.
 */

// Props
const props = defineProps({
  /**
   * The title of the component
   */
  title: {
    type: String,
    required: true,
  },
  /**
   * The ID to fetch data for
   */
  dataId: {
    type: String,
    required: true,
  },
  /**
   * Optional configuration
   */
  config: {
    type: Object,
    default: () => ({}),
  },
});

// Emits
const emit = defineEmits(['action', 'dataLoaded']);

// State
const localState = ref('');
const buttonText = computed(() => isLoading.value ? 'Processing...' : 'Submit');

// Use composable for data fetching
const { 
  data, 
  isLoading, 
  error, 
  refresh 
} = useDataFetching(props.dataId);

// Watch for changes
watch(() => props.dataId, (newId) => {
  refresh();
});

// Methods
const handleAction = () => {
  emit('action', {
    id: props.dataId,
    data: data.value,
  });
};

// Lifecycle hooks
onMounted(() => {
  console.log('Component mounted');
  
  // Emit when data is loaded
  watch(data, (newData) => {
    if (newData) {
      emit('dataLoaded', newData);
    }
  });
});
</script>

<style scoped>
.component-name {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.loading {
  color: #666;
  font-style: italic;
}

.error {
  color: #f00;
  font-weight: bold;
}

.content {
  margin: 1rem 0;
}

button {
  padding: 0.5rem 1rem;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
```

### Vue 3 Composable
```typescript
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

/**
 * useComposableName - Composable description
 * 
 * Detailed description of the composable's purpose and usage.
 * Include any important notes or considerations.
 * 
 * @param {string} param - Description of the parameter
 * @param {object} options - Description of the options
 * @returns {object} - The composable's return values
 */
export function useComposableName(param: string, options = {}) {
  // State
  const data = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  
  // Computed
  const hasData = computed(() => !!data.value);
  const formattedData = computed(() => {
    if (!data.value) return null;
    return formatData(data.value);
  });
  
  // Methods
  const fetchData = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const result = await apiService.getData(param);
      data.value = result;
    } catch (err) {
      console.error('Error in useComposableName:', err);
      error.value = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      isLoading.value = false;
    }
  };
  
  const reset = () => {
    data.value = null;
    error.value = null;
  };
  
  // Helpers
  const formatData = (rawData) => {
    // Format logic
    return rawData;
  };
  
  // Lifecycle
  onMounted(() => {
    fetchData();
  });
  
  // Watch for changes
  watch(() => param, (newParam, oldParam) => {
    if (newParam !== oldParam) {
      fetchData();
    }
  });
  
  // Return
  return {
    // State
    data,
    isLoading,
    error,
    
    // Computed
    hasData,
    formattedData,
    
    // Methods
    fetchData,
    reset,
  };
}
```

## Component Documentation Template

When documenting components, use this template:

```markdown
# ComponentName

## Overview
Brief description of the component's purpose and main functionality.

## Props/Inputs

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| prop1 | string | - | Yes | Description of prop1 |
| prop2 | number | 0 | No | Description of prop2 |
| prop3 | boolean | false | No | Description of prop3 |

## Events/Outputs

| Name | Payload | Description |
|------|---------|-------------|
| event1 | { id: string, value: any } | Triggered when action occurs |
| event2 | boolean | Triggered when state changes |

## Usage Examples

### Basic Usage
```jsx
<ComponentName
  prop1="value"
  prop2={42}
  onEvent1={handleEvent}
/>
```

### Advanced Usage
```jsx
<ComponentName
  prop1="value"
  prop2={42}
  prop3={true}
  onEvent1={handleEvent}
  onEvent2={handleStateChange}
>
  <ChildComponent />
</ComponentName>
```

## Accessibility
Notes on accessibility features and considerations.

## Browser Compatibility
Any specific browser compatibility issues or considerations.

## Performance Considerations
Notes on performance optimizations or potential issues.

## Related Components
Links to related components.
```
