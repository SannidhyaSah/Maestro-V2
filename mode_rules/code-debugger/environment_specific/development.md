# Development Environment Debugging Guide

## Overview
This document provides specialized guidance for debugging applications in development environments, where you have full access to the code, can make changes freely, and can use a wide range of debugging tools and techniques.

## Development Environment Setup for Effective Debugging

### 1. IDE Configuration

#### Visual Studio Code
- Install debugging extensions for your languages
- Configure launch.json for different debugging scenarios
- Set up task.json for build tasks
- Configure problem matchers for error detection
- Install linting and static analysis extensions

Example launch.json for Node.js:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/index.js",
      "env": {
        "NODE_ENV": "development",
        "DEBUG": "app:*"
      }
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Run Current Test",
      "program": "${workspaceFolder}/node_modules/mocha/bin/_mocha",
      "args": ["${file}"],
      "internalConsoleOptions": "openOnSessionStart"
    }
  ]
}
```

#### JetBrains IDEs (IntelliJ, WebStorm, PyCharm)
- Configure run/debug configurations
- Set up breakpoint behaviors
- Configure exception breakpoints
- Enable memory view for heap analysis
- Configure watches and evaluations

#### Eclipse
- Set up debug perspectives
- Configure breakpoint properties
- Set up expression evaluation
- Configure step filters
- Set up remote debugging

### 2. Browser DevTools Configuration

- Enable source maps for JavaScript debugging
- Configure workspace mapping for direct editing
- Set up persistent logging
- Configure network throttling for testing
- Enable JavaScript profiling

### 3. Local Environment Variables

- Set DEBUG flags for verbose logging
- Configure environment-specific settings
- Set up mock services for external dependencies
- Configure feature flags for testing
- Set lower timeouts for faster failure detection

Example .env file:
```
# Development environment settings
NODE_ENV=development
LOG_LEVEL=debug
ENABLE_MOCKS=true
API_TIMEOUT=1000
FEATURE_NEW_UI=true
```

## Interactive Debugging Techniques

### 1. Breakpoint Strategies

#### Types of Breakpoints
- Line breakpoints: Stop at specific line
- Conditional breakpoints: Stop when condition is true
- Logpoint/Tracepoint: Log message without stopping
- Exception breakpoints: Stop on exceptions
- Function breakpoints: Stop when function is called
- Data breakpoints: Stop when variable changes

#### Effective Breakpoint Usage
- Start with broad breakpoints, then narrow down
- Use conditional breakpoints for specific scenarios
- Set breakpoints at boundaries between components
- Use temporary breakpoints for one-time checks
- Combine breakpoints with watches

#### Example: Conditional Breakpoint in VS Code
```javascript
// Break only when userId matches specific value
// Set condition: userId === '12345'
function processUser(userId, userData) {
  const processedData = transform(userData);
  saveToDatabase(userId, processedData);
}
```

### 2. Watch Expressions

- Watch complex expressions during debugging
- Monitor object properties as they change
- Evaluate function results without modifying code
- Track multiple related variables simultaneously
- Use watch expressions to validate assumptions

### 3. Call Stack Analysis

- Examine the call stack to understand execution flow
- Identify unexpected function calls
- Check parameter values at each level
- Look for recursive patterns or depth issues
- Navigate up and down the stack to inspect state

### 4. Variable Inspection

- Inspect primitive values and object structures
- Expand objects to view properties
- Modify variables during debugging to test fixes
- Compare variable values at different points
- Look for unexpected null/undefined values

### 5. Step Debugging

- Step Into: Move into function calls
- Step Over: Execute current line without diving into functions
- Step Out: Complete current function and return to caller
- Run to Cursor: Execute until specific line
- Continue: Run until next breakpoint

#### Effective Stepping Strategies
- Use Step Into for suspicious function calls
- Use Step Over for well-tested or library functions
- Use Step Out to quickly exit deep call stacks
- Use Run to Cursor to skip uninteresting sections
- Combine with conditional breakpoints for efficiency

## Specialized Development Debugging Techniques

### 1. Logging Strategies

#### Structured Logging
```javascript
// Instead of:
console.log('User data:', user, 'Process result:', result);

// Use structured logging:
logger.debug({
  message: 'User processing completed',
  userId: user.id,
  operation: 'processUser',
  resultStatus: result.status,
  duration: performance.now() - startTime
});
```

#### Log Levels
- ERROR: Application errors requiring immediate attention
- WARN: Potential issues or unexpected behaviors
- INFO: Normal but significant events
- DEBUG: Detailed information for debugging
- TRACE: Very detailed debugging information

#### Contextual Logging
- Include correlation IDs for request tracking
- Log entry and exit points of key functions
- Include relevant state information
- Log timing information for performance analysis
- Group related log entries

### 2. Mocking and Stubbing

#### Mocking External Dependencies
```javascript
// Mock HTTP requests
jest.mock('axios');
axios.get.mockResolvedValue({ data: { test: 'value' } });

