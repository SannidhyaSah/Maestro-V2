# JavaScript Debugging Guide

## Overview
This document provides specialized guidance for debugging JavaScript applications across different environments, including browser-based applications, Node.js applications, and modern JavaScript frameworks.

## Browser-Based JavaScript Debugging

### Browser Developer Tools
- **Chrome DevTools**
  - Console: Use `console.log()`, `console.error()`, `console.warn()`, `console.table()`, `console.group()`
  - Sources panel: Set breakpoints, step through code, watch expressions
  - Network panel: Monitor network requests, inspect responses
  - Performance panel: Analyze runtime performance
  - Memory panel: Identify memory leaks
  - Application panel: Inspect storage, service workers, and cache

- **Firefox Developer Tools**
  - Similar capabilities to Chrome with some unique features
  - Network Monitor with request blocking
  - Storage Inspector for managing client-side storage
  - Accessibility Inspector for checking accessibility issues

- **Safari Web Inspector**
  - JavaScript debugging with breakpoints
  - Network monitoring
  - Storage inspection
  - Timeline for performance analysis

### Common Browser Debugging Techniques
1. **Breakpoints**
   - Line breakpoints: Set at specific line numbers
   - Conditional breakpoints: Break only when a condition is true
   - DOM breakpoints: Break on DOM modifications
   - XHR/Fetch breakpoints: Break on specific network requests
   - Event listener breakpoints: Break on specific events

2. **Console Methods**
   ```javascript
   // Basic logging
   console.log('Variable value:', value);
   
   // Error logging
   console.error('Critical error:', error);
   
   // Warning logging
   console.warn('Potential issue:', issue);
   
   // Tabular data
   console.table(arrayOfObjects);
   
   // Grouped logs
   console.group('Group name');
   console.log('Detail 1');
   console.log('Detail 2');
   console.groupEnd();
   
   // Timing operations
   console.time('operationName');
   // ... code to time
   console.timeEnd('operationName');
   
   // Assertion
   console.assert(condition, 'Message if condition is false');
   ```

3. **Debugging Statements**
   - `debugger;` statement to trigger breakpoint programmatically

4. **Error Handling**
   ```javascript
   try {
     // Code that might throw an error
   } catch (error) {
     console.error('Error details:', error);
     // Handle the error appropriately
   } finally {
     // Code that will run regardless of error
   }
   ```

## Node.js Debugging

### Node.js Debugging Tools
1. **Built-in Node.js Debugger**
   - Start with `node inspect script.js`
   - Basic commands: `cont`, `next`, `step`, `out`, `watch(expr)`

2. **Node.js with Chrome DevTools**
   - Start with `node --inspect script.js`
   - Connect via Chrome at chrome://inspect

3. **Visual Studio Code Debugging**
   - Configure launch.json for Node.js debugging
   - Set breakpoints directly in the editor
   - Watch variables and evaluate expressions
   - Debug console for REPL interaction

4. **Specialized Node.js Debugging Tools**
   - ndb: Improved debugging experience from Google Chrome team
   - node-inspector: Debug Node.js applications using Chrome DevTools

### Node.js Debugging Techniques
1. **Error Handling and Logging**
   ```javascript
   // Using a logging library like Winston or Pino
   const logger = require('winston');
   
   try {
     // Operation that might fail
   } catch (error) {
     logger.error('Operation failed', { error, stack: error.stack });
     // Handle the error appropriately
   }
   ```

2. **Async/Await Error Handling**
   ```javascript
   async function fetchData() {
     try {
       const response = await fetch(url);
       const data = await response.json();
       return data;
     } catch (error) {
       console.error('Fetch error:', error);
       throw new Error(`Data fetch failed: ${error.message}`);
     }
   }
   ```

3. **Process Events**
   ```javascript
   process.on('uncaughtException', (error) => {
     console.error('Uncaught exception:', error);
     // Log the error and gracefully shut down
     process.exit(1);
   });
   
   process.on('unhandledRejection', (reason, promise) => {
     console.error('Unhandled rejection at:', promise, 'reason:', reason);
     // Log the error but don't necessarily exit
   });
   ```

