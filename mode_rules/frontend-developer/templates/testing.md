# Frontend Testing Templates

## Overview
This document provides standardized templates for testing frontend components and functionality across different frameworks. These templates should be used as a starting point for creating tests to ensure consistency and comprehensive test coverage.

## React Testing Templates

### React Component Unit Test with Jest and React Testing Library
```tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentName } from './ComponentName';
import { mockApiService } from '../../mocks/apiService';

// Mock dependencies
jest.mock('../../services/apiService', () => mockApiService);

describe('ComponentName', () => {
  // Test setup
  const defaultProps = {
    propName: 'test-prop',
    optionalProp: 42,
    onAction: jest.fn(),
  };

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    mockApiService.getData.mockResolvedValue({ id: '123', name: 'Test Data' });
  });

  // Test rendering
  it('renders correctly with default props', () => {
    render(<ComponentName {...defaultProps} />);
    
    // Assert component renders correctly
    expect(screen.getByText('test-prop')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument();
  });

  // Test conditional rendering
  it('renders loading state when data is being fetched', () => {
    mockApiService.getData.mockReturnValueOnce(new Promise(() => {})); // Never resolves
    
    render(<ComponentName {...defaultProps} />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  // Test user interactions
  it('calls onAction when button is clicked', async () => {
    render(<ComponentName {...defaultProps} />);
    
    // Wait for loading to complete
    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());
    
    // Simulate user interaction
    userEvent.click(screen.getByRole('button', { name: /action/i }));
    
    // Assert callback was called with expected arguments
    expect(defaultProps.onAction).toHaveBeenCalledTimes(1);
    expect(defaultProps.onAction).toHaveBeenCalledWith({
      id: 'test-prop',
      value: expect.any(String),
    });
  });

  // Test error handling
  it('displays error message when API call fails', async () => {
    // Mock API failure
    const errorMessage = 'Failed to fetch data';
    mockApiService.getData.mockRejectedValueOnce(new Error(errorMessage));
    
    render(<ComponentName {...defaultProps} />);
    
    // Wait for error to be displayed
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  // Test prop changes
  it('refetches data when propName changes', async () => {
    const { rerender } = render(<ComponentName {...defaultProps} />);
    
    // Wait for initial load
    await waitFor(() => expect(mockApiService.getData).toHaveBeenCalledTimes(1));
    
    // Change props and rerender
    rerender(<ComponentName {...defaultProps} propName="new-prop" />);
    
    // Assert data was refetched
    await waitFor(() => expect(mockApiService.getData).toHaveBeenCalledTimes(2));
    expect(mockApiService.getData).toHaveBeenLastCalledWith('new-prop');
  });
});
```

### React Custom Hook Test
```tsx
import { renderHook, act } from '@testing-library/react-hooks';
import { useHookName } from './useHookName';
import { mockApiService } from '../../mocks/apiService';

// Mock dependencies
jest.mock('../../services/apiService', () => mockApiService);

describe('useHookName', () => {
  // Test setup
  const defaultParams = {
    param: 'test-param',
    optionalParam: 42,
  };

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    mockApiService.getData.mockResolvedValue({ id: '123', name: 'Test Data' });
  });

  // Test initial state
  it('returns initial state correctly', () => {
    const { result } = renderHook(() => useHookName(defaultParams));
    
    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  // Test successful data fetching
  it('fetches data successfully', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useHookName(defaultParams));
    
    // Wait for data fetching to complete
    await waitForNextUpdate();
    
    // Assert final state
    expect(result.current.data).toEqual({ id: '123', name: 'Test Data' });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    
    // Assert API was called with correct parameters
    expect(mockApiService.getData).toHaveBeenCalledTimes(1);
    expect(mockApiService.getData).toHaveBeenCalledWith('test-param', 42);
  });

  // Test error handling
  it('handles errors correctly', async () => {
    // Mock API failure
    const errorMessage = 'Failed to fetch data';
    mockApiService.getData.mockRejectedValueOnce(new Error(errorMessage));
    
    const { result, waitForNextUpdate } = renderHook(() => useHookName(defaultParams));
    
    // Wait for error to be processed
    await waitForNextUpdate();
    
    // Assert error state
    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error.message).toBe(errorMessage);
  });

  // Test refresh functionality
  it('refreshes data when refresh function is called', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useHookName(defaultParams));
    
    // Wait for initial data fetching
    await waitForNextUpdate();
    
    // Call refresh function
    act(() => {
      result.current.refresh();
    });
    
    // Assert loading state
    expect(result.current.isLoading).toBe(true);
    
    // Wait for refresh to complete
    await waitForNextUpdate();
    
    // Assert API was called twice
    expect(mockApiService.getData).toHaveBeenCalledTimes(2);
  });

  // Test parameter changes
  it('refetches data when parameters change', async () => {
    const { result, waitForNextUpdate, rerender } = renderHook(
      (params) => useHookName(params),
      { initialProps: defaultParams }
    );
    
    // Wait for initial data fetching
    await waitForNextUpdate();
    
    // Change parameters and rerender
    rerender({ param: 'new-param', optionalParam: 100 });
    
    // Wait for refetch to complete
    await waitForNextUpdate();
    
    // Assert API was called with new parameters
    expect(mockApiService.getData).toHaveBeenCalledTimes(2);
    expect(mockApiService.getData).toHaveBeenLastCalledWith('new-param', 100);
  });
});
```

