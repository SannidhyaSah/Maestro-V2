# Python Debugging Guide

## Overview
This document provides specialized guidance for debugging Python applications across different environments, including command-line applications, web applications, and data science/machine learning applications.

## Basic Python Debugging

### Built-in Debugging Tools

1. **Python Debugger (pdb)**
   - Interactive debugger in the standard library
   - Basic commands:
     - `b` or `break`: Set breakpoint
     - `c` or `continue`: Continue execution
     - `n` or `next`: Execute next line (step over)
     - `s` or `step`: Step into function call
     - `r` or `return`: Continue execution until current function returns
     - `q` or `quit`: Quit debugger
     - `p` or `print`: Print expression value
     - `l` or `list`: List source code
     - `w` or `where`: Print stack trace

   ```python
   # Adding pdb programmatically
   import pdb; pdb.set_trace()  # Python 2.x and 3.x
   breakpoint()  # Python 3.7+
   ```

2. **Logging Module**
   ```python
   import logging
   
   # Configure logging
   logging.basicConfig(
       level=logging.DEBUG,
       format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
       filename='debug.log'
   )
   
   # Create logger
   logger = logging.getLogger(__name__)
   
   # Log at different levels
   logger.debug('Detailed information for debugging')
   logger.info('Confirmation that things are working')
   logger.warning('Something unexpected happened')
   logger.error('A more serious problem occurred')
   logger.critical('A critical error - program may not be able to continue')
   ```

3. **Traceback Module**
   ```python
   import traceback
   
   try:
       # Code that might raise an exception
       result = risky_operation()
   except Exception as e:
       # Print detailed traceback
       traceback.print_exc()
       
       # Or capture as string
       error_msg = traceback.format_exc()
       logger.error(f"An error occurred: {error_msg}")
   ```

### IDE-Based Debugging

1. **Visual Studio Code**
   - Set breakpoints by clicking in the gutter
   - Use the Debug panel to control execution
   - Watch variables and expressions
   - Inspect call stack and variables
   - Conditional breakpoints
   - Logpoints for non-intrusive logging

2. **PyCharm**
   - Comprehensive debugging tools
   - Graphical debugger with breakpoints
   - Evaluate expressions during debugging
   - Smart step into for complex calls
   - Frame evaluation for improved performance
   - Remote debugging capabilities

3. **Jupyter Notebooks**
   - Use `%debug` magic command after an exception
   - `%pdb` magic to automatically enter debugger on exception
   - Cell-by-cell execution for incremental debugging
   - Rich output display for variable inspection

## Advanced Python Debugging Techniques

### Exception Handling Best Practices

1. **Specific Exception Handling**
   ```python
   try:
       # Potentially risky code
       with open(filename, 'r') as file:
           data = file.read()
   except FileNotFoundError:
       logger.error(f"File not found: {filename}")
       # Handle missing file
   except PermissionError:
       logger.error(f"Permission denied: {filename}")
       # Handle permission issues
   except Exception as e:
       logger.error(f"Unexpected error: {str(e)}")
       # Handle other exceptions
   ```

2. **Context Managers for Resource Cleanup**
   ```python
   class DebugContext:
       def __init__(self, name):
           self.name = name
           
       def __enter__(self):
           logger.debug(f"Entering context: {self.name}")
           return self
           
       def __exit__(self, exc_type, exc_val, exc_tb):
           if exc_type:
               logger.error(f"Exception in context {self.name}: {exc_val}")
               # Log traceback if needed
               logger.debug(''.join(traceback.format_tb(exc_tb)))
           logger.debug(f"Exiting context: {self.name}")
           # Return False to propagate exception, True to suppress
           return False
   
   # Usage
   with DebugContext("critical_section"):
       # Code that might raise an exception
       process_data()
   ```

### Debugging Asynchronous Code

1. **Asyncio Debugging**
   ```python
   import asyncio
   
   # Enable asyncio debug mode
   asyncio.run(main(), debug=True)
   
   # Or set environment variable
   # PYTHONASYNCIODEBUG=1
   
   # Logging coroutines and tasks
   async def traced_function():
       logger.debug("Starting traced_function")
       try:
           result = await actual_function()
           logger.debug(f"traced_function completed with result: {result}")
           return result
       except Exception as e:
           logger.error(f"traced_function failed: {e}")
           raise
   ```

2. **Concurrent.futures Debugging**
   ```python
   from concurrent.futures import ThreadPoolExecutor
   import threading
   
   def debug_task(task_id, *args, **kwargs):
       thread_id = threading.get_ident()
       logger.debug(f"Task {task_id} started in thread {thread_id}")
       try:
           result = actual_task(*args, **kwargs)
           logger.debug(f"Task {task_id} completed with result: {result}")
           return result
       except Exception as e:
           logger.error(f"Task {task_id} failed: {e}")
           raise
   
   # Usage
   with ThreadPoolExecutor(max_workers=4) as executor:
       futures = [executor.submit(debug_task, i, arg1, arg2) for i in range(10)]
   ```