## Framework-Specific Debugging

### React
1. **React Developer Tools**
   - Browser extension for inspecting React component hierarchies
   - Component state and props inspection
   - Performance profiling

2. **Common React Issues**
   - Infinite re-rendering loops
   - State management problems
   - Component lifecycle issues
   - React hooks dependencies

3. **Debugging Techniques**
   ```javascript
   // Using React's useEffect cleanup for debugging
   useEffect(() => {
     console.log('Component mounted or deps changed', dependencies);
     return () => {
       console.log('Component will unmount or deps will change');
     };
   }, [dependencies]);
   
   // Using React's Error Boundaries
   class ErrorBoundary extends React.Component {
     state = { hasError: false, error: null };
     
     static getDerivedStateFromError(error) {
       return { hasError: true, error };
     }
     
     componentDidCatch(error, info) {
       console.error('Error caught by boundary:', error, info);
     }
     
     render() {
       if (this.state.hasError) {
         return <ErrorDisplay error={this.state.error} />;
       }
       return this.props.children;
     }
   }
   ```

### Vue.js
1. **Vue DevTools**
   - Browser extension for inspecting Vue component hierarchies
   - Component state and props inspection
   - Time-travel debugging for Vuex

2. **Common Vue Issues**
   - Reactivity system limitations
   - Component communication problems
   - Lifecycle hook timing issues

3. **Debugging Techniques**
   ```javascript
   // Using Vue's lifecycle hooks for debugging
   export default {
     created() {
       console.log('Component created');
     },
     mounted() {
       console.log('Component mounted', this.$data);
     },
     updated() {
       console.log('Component updated', this.$data);
     },
     beforeDestroy() {
       console.log('Component will be destroyed');
     }
   };
   ```

## Performance Debugging

### Identifying JavaScript Performance Issues
1. **Profiling Tools**
   - Chrome DevTools Performance panel
   - Node.js built-in profiler
   - Lighthouse for web performance auditing

2. **Common Performance Issues**
   - Excessive DOM manipulation
   - Memory leaks
   - Inefficient event handlers
   - Blocking the main thread
   - Unoptimized rendering

3. **Memory Leak Detection**
   - Take heap snapshots in Chrome DevTools
   - Compare snapshots to identify retained objects
   - Look for detached DOM elements
   - Check for closure-related leaks

## Advanced Debugging Techniques

### Source Maps
- Enable proper debugging of minified/transpiled code
- Configure bundlers (Webpack, Rollup, etc.) to generate source maps
- Use source maps in production for error reporting

### Proxy Debugging
```javascript
// Using Proxy for debugging object access
const handler = {
  get(target, prop) {
    console.log(`Property ${prop} accessed`);
    return target[prop];
  },
  set(target, prop, value) {
    console.log(`Property ${prop} set to ${value}`);
    target[prop] = value;
    return true;
  }
};

const debugObject = new Proxy(originalObject, handler);
```

### Monkey Patching for Debugging
```javascript
// Temporarily override a method for debugging
const originalMethod = SomeClass.prototype.method;
SomeClass.prototype.method = function(...args) {
  console.log('Method called with args:', args);
  const result = originalMethod.apply(this, args);
  console.log('Method returned:', result);
  return result;
};
```

## Debugging Tools and Libraries

### Recommended Tools
1. **Linting and Static Analysis**
   - ESLint with appropriate rules
   - TypeScript for type checking
   - SonarQube for code quality analysis

2. **Testing Tools with Debugging Support**
   - Jest with debugging configuration
   - Cypress with time-travel debugging
   - Mocha with Node.js debugging

3. **Specialized Debugging Libraries**
   - debug: Conditional debugging utility
   - why-did-you-render: React rendering debugger
   - redux-devtools: Redux state debugging
   - apollo-client-devtools: GraphQL query debugging
