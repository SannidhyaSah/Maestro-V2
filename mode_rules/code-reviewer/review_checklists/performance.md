# Performance Review Checklist

## Overview
This checklist provides a framework for evaluating the performance aspects of code. It focuses on identifying potential performance bottlenecks, inefficient algorithms, and resource usage issues that could impact application performance.

## Algorithmic Efficiency

### 1. Time Complexity
- [ ] Algorithms have appropriate time complexity for their use case
- [ ] Nested loops are minimized or optimized
- [ ] Recursive functions have proper termination conditions
- [ ] Expensive operations are not performed unnecessarily
- [ ] Caching is used for expensive computations when appropriate
- [ ] Algorithms scale well with input size
- [ ] Time complexity is documented for critical algorithms
- [ ] Alternative algorithms with better time complexity are considered

### 2. Space Complexity
- [ ] Memory usage is appropriate for the task
- [ ] Unnecessary object creation is avoided
- [ ] Large data structures are used efficiently
- [ ] Memory leaks are prevented
- [ ] Temporary objects are minimized
- [ ] Space-time tradeoffs are considered
- [ ] Large allocations are avoided in performance-critical paths
- [ ] Memory usage patterns are documented for critical components

### 3. Data Structures
- [ ] Appropriate data structures are used for operations
- [ ] Data structure operations match access patterns (e.g., lookup, insertion, deletion)
- [ ] Collections are sized appropriately when possible
- [ ] Specialized data structures are used when beneficial
- [ ] Data structure iteration is efficient
- [ ] Immutable data structures are used appropriately
- [ ] Thread-safe collections are used in concurrent contexts
- [ ] Custom data structures are justified and well-implemented

## Resource Usage

### 1. CPU Usage
- [ ] CPU-intensive operations are optimized
- [ ] Work is distributed across multiple cores when appropriate
- [ ] Busy waiting is avoided
- [ ] Computations are batched when possible
- [ ] Background processing is used for non-urgent tasks
- [ ] CPU profiling has been performed for critical paths
- [ ] Hot code paths are identified and optimized
- [ ] CPU usage is monitored and has acceptable limits

### 2. Memory Usage
- [ ] Memory usage is monitored and controlled
- [ ] Large objects are properly managed
- [ ] Memory pools or object reuse is considered for frequent allocations
- [ ] Memory fragmentation is minimized
- [ ] Off-heap memory is used when appropriate
- [ ] Memory is released promptly when no longer needed
- [ ] Memory usage patterns are understood and documented
- [ ] Memory profiling has been performed

### 3. I/O Operations
- [ ] I/O operations are minimized
- [ ] Asynchronous I/O is used when appropriate
- [ ] Buffering is used effectively
- [ ] File operations are optimized
- [ ] Network calls are batched when possible
- [ ] Connection pooling is used
- [ ] I/O resources are properly closed
- [ ] Timeouts are set for I/O operations

## Database Interactions

### 1. Query Optimization
- [ ] Queries are optimized and efficient
- [ ] Proper indexes are used
- [ ] Complex joins are minimized or optimized
- [ ] Query execution plans have been analyzed
- [ ] N+1 query problems are avoided
- [ ] Pagination is used for large result sets
- [ ] Unnecessary columns are not selected
- [ ] Query performance has been measured

### 2. Database Connection Management
- [ ] Connection pooling is used
- [ ] Connections are properly closed
- [ ] Transaction scope is appropriate
- [ ] Long-running transactions are avoided
- [ ] Connection leaks are prevented
- [ ] Database load is distributed appropriately
- [ ] Read/write splitting is used when beneficial
- [ ] Connection timeout and retry strategies are in place

### 3. Data Access Patterns
- [ ] Caching is used appropriately
- [ ] Batch operations are used when possible
- [ ] Data is pre-fetched when appropriate
- [ ] Lazy loading is used when appropriate
- [ ] Data access is optimized for access patterns
- [ ] Denormalization is used when beneficial
- [ ] Read/write patterns are optimized
- [ ] Data locality is considered

## Frontend Performance

### 1. Rendering Optimization
- [ ] DOM manipulations are minimized
- [ ] Layout thrashing is avoided
- [ ] Reflows and repaints are minimized
- [ ] CSS animations use transform and opacity
- [ ] Heavy computations are moved off the main thread
- [ ] Virtual DOM or efficient rendering strategies are used
- [ ] Critical rendering path is optimized
- [ ] Rendering performance has been measured