## Angular Testing Templates

### Angular Component Unit Test
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { ComponentNameComponent } from './component-name.component';
import { SomeService } from './some.service';

describe('ComponentNameComponent', () => {
  let component: ComponentNameComponent;
  let fixture: ComponentFixture<ComponentNameComponent>;
  let mockSomeService: jasmine.SpyObj<SomeService>;

  // Mock data
  const mockData = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ];

  // Setup before each test
  beforeEach(async () => {
    // Create mock service
    mockSomeService = jasmine.createSpyObj('SomeService', ['getData']);
    mockSomeService.getData.and.returnValue(of(mockData));

    await TestBed.configureTestingModule({
      declarations: [ComponentNameComponent],
      providers: [
        { provide: SomeService, useValue: mockSomeService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentNameComponent);
    component = fixture.componentInstance;
    
    // Set input properties
    component.inputProp = 'test-input';
    component.optionalInput = 42;
    
    fixture.detectChanges();
  });

  // Test component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test data loading
  it('should load data on init', () => {
    expect(mockSomeService.getData).toHaveBeenCalledWith('test-input');
    expect(component.data).toEqual(mockData);
    expect(component.isLoading).toBeFalse();
    expect(component.error).toBeNull();
  });

  // Test UI rendering
  it('should render data correctly', () => {
    const elements = fixture.debugElement.queryAll(By.css('.item'));
    expect(elements.length).toBe(2);
    expect(elements[0].nativeElement.textContent).toContain('Item 1');
    expect(elements[1].nativeElement.textContent).toContain('Item 2');
  });

  // Test user interaction
  it('should emit action event when button is clicked', () => {
    // Spy on output event
    spyOn(component.actionEvent, 'emit');
    
    // Find and click button
    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();
    
    // Assert event was emitted with correct data
    expect(component.actionEvent.emit).toHaveBeenCalledWith({
      id: 'test-input',
      value: 42
    });
  });

  // Test error handling
  it('should handle error when service fails', () => {
    // Setup service to return error
    mockSomeService.getData.and.returnValue(throwError(() => new Error('Service error')));
    
    // Reinitialize component
    component.ngOnInit();
    fixture.detectChanges();
    
    // Assert error state
    expect(component.error).toBe('Failed to load data. Please try again.');
    expect(component.isLoading).toBeFalse();
    
    // Assert error UI
    const errorElement = fixture.debugElement.query(By.css('.error-message'));
    expect(errorElement.nativeElement.textContent).toContain('Failed to load data');
  });

  // Test loading state
  it('should show loading indicator while fetching data', () => {
    // Reset component to loading state
    component.isLoading = true;
    fixture.detectChanges();
    
    // Assert loading UI
    const loadingElement = fixture.debugElement.query(By.css('.loading-indicator'));
    expect(loadingElement).toBeTruthy();
    expect(loadingElement.nativeElement.textContent).toContain('Loading');
  });
});
```

### Angular Service Unit Test
```typescript
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServiceNameService } from './service-name.service';

describe('ServiceNameService', () => {
  let service: ServiceNameService;
  let httpMock: HttpTestingController;

  // Mock data
  const mockData = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ];

  // Setup before each test
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiceNameService]
    });

    service = TestBed.inject(ServiceNameService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // Verify no outstanding requests after each test
  afterEach(() => {
    httpMock.verify();
  });

  // Test service creation
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test getData method
  it('should fetch data correctly', () => {
    const testId = 'test-id';
    const mockResponse = { data: mockData };
    
    // Subscribe to service method
    let result: any[] | undefined;
    service.getData(testId).subscribe(data => {
      result = data;
    });
    
    // Expect HTTP request
    const req = httpMock.expectOne(`https://api.example.com/data/${testId}`);
    expect(req.request.method).toBe('GET');
    
    // Respond with mock data
    req.flush(mockResponse);
    
    // Assert result
    expect(result).toEqual(mockData);
  });

  // Test error handling
  it('should handle errors correctly', () => {
    const testId = 'test-id';
    const errorMessage = 'Server error';
    
    // Subscribe to service method
    let error: any;
    service.getData(testId).subscribe({
      next: () => fail('Should have failed'),
      error: (e) => {
        error = e;
      }
    });
    
    // Expect HTTP request
    const req = httpMock.expectOne(`https://api.example.com/data/${testId}`);
    
    // Respond with error
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
    
    // Assert error
    expect(error).toBeTruthy();
    expect(error.message).toContain('Something went wrong');
  });

  // Test createItem method
  it('should create item correctly', () => {
    const newItem = { name: 'New Item' };
    const mockResponse = { id: 3, name: 'New Item' };
    
    // Subscribe to service method
    let result: any;
    service.createItem(newItem).subscribe(data => {
      result = data;
    });
    
    // Expect HTTP request
    const req = httpMock.expectOne('https://api.example.com/data');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newItem);
    
    // Respond with mock data
    req.flush(mockResponse);
    
    // Assert result
    expect(result).toEqual(mockResponse);
  });

  // Test BehaviorSubject updates
  it('should update dataSubject when getData is called', () => {
    const testId = 'test-id';
    const mockResponse = { data: mockData };
    
    // Subscribe to data$ observable
    let result: any[] | undefined;
    service.data$.subscribe(data => {
      result = data;
    });
    
    // Call getData
    service.getData(testId).subscribe();
    
    // Respond to HTTP request
    const req = httpMock.expectOne(`https://api.example.com/data/${testId}`);
    req.flush(mockResponse);
    
    // Assert dataSubject was updated
    expect(result).toEqual(mockData);
  });
});
```

## Vue Testing Templates

### Vue Component Unit Test with Vue Test Utils
```typescript
import { mount, flushPromises } from '@vue/test-utils';
import { nextTick } from 'vue';
import ComponentName from './ComponentName.vue';
import { useDataFetching } from '@/composables/useDataFetching';

