# Frontend State Management - Best Practices

## Overview
This document outlines best practices for implementing state management across different frontend frameworks and libraries. These guidelines should be followed to ensure maintainable, predictable, and efficient state management in frontend applications.

## Core State Management Principles

### 1. State Organization
- **Required Techniques**:
  - Separate local component state from global application state
  - Organize state by domain or feature
  - Keep state normalized to avoid duplication
  - Define clear state interfaces and types
  - Document state structure
  - Implement proper state initialization
  - Consider state persistence needs

### 2. State Access Patterns
- **Required Techniques**:
  - Implement proper encapsulation of state
  - Use selectors for derived state
  - Avoid direct state mutation
  - Implement proper state sharing between components
  - Use appropriate state access patterns for the framework
  - Consider performance implications of state access
  - Document state access patterns

### 3. State Updates
- **Required Techniques**:
  - Follow immutability principles
  - Implement proper action patterns
  - Use appropriate state update mechanisms
  - Avoid unnecessary state updates
  - Implement optimistic updates where appropriate
  - Consider side effects in state updates
  - Document state update patterns

### 4. Asynchronous State
- **Required Techniques**:
  - Implement proper loading states
  - Handle errors in asynchronous operations
  - Use appropriate patterns for async data fetching
  - Implement proper caching strategies
  - Consider request cancellation
  - Document async state patterns
  - Implement proper retry mechanisms

### 5. Form State
- **Required Techniques**:
  - Use appropriate form state management libraries
  - Implement proper validation
  - Handle form submission states
  - Implement proper error handling
  - Consider form state persistence
  - Document form state management
  - Implement proper form reset mechanisms

### 6. Performance Considerations
- **Required Techniques**:
  - Avoid unnecessary re-renders
  - Implement proper memoization
  - Consider state granularity
  - Use appropriate performance optimization techniques
  - Implement proper subscription patterns
  - Document performance considerations
  - Test state management performance

### 7. Testing State
- **Required Techniques**:
  - Test state reducers and selectors
  - Implement proper state mocking
  - Test asynchronous state operations
  - Consider state snapshots for testing
  - Document state testing strategies
  - Implement proper test coverage
  - Test edge cases in state management

## Framework-Specific State Management

### React State Management
- **Local State**:
  - Use useState for simple component state
  - Implement useReducer for complex component state
  - Consider custom hooks for reusable state logic
  - Use proper dependency arrays in hooks
  - Implement proper state initialization
  - Consider component composition for state sharing
  - Document state management approach

- **Global State**:
  - Use Context API for shared state across component trees
  - Consider Redux for complex global state
  - Implement proper selectors and memoization
  - Use middleware for side effects
  - Consider modern alternatives (Zustand, Jotai, Recoil)
  - Document global state architecture
  - Test global state management

- **Server State**:
  - Use React Query or SWR for server state
  - Implement proper caching strategies
  - Handle loading and error states
  - Consider optimistic updates
  - Implement proper refetching strategies
  - Document server state management
  - Test server state operations

### Angular State Management
- **Local State**:
  - Use component properties for simple state
  - Implement OnPush change detection
  - Consider RxJS for reactive state
  - Use proper subscription management
  - Implement proper state initialization
  - Consider component composition for state sharing
  - Document state management approach

- **Global State**:
  - Use services with BehaviorSubject for simple state
  - Consider NgRx for complex global state
  - Implement proper selectors and effects
  - Use the async pipe for subscribing to observables
  - Consider NgRx Component Store for local state
  - Document global state architecture
  - Test global state management

- **Server State**:
  - Use Angular's HttpClient with proper caching
  - Implement loading and error states
  - Consider optimistic updates
  - Use interceptors for common operations
  - Implement proper retry mechanisms
  - Document server state management
  - Test server state operations

### Vue State Management
- **Local State**:
  - Use reactive refs and computed for component state
  - Implement watchers for side effects
  - Consider composables for reusable state logic
  - Use proper dependency tracking
  - Implement proper state initialization
  - Consider component composition for state sharing
  - Document state management approach

- **Global State**:
  - Use Pinia (Vue 3) or Vuex (Vue 2) for global state
  - Implement proper getters and actions
  - Use modules for organizing state
  - Consider composition API for state management
  - Implement proper reactivity
  - Document global state architecture
  - Test global state management

- **Server State**:
  - Use VueQuery or similar for server state
  - Implement proper caching strategies
  - Handle loading and error states
  - Consider optimistic updates
  - Implement proper refetching strategies
  - Document server state management
  - Test server state operations