## Framework-Specific Debugging

### Django

1. **Django Debug Toolbar**
   - Provides detailed debug information in the browser
   - SQL queries with execution time
   - Template rendering information
   - Request/response details
   - Installed apps and settings

2. **Django Logging Configuration**
   ```python
   LOGGING = {
       'version': 1,
       'disable_existing_loggers': False,
       'formatters': {
           'verbose': {
               'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
               'style': '{',
           },
       },
       'handlers': {
           'file': {
               'level': 'DEBUG',
               'class': 'logging.FileHandler',
               'filename': 'debug.log',
               'formatter': 'verbose',
           },
           'console': {
               'level': 'INFO',
               'class': 'logging.StreamHandler',
               'formatter': 'verbose',
           },
       },
       'loggers': {
           'django': {
               'handlers': ['file', 'console'],
               'level': 'INFO',
               'propagate': True,
           },
           'myapp': {
               'handlers': ['file', 'console'],
               'level': 'DEBUG',
               'propagate': True,
           },
       },
   }
   ```

3. **Django Debug Techniques**
   - Use `django.db.connection.queries` to inspect SQL queries
   - Enable query logging with `django.db.backends` logger
   - Use `print_sql` decorator for ORM query debugging
   - Middleware for request/response debugging

### Flask

1. **Flask Debug Mode**
   ```python
   app = Flask(__name__)
   app.config['DEBUG'] = True  # Enable debug mode
   ```

2. **Flask Debug Extensions**
   - Flask-DebugToolbar: Similar to Django Debug Toolbar
   - Flask-DebugToolbar-LineProfilerPanel: For profiling
   - Flask-MonitoringDashboard: For performance monitoring

3. **Flask Logging**
   ```python
   from flask import Flask, current_app
   
   app = Flask(__name__)
   
   @app.route('/')
   def index():
       current_app.logger.debug('Index page requested')
       return 'Hello World'
   
   # Configure logging
   if not app.debug:
       import logging
       from logging.handlers import RotatingFileHandler
       file_handler = RotatingFileHandler('flask-debug.log', maxBytes=10240, backupCount=10)
       file_handler.setFormatter(logging.Formatter(
           '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
       ))
       file_handler.setLevel(logging.INFO)
       app.logger.addHandler(file_handler)
       app.logger.setLevel(logging.INFO)
   ```

## Performance Debugging

### Profiling Tools

1. **cProfile and profile**
   ```python
   import cProfile
   
   # Profile a function
   cProfile.run('expensive_function()')
   
   # Profile with more control
   profiler = cProfile.Profile()
   profiler.enable()
   expensive_function()
   profiler.disable()
   profiler.print_stats(sort='cumulative')
   
   # Save results to file
   profiler.dump_stats('profile_results.prof')
   ```

2. **pstats for Analyzing Profile Data**
   ```python
   import pstats
   from pstats import SortKey
   
   # Load profile data
   p = pstats.Stats('profile_results.prof')
   
   # Sort and print
   p.strip_dirs().sort_stats(SortKey.CUMULATIVE).print_stats(10)
   ```

3. **line_profiler for Line-by-Line Profiling**
   ```python
   # Install with: pip install line_profiler
   
   # Add decorator to function
   @profile
   def expensive_function():
       # Function code
       
   # Run with: kernprof -l script.py
   # View results with: python -m line_profiler script.py.lprof
   ```

4. **memory_profiler for Memory Usage**
   ```python
   # Install with: pip install memory_profiler
   
   # Add decorator to function
   @profile
   def memory_intensive_function():
       # Function code
       
   # Run with: python -m memory_profiler script.py
   ```

### Common Performance Issues

1. **N+1 Query Problem**
   - Symptoms: Excessive database queries
   - Detection: SQL query logging, profiling
   - Solution: Use select_related/prefetch_related in Django, eager loading in SQLAlchemy

2. **Memory Leaks**
   - Symptoms: Increasing memory usage over time
   - Detection: memory_profiler, objgraph
   - Solution: Fix circular references, use weakref, proper cleanup

3. **GIL Contention**
   - Symptoms: CPU-bound threads not scaling
   - Detection: Profiling with threading
   - Solution: Use multiprocessing, C extensions, or asyncio

## Debugging Tools and Libraries

1. **ipdb**
   - Enhanced interactive debugger based on pdb
   - Syntax highlighting and tab completion
   - Install with: `pip install ipdb`
   - Usage: `import ipdb; ipdb.set_trace()`

2. **pudb**
   - Visual full-screen console debugger
   - Install with: `pip install pudb`
   - Usage: `import pudb; pudb.set_trace()`

3. **Sentry**
   - Error tracking and monitoring
   - Captures exceptions with context
   - Aggregates similar errors
   - Performance monitoring

4. **pytest**
   - Powerful testing framework with debugging features
   - `--pdb` flag to drop into debugger on test failure
   - `pytest.set_trace()` for manual breakpoints
   - Detailed assertion failure messages