// Mock composables
jest.mock('@/composables/useDataFetching', () => ({
  useDataFetching: jest.fn()
}));

describe('ComponentName.vue', () => {
  // Mock data
  const mockData = { id: '123', name: 'Test Data' };
  
  // Mock composable implementation
  const mockUseDataFetching = {
    data: ref(null),
    isLoading: ref(false),
    error: ref(null),
    refresh: jest.fn()
  };

  // Setup before each test
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Reset mock composable state
    mockUseDataFetching.data.value = null;
    mockUseDataFetching.isLoading.value = false;
    mockUseDataFetching.error.value = null;
    
    // Setup mock implementation
    (useDataFetching as jest.Mock).mockReturnValue(mockUseDataFetching);
  });

  // Test rendering
  it('renders correctly with props', async () => {
    const wrapper = mount(ComponentName, {
      props: {
        title: 'Test Title',
        dataId: 'test-id',
        config: { option: 'value' }
      }
    });
    
    // Assert props are rendered
    expect(wrapper.text()).toContain('Test Title');
    
    // Assert composable was called with correct props
    expect(useDataFetching).toHaveBeenCalledWith('test-id');
  });

  // Test loading state
  it('displays loading state', async () => {
    // Set loading state
    mockUseDataFetching.isLoading.value = true;
    
    const wrapper = mount(ComponentName, {
      props: {
        title: 'Test Title',
        dataId: 'test-id'
      }
    });
    
    // Assert loading state is displayed
    expect(wrapper.find('.loading').exists()).toBe(true);
    expect(wrapper.find('.loading').text()).toContain('Loading');
  });

  // Test data display
  it('displays data when loaded', async () => {
    // Set data
    mockUseDataFetching.data.value = mockData;
    
    const wrapper = mount(ComponentName, {
      props: {
        title: 'Test Title',
        dataId: 'test-id'
      }
    });
    
    // Assert data is displayed
    expect(wrapper.find('.content').exists()).toBe(true);
    expect(wrapper.find('.content').text()).toContain(JSON.stringify(mockData));
  });

  // Test error state
  it('displays error message', async () => {
    // Set error state
    mockUseDataFetching.error.value = 'Failed to load data';
    
    const wrapper = mount(ComponentName, {
      props: {
        title: 'Test Title',
        dataId: 'test-id'
      }
    });
    
    // Assert error is displayed
    expect(wrapper.find('.error').exists()).toBe(true);
    expect(wrapper.find('.error').text()).toContain('Failed to load data');
  });

  // Test user interaction
  it('emits action event when button is clicked', async () => {
    // Set data
    mockUseDataFetching.data.value = mockData;
    
    const wrapper = mount(ComponentName, {
      props: {
        title: 'Test Title',
        dataId: 'test-id'
      }
    });
    
    // Click button
    await wrapper.find('button').trigger('click');
    
    // Assert event was emitted with correct data
    expect(wrapper.emitted('action')).toBeTruthy();
    expect(wrapper.emitted('action')![0][0]).toEqual({
      id: 'test-id',
      data: mockData
    });
  });

  // Test prop changes
  it('refreshes data when dataId prop changes', async () => {
    const wrapper = mount(ComponentName, {
      props: {
        title: 'Test Title',
        dataId: 'test-id'
      }
    });
    
    // Change prop
    await wrapper.setProps({ dataId: 'new-id' });
    
    // Assert refresh was called
    expect(mockUseDataFetching.refresh).toHaveBeenCalled();
  });

  // Test slots
  it('renders default and named slots', async () => {
    const wrapper = mount(ComponentName, {
      props: {
        title: 'Test Title',
        dataId: 'test-id'
      },
      slots: {
        default: '<div class="default-slot">Default Slot Content</div>',
        content: '<div class="content-slot">Content Slot</div>'
      }
    });
    
    // Assert slots are rendered
    expect(wrapper.find('.default-slot').exists()).toBe(true);
    expect(wrapper.find('.default-slot').text()).toBe('Default Slot Content');
    
    // Set data to make content slot visible
    mockUseDataFetching.data.value = mockData;
    await nextTick();
    
    expect(wrapper.find('.content-slot').exists()).toBe(true);
    expect(wrapper.find('.content-slot').text()).toBe('Content Slot');
  });
});
```

## Testing Best Practices

1. **Test Structure**:
   - Follow the Arrange-Act-Assert pattern
   - Group related tests with describe blocks
   - Use clear, descriptive test names
   - Keep tests independent and isolated
   - Use beforeEach for common setup

2. **Coverage Goals**:
   - Test component rendering
   - Test user interactions
   - Test conditional rendering
   - Test error states
   - Test prop/input changes
   - Test events/outputs
   - Test edge cases

3. **Mocking**:
   - Mock external dependencies
   - Use jest.mock for module mocking
   - Create mock implementations for services
   - Reset mocks between tests
   - Mock API responses

4. **Assertions**:
   - Make specific assertions
   - Test one concept per test
   - Use appropriate matchers
   - Avoid testing implementation details
   - Focus on behavior, not implementation

5. **Async Testing**:
   - Use async/await for asynchronous tests
   - Wait for updates to complete
   - Test loading states
   - Test error handling
   - Use appropriate waiting utilities