### 2. Asset Optimization
- [ ] Images are properly sized and compressed
- [ ] CSS and JavaScript are minified
- [ ] Assets are bundled appropriately
- [ ] Code splitting is used for large applications
- [ ] Tree shaking is used to eliminate dead code
- [ ] Assets are cached effectively
- [ ] Lazy loading is used for non-critical assets
- [ ] Asset loading is prioritized for critical content

### 3. Network Optimization
- [ ] Number of HTTP requests is minimized
- [ ] Compression is used for responses
- [ ] CDN is used for static assets
- [ ] Resources are preloaded when appropriate
- [ ] HTTP/2 or HTTP/3 features are leveraged
- [ ] API responses are optimized for size
- [ ] Caching headers are properly set
- [ ] Network performance has been measured

## Concurrency and Parallelism

### 1. Thread Management
- [ ] Thread pools are sized appropriately
- [ ] Thread contention is minimized
- [ ] Thread safety is ensured for shared resources
- [ ] Deadlocks are prevented
- [ ] Thread priorities are set appropriately
- [ ] Thread local storage is used when beneficial
- [ ] Thread creation is minimized in hot paths
- [ ] Thread usage patterns are documented

### 2. Asynchronous Programming
- [ ] Asynchronous APIs are used for I/O operations
- [ ] Promises or async/await patterns are used effectively
- [ ] Callback hell is avoided
- [ ] Error handling is comprehensive in async code
- [ ] Cancellation is supported for long-running operations
- [ ] Progress reporting is implemented for long operations
- [ ] Async operations are properly coordinated
- [ ] Resource cleanup is ensured in async contexts

### 3. Parallelization
- [ ] Work is parallelized when appropriate
- [ ] Data parallelism is exploited when possible
- [ ] Task granularity is appropriate
- [ ] Load balancing is considered
- [ ] Synchronization overhead is minimized
- [ ] False sharing is avoided
- [ ] Parallel algorithms are correctly implemented
- [ ] Parallelization benefits are measured

## Caching and Memoization

### 1. Caching Strategy
- [ ] Caching is used for expensive operations
- [ ] Cache invalidation strategy is appropriate
- [ ] Cache size is controlled
- [ ] Cache hit rate is monitored
- [ ] Distributed caching is used when appropriate
- [ ] Cache warming is implemented when beneficial
- [ ] Cache entries have appropriate TTL
- [ ] Cache coherence is maintained

### 2. Memoization
- [ ] Pure functions are memoized when beneficial
- [ ] Memoization cache size is controlled
- [ ] Memoization key strategy is efficient
- [ ] Memoization is cleared when appropriate
- [ ] Complex calculations are memoized
- [ ] Recursive functions use memoization when appropriate
- [ ] Memoization overhead is justified by savings
- [ ] Memoization strategy is documented

## Performance Testing and Monitoring

### 1. Benchmarking
- [ ] Critical code paths are benchmarked
- [ ] Benchmarks are reproducible
- [ ] Benchmark methodology is sound
- [ ] Benchmarks cover realistic scenarios
- [ ] Performance is compared against requirements
- [ ] Benchmarks are automated when possible
- [ ] Benchmark results are documented
- [ ] Performance regression testing is in place

### 2. Profiling
- [ ] Code has been profiled to identify bottlenecks
- [ ] CPU profiling has been performed
- [ ] Memory profiling has been performed
- [ ] I/O profiling has been performed
- [ ] Database query profiling has been performed
- [ ] Profiling results are analyzed and acted upon
- [ ] Profiling is performed in production-like environments
- [ ] Continuous profiling is considered for critical systems

### 3. Monitoring
- [ ] Performance metrics are collected
- [ ] Alerts are set for performance degradation
- [ ] Resource usage is monitored
- [ ] User-perceived performance is measured
- [ ] Performance trends are analyzed
- [ ] Performance data is used to guide optimization
- [ ] Monitoring has minimal performance impact
- [ ] Key performance indicators are defined and tracked

## Conclusion
This checklist provides a comprehensive framework for evaluating code performance. Not all items will apply to every codebase or review, and the importance of each item may vary based on project context and performance requirements. Use this as a starting point and adapt it to your specific needs.
