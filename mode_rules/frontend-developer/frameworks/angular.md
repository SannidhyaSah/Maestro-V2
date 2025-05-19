# Angular Framework - Frontend Developer Rules

## Overview
These rules extend the core Frontend Developer rules specifically for Angular-based projects. When implementing frontend features using Angular, you must follow these guidelines to ensure high-quality, maintainable, and performant code.

## Angular-Specific Implementation Guidelines

### 1. Component Architecture
- **Required Approach**:
  - Follow the smart/presentational component pattern
  - Implement OnPush change detection strategy for performance
  - Use standalone components when appropriate
  - Keep components focused on a single responsibility
  - Implement proper lifecycle hooks
  - Use content projection for flexible component composition
  - Implement error handling with ErrorHandler

### 2. State Management
- **Required Approach**:
  - Use services with BehaviorSubject for simple state
  - Implement NgRx for complex global state management
  - Follow the SHARI principle for state management
  - Use the async pipe for subscribing to observables
  - Implement proper subscription management
  - Use selectors for derived state
  - Consider using NgRx Component Store for local state

### 3. Performance Optimization
- **Required Techniques**:
  - Implement OnPush change detection strategy
  - Use trackBy function for ngFor directives
  - Implement lazy loading for feature modules
  - Use pure pipes for computed values
  - Optimize template expressions
  - Implement proper unsubscribe patterns
  - Use the async pipe to avoid manual subscription management

### 4. Styling Approach
- **Required Techniques**:
  - Use component-scoped styles with ViewEncapsulation
  - Implement theme-based styling with SCSS variables
  - Follow BEM or similar methodology for CSS class naming
  - Use Angular Material or custom component libraries
  - Implement responsive styles using Flex Layout or CSS Grid
  - Follow the design system specifications

### 5. Testing Strategy
- **Required Approach**:
  - Use TestBed for component testing
  - Implement isolated tests for services
  - Use spectator or testing-library/angular for simpler tests
  - Mock dependencies with jasmine spies or MockProvider
  - Test component interaction and DOM changes
  - Implement integration tests for complex flows
  - Use HttpClientTestingModule for API testing

### 6. Routing and Navigation
- **Required Approach**:
  - Implement feature-based routing modules
  - Use route guards for authentication and authorization
  - Implement lazy loading for feature modules
  - Use route resolvers for data fetching
  - Handle route parameters and query parameters
  - Implement proper navigation and route transitions
  - Handle 404 and error states

### 7. Form Handling
- **Required Approach**:
  - Use Reactive Forms for complex forms
  - Implement custom validators
  - Use form builder for form creation
  - Implement proper form state handling
  - Use form arrays for dynamic forms
  - Implement accessible form controls
  - Handle form submission states (loading, success, error)

## Angular Project Structure
For Angular projects, organize your code following this structure:

```
src/
├── app/
│   ├── core/                # Core functionality (guards, interceptors, services)
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── services/
│   ├── features/            # Feature modules
│   │   └── [feature]/
│   │       ├── components/  # Feature-specific components
│   │       ├── services/    # Feature-specific services
│   │       ├── models/      # Feature-specific models
│   │       └── [feature].module.ts
│   ├── shared/              # Shared functionality
│   │   ├── components/      # Shared components
│   │   ├── directives/      # Shared directives
│   │   ├── pipes/           # Shared pipes
│   │   └── shared.module.ts
│   └── app.module.ts        # Root module
├── assets/                  # Static assets
├── environments/            # Environment configuration
└── styles/                  # Global styles
```

## Angular Component Template
Use this template for creating new Angular components:

```typescript
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-component-name',
  templateUrl: './component-name.component.html',
  styleUrls: ['./component-name.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentNameComponent implements OnInit, OnDestroy {
  @Input() inputProp: InputType;
  @Output() outputEvent = new EventEmitter<OutputType>();

  // Private properties
  private destroy$ = new Subject<void>();

  // Public properties
  public data: DataType;

  constructor(private someService: SomeService) {}

  ngOnInit(): void {
    this.someService.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.data = data;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Public methods
  public handleEvent(): void {
    this.outputEvent.emit(someValue);
  }
}
```

## Angular Service Template
Use this template for creating services:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceNameService {
  // Private properties
  private dataSubject = new BehaviorSubject<DataType[]>([]);

  // Public observables
  public data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Public methods
  public getData(): Observable<DataType[]> {
    return this.http.get<ApiResponse>('/api/endpoint')
      .pipe(
        map(response => response.data),
        tap(data => this.dataSubject.next(data)),
        catchError(this.handleError)
      );
  }

  // Private methods
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    // Return an observable with a user-facing error message
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
```

## Angular Best Practices
When implementing Angular components, follow these best practices:

1. **Component Design**:
   - Keep components small and focused
   - Extract reusable logic to services
   - Use OnPush change detection
   - Implement proper input/output bindings
   - Use content projection for flexible components

2. **Performance**:
   - Use pure pipes for computed values
   - Implement trackBy for ngFor directives
   - Use OnPush change detection
   - Avoid complex expressions in templates
   - Implement proper unsubscribe patterns

3. **Accessibility**:
   - Use semantic HTML elements
   - Implement proper ARIA attributes
   - Ensure keyboard navigation
   - Test with screen readers
   - Follow focus management best practices

4. **State Management**:
   - Keep state as local as possible
   - Use services with BehaviorSubject for simple state
   - Implement NgRx for complex state
   - Follow immutability principles
   - Use the async pipe for subscribing to observables