// Mock database
jest.mock('../database');
database.query.mockResolvedValue([{ id: 1, name: 'Test' }]);
```

#### Creating Test Doubles
- Stubs: Provide canned answers to calls
- Spies: Record calls and parameters
- Mocks: Pre-programmed with expectations
- Fakes: Working implementations with shortcuts
- Dummies: Passed around but not used

#### Effective Mocking Strategies
- Mock at the boundaries of your system
- Keep mocks simple and focused
- Verify mock interactions when relevant
- Reset mocks between tests
- Document mock behavior for clarity

### 3. Time Travel Debugging

#### Redux DevTools
- Record and replay state changes
- Jump to specific states
- Visualize action sequence
- Export and import sessions
- Test different state transitions

#### Replay Debugging
- Record program execution
- Step backward through code
- Inspect variable values at any point
- Understand cause-effect relationships
- Debug race conditions and timing issues

### 4. Database Debugging

#### Query Analysis
- Use EXPLAIN to analyze query execution plans
- Monitor query performance metrics
- Check index usage
- Identify table scans and expensive operations
- Test queries in isolation

#### Database Transactions
- Use explicit transactions for testing
- Roll back changes after tests
- Verify database state at each step
- Test transaction isolation levels
- Simulate concurrent transactions

#### Example: PostgreSQL Query Analysis
```sql
EXPLAIN ANALYZE
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.status = 'active'
GROUP BY u.name
ORDER BY order_count DESC;
```

### 5. Network Debugging

#### API Request Inspection
- Use browser network panel to inspect requests
- Monitor request/response headers and bodies
- Check timing and waterfall diagrams
- Simulate slow connections
- Test different content types

#### Proxy Tools
- Charles Proxy or Fiddler for HTTPS inspection
- Modify requests and responses on the fly
- Simulate network conditions
- Map remote URLs to local files
- Record and replay API interactions

#### WebSocket Debugging
- Monitor WebSocket connections
- Inspect message payloads
- Test reconnection logic
- Simulate disconnections
- Analyze message timing

## Debugging Common Development Issues

### 1. State Management Issues

#### Symptoms
- Unexpected UI updates
- Inconsistent application state
- Components not re-rendering
- State lost between operations
- Race conditions

#### Debugging Approach
1. Add logging at state change points
2. Use time-travel debugging if available
3. Verify state update operations
4. Check for asynchronous state updates
5. Look for multiple sources modifying the same state
6. Verify immutability practices

### 2. Asynchronous Code Issues

#### Symptoms
- Unhandled promises
- Race conditions
- Timing-dependent bugs
- Callback hell
- Event ordering problems

#### Debugging Approach
1. Add logging before and after async operations
2. Use async/await for clearer debugging
3. Check for missing error handling
4. Verify promise chains
5. Look for unintended closures
6. Test with different timing scenarios

#### Example: Async Debugging
```javascript
async function fetchUserData(userId) {
  console.log(`Starting fetch for user ${userId}`);
  try {
    const startTime = performance.now();
    const response = await api.getUser(userId);
    console.log(`User data received in ${performance.now() - startTime}ms`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    throw error;
  }
}
```

### 3. Memory Leaks

#### Symptoms
- Increasing memory usage over time
- Degraded performance
- Application crashes
- Slow garbage collection
- High CPU usage

#### Debugging Approach
1. Take heap snapshots at different points
2. Compare snapshots to identify retained objects
3. Look for detached DOM elements
4. Check for event listeners not being removed
5. Verify cleanup in component lifecycles
6. Look for closure-related leaks

#### Example: Memory Leak Detection
```javascript
// Chrome DevTools Console
// Take first snapshot
const snapshot1 = await performance.memory;

// Perform operations that might leak
for (let i = 0; i < 1000; i++) {
  createAndDestroyComponents();
}

// Take second snapshot
const snapshot2 = await performance.memory;

// Compare
console.log(`Memory difference: ${snapshot2.usedJSHeapSize - snapshot1.usedJSHeapSize} bytes`);
```

### 4. Performance Issues

#### Symptoms
- Slow rendering or operations
- UI jank or stuttering
- High CPU or memory usage
- Slow startup time
- Unresponsive UI

#### Debugging Approach
1. Use performance profiling tools
2. Identify hot spots in CPU usage
3. Look for excessive renders
4. Check for expensive calculations
5. Analyze network waterfall
6. Look for blocking operations on main thread

#### Example: React Performance Debugging
```javascript
// Add React DevTools profiler
import { Profiler } from 'react';

function onRenderCallback(
  id, // the "id" prop of the Profiler tree
  phase, // "mount" or "update"
  actualDuration, // time spent rendering
  baseDuration, // estimated time for full render
  startTime, // when React began rendering
  commitTime // when React committed changes
) {
  if (actualDuration > 5) { // Flag slow renders
    console.warn(`Slow render detected in ${id}: ${actualDuration}ms`);
  }
}

// Wrap component with Profiler
<Profiler id="MyComponent" onRender={onRenderCallback}>
  <MyComponent />
</Profiler>
```

## Development Debugging Best Practices

### 1. Debugging Workflow

1. **Reproduce the issue**
   - Create a reliable reproduction case
   - Document the steps to reproduce
   - Identify the minimal test case

2. **Gather information**
   - Check logs and error messages
   - Review recent code changes
   - Understand expected behavior

3. **Isolate the problem**
   - Narrow down the affected code
   - Identify dependencies and interactions
   - Determine if the issue is consistent or intermittent

4. **Form hypotheses**
   - Create theories about possible causes
   - Prioritize most likely causes
   - Plan tests for each hypothesis

5. **Test hypotheses**
   - Use debugging tools to validate theories
   - Make minimal changes to test fixes
   - Document findings

6. **Implement and verify solution**
   - Fix the root cause, not just symptoms
   - Add tests to prevent regression
   - Verify in different scenarios

### 2. Collaborative Debugging

- Pair programming for complex issues
- Rubber duck debugging (explain the problem aloud)
- Code reviews focused on potential bugs
- Share debugging sessions and findings
- Document debugging techniques for the team

### 3. Preventive Measures

- Write unit tests for bug fixes
- Add integration tests for system interactions
- Implement static analysis tools
- Use type checking (TypeScript, Flow, etc.)
- Create automated regression tests
- Document known issues and workarounds