## State Management Patterns

### Flux Pattern
- Unidirectional data flow
- Actions -> Dispatcher -> Store -> View
- Immutable state updates
- Clear separation of concerns
- Predictable state changes
- Used in Redux and similar libraries
- Good for complex applications

### Observable Pattern
- Stream-based state management
- Reactive programming model
- Subscription-based updates
- Good for real-time applications
- Used in RxJS-based state management
- Supports complex transformations
- Requires proper subscription management

### Atomic State Pattern
- State split into small, atomic pieces
- Fine-grained reactivity
- Minimal re-renders
- Used in Recoil, Jotai, and similar libraries
- Good for performance-critical applications
- Supports derived state
- Requires proper atom design

### Context-Based Pattern
- Component tree-based state sharing
- Provider/Consumer model
- Good for medium-complexity applications
- Used in React Context API
- Supports multiple contexts
- Can lead to performance issues if overused
- Requires proper context design

## State Management Implementation Examples

### React with Redux Toolkit
```jsx
// Store setup
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Slice definition
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  value: 0,
  status: 'idle',
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;

// Component usage
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { increment, decrement } from './counterSlice';

export const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};
```

### Angular with NgRx
```typescript
// State interface
export interface CounterState {
  count: number;
  status: 'idle' | 'loading' | 'error';
}

// Actions
import { createAction, props } from '@ngrx/store';

export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
export const incrementByAmount = createAction(
  '[Counter] Increment By Amount',
  props<{ amount: number }>()
);

// Reducer
import { createReducer, on } from '@ngrx/store';
import * as CounterActions from './counter.actions';

export const initialState: CounterState = {
  count: 0,
  status: 'idle',
};

export const counterReducer = createReducer(
  initialState,
  on(CounterActions.increment, (state) => ({
    ...state,
    count: state.count + 1,
  })),
  on(CounterActions.decrement, (state) => ({
    ...state,
    count: state.count - 1,
  })),
  on(CounterActions.incrementByAmount, (state, { amount }) => ({
    ...state,
    count: state.count + amount,
  }))
);

// Selectors
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectCounterState = createFeatureSelector<CounterState>('counter');

export const selectCount = createSelector(
  selectCounterState,
  (state) => state.count
);

export const selectStatus = createSelector(
  selectCounterState,
  (state) => state.status
);

// Component usage
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CounterActions from './counter.actions';
import * as CounterSelectors from './counter.selectors';

@Component({
  selector: 'app-counter',
  template: `
    <div>
      <div>{{ count$ | async }}</div>
      <button (click)="increment()">Increment</button>
      <button (click)="decrement()">Decrement</button>
    </div>
  `,
})
export class CounterComponent {
  count$: Observable<number>;

  constructor(private store: Store) {
    this.count$ = this.store.select(CounterSelectors.selectCount);
  }

  increment() {
    this.store.dispatch(CounterActions.increment());
  }

  decrement() {
    this.store.dispatch(CounterActions.decrement());
  }
}
```

### Vue with Pinia
```typescript
// Store definition
import { defineStore } from 'pinia';

interface CounterState {
  count: number;
  status: 'idle' | 'loading' | 'error';
}

export const useCounterStore = defineStore('counter', {
  state: (): CounterState => ({
    count: 0,
    status: 'idle',
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
    isLoading: (state) => state.status === 'loading',
  },
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
    incrementByAmount(amount: number) {
      this.count += amount;
    },
    async fetchCount() {
      this.status = 'loading';
      try {
        const response = await fetch('/api/counter');
        const data = await response.json();
        this.count = data.count;
        this.status = 'idle';
      } catch (error) {
        this.status = 'error';
      }
    },
  },
});

// Component usage (Options API)
<template>
  <div>
    <div>{{ count }}</div>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>

<script>
import { useCounterStore } from './stores/counter';
import { mapState, mapActions } from 'pinia';

export default {
  computed: {
    ...mapState(useCounterStore, ['count', 'doubleCount']),
  },
  methods: {
    ...mapActions(useCounterStore, ['increment', 'decrement']),
  },
};
</script>

// Component usage (Composition API)
<template>
  <div>
    <div>{{ counter.count }}</div>
    <button @click="counter.increment">Increment</button>
    <button @click="counter.decrement">Decrement</button>
  </div>
</template>

<script setup>
import { useCounterStore } from './stores/counter';

const counter = useCounterStore();
</script>
```
