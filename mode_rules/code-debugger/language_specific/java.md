# Java Debugging Guide

## Overview
This document provides specialized guidance for debugging Java applications across different environments, including standalone applications, web applications, and enterprise systems.

## Basic Java Debugging

### IDE-Based Debugging

1. **IntelliJ IDEA**
   - Set breakpoints by clicking in the gutter
   - Use the Debug panel to control execution
   - Evaluate expressions during debugging
   - Conditional breakpoints
   - Exception breakpoints
   - Field watchpoints
   - Method breakpoints
   - Smart step into for complex method calls
   - Drop frame to re-execute methods
   - HotSwap for updating code during debugging

2. **Eclipse**
   - Similar debugging capabilities to IntelliJ
   - Breakpoints view for managing all breakpoints
   - Variables view for inspecting current state
   - Expressions view for evaluating code
   - Display view for quick value inspection
   - Step filtering to skip specified packages

3. **Visual Studio Code with Java Extension Pack**
   - Integrated debugging experience
   - Breakpoints and data inspection
   - Debug console for evaluating expressions
   - Call stack navigation

### Java Debugging Tools

1. **Java Debugger (jdb)**
   - Command-line debugger included with JDK
   - Basic commands:
     - `break`: Set breakpoint
     - `clear`: Clear breakpoint
     - `cont`: Continue execution
     - `step`: Step into next line
     - `next`: Step over next line
     - `print`: Print variable value
     - `dump`: Print all object information
     - `locals`: Print all local variables
     - `threads`: List all threads
     - `thread`: Set current thread

   ```bash
   # Start jdb
   jdb -classpath . MyClass
   
   # Attach to running JVM
   jdb -attach 8000
   ```

2. **Java Flight Recorder (JFR)**
   - Low-overhead profiling and diagnostics tool
   - Captures detailed runtime information
   - Useful for production debugging
   
   ```bash
   # Start application with JFR enabled
   java -XX:+FlightRecorder -jar myapp.jar
   
   # Start recording
   jcmd <pid> JFR.start name=MyRecording settings=profile duration=60s filename=recording.jfr
   
   # Dump recording
   jcmd <pid> JFR.dump name=MyRecording filename=recording.jfr
   
   # Stop recording
   jcmd <pid> JFR.stop name=MyRecording
   ```

3. **Java VisualVM**
   - Visual tool for monitoring and troubleshooting
   - CPU and memory profiling
   - Thread analysis
   - Heap dump analysis
   - MBean browser for JMX
   
   ```bash
   # Start VisualVM
   jvisualvm
   ```

## Logging and Exception Handling

### Logging Frameworks

1. **SLF4J with Logback**
   ```java
   import org.slf4j.Logger;
   import org.slf4j.LoggerFactory;
   
   public class MyClass {
       private static final Logger logger = LoggerFactory.getLogger(MyClass.class);
       
       public void doSomething() {
           logger.trace("Entering doSomething method");
           try {
               // Method implementation
               logger.debug("Processing data: {}", data);
               
               if (someCondition) {
                   logger.info("Operation completed successfully");
               } else {
                   logger.warn("Operation completed with warnings");
               }
           } catch (Exception e) {
               logger.error("Error in doSomething", e);
               throw e;
           } finally {
               logger.trace("Exiting doSomething method");
           }
       }
   }
   ```

2. **Log4j2 Configuration Example**
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <Configuration status="WARN">
     <Appenders>
       <Console name="Console" target="SYSTEM_OUT">
         <PatternLayout pattern="%d{HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n"/>
       </Console>
       <File name="File" fileName="app.log">
         <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n"/>
       </File>
     </Appenders>
     <Loggers>
       <Root level="info">
         <AppenderRef ref="Console"/>
         <AppenderRef ref="File"/>
       </Root>
       <Logger name="com.example.debug" level="debug" additivity="false">
         <AppenderRef ref="Console"/>
         <AppenderRef ref="File"/>
       </Logger>
     </Loggers>
   </Configuration>
   ```

### Exception Handling Best Practices

1. **Proper Exception Hierarchy**
   ```java
   // Base application exception
   public class ApplicationException extends RuntimeException {
       public ApplicationException(String message) {
           super(message);
       }
       
       public ApplicationException(String message, Throwable cause) {
           super(message, cause);
       }
   }
   
   // Specific exception types
   public class DataAccessException extends ApplicationException {
       public DataAccessException(String message) {
           super(message);
       }
       
       public DataAccessException(String message, Throwable cause) {
           super(message, cause);
       }
   }
   ```

2. **Try-with-Resources for Resource Management**
   ```java
   try (
       FileInputStream fis = new FileInputStream(file);
       BufferedReader reader = new BufferedReader(new InputStreamReader(fis))
   ) {
       // Use resources
       String line;
       while ((line = reader.readLine()) != null) {
           // Process line
       }
   } catch (IOException e) {
       logger.error("Error reading file: {}", file.getName(), e);
       throw new ApplicationException("Failed to process file", e);
   }
   ```

3. **Exception Translation**
   ```java
   try {
       // Call to external API or lower-level component
       externalService.performOperation();
   } catch (ExternalServiceException e) {
       // Translate to application-specific exception
       throw new ServiceException("External service operation failed", e);
   } catch (Exception e) {
       // Catch unexpected exceptions
       logger.error("Unexpected error during operation", e);
       throw new ApplicationException("Operation failed unexpectedly", e);
   }
   ```

## Framework-Specific Debugging

### Spring Framework

1. **Spring Boot Actuator**
   - Provides production-ready features for monitoring and debugging
   - Endpoints for health, metrics, environment, etc.
   - Enable in application.properties:
   ```properties
   management.endpoints.web.exposure.include=health,info,metrics,env,loggers
   ```

2. **Spring Boot DevTools**
   - Automatic application restart on code changes
   - LiveReload for browser refresh
   - Remote debugging support
   - Enhanced error pages

3. **Spring AOP for Debugging**
   ```java
   @Aspect
   @Component
   public class DebugAspect {
       private static final Logger logger = LoggerFactory.getLogger(DebugAspect.class);
       
       @Around("execution(* com.example.service.*.*(..))")
       public Object logMethodExecution(ProceedingJoinPoint joinPoint) throws Throwable {
           String methodName = joinPoint.getSignature().getName();
           String className = joinPoint.getTarget().getClass().getName();
           Object[] args = joinPoint.getArgs();
           
           logger.debug("Entering {}.{}() with arguments: {}", className, methodName, Arrays.toString(args));
           
           long startTime = System.currentTimeMillis();
           try {
               Object result = joinPoint.proceed();
               long endTime = System.currentTimeMillis();
               
               logger.debug("Exiting {}.{}() with result: {} (execution time: {}ms)", 
                   className, methodName, result, (endTime - startTime));
               
               return result;
           } catch (Throwable e) {
               logger.error("Exception in {}.{}(): {}", className, methodName, e.getMessage(), e);
               throw e;
           }
       }
   }
   ```

### Jakarta EE / Java EE

1. **JBoss/WildFly Debugging**
   - Enable remote debugging:
   ```bash
   ./standalone.sh --debug
   ```
   
   - Configure logging in standalone.xml:
   ```xml
   <subsystem xmlns="urn:jboss:domain:logging:3.0">
       <console-handler name="CONSOLE">
           <level name="INFO"/>
           <formatter>
               <named-formatter name="COLOR-PATTERN"/>
           </formatter>
       </console-handler>
       <periodic-rotating-file-handler name="FILE" autoflush="true">
           <formatter>
               <named-formatter name="PATTERN"/>
           </formatter>
           <file relative-to="jboss.server.log.dir" path="server.log"/>
           <suffix value=".yyyy-MM-dd"/>
           <append value="true"/>
       </periodic-rotating-file-handler>
       <logger category="com.example">
           <level name="DEBUG"/>
       </logger>
       <root-logger>
           <level name="INFO"/>
           <handlers>
               <handler name="CONSOLE"/>
               <handler name="FILE"/>
           </handlers>
       </root-logger>
   </subsystem>
   ```

2. **CDI Events for Debugging**
   ```java
   // Define debug event
   public class DebugEvent {
       private final String message;
       private final Object data;
       
       public DebugEvent(String message, Object data) {
           this.message = message;
           this.data = data;
       }
       
       // Getters
   }
   
   // Fire debug events
   @Inject
   private Event<DebugEvent> debugEvents;
   
   public void processData(Data data) {
       debugEvents.fire(new DebugEvent("Processing data", data));
       // Process data
   }
   
   // Debug observer
   @ApplicationScoped
   public class DebugObserver {
       private static final Logger logger = LoggerFactory.getLogger(DebugObserver.class);
       
       public void onDebugEvent(@Observes DebugEvent event) {
           logger.debug("Debug event: {} - Data: {}", event.getMessage(), event.getData());
       }
   }
   ```

## Performance Debugging

### Memory Analysis

1. **Heap Dumps**
   - Generate heap dump:
   ```bash
   jmap -dump:format=b,file=heap.hprof <pid>
   ```
   
   - Analyze with tools like VisualVM, Eclipse MAT, or JProfiler

2. **Common Memory Issues**
   - Memory leaks from improper resource cleanup
   - Excessive object creation
   - Large collections or caches
   - Classloader leaks
   - ThreadLocal variables not properly removed

### Thread Analysis

1. **Thread Dumps**
   - Generate thread dump:
   ```bash
   jstack <pid> > thread_dump.txt
   ```
   
   - Multiple thread dumps over time to identify deadlocks or thread starvation

2. **Common Threading Issues**
   - Deadlocks
   - Thread starvation
   - Thread leaks
   - Excessive context switching
   - Improper synchronization

## Advanced Debugging Techniques

### Remote Debugging

1. **Enable Remote Debugging**
   ```bash
   java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005 -jar myapp.jar
   ```

2. **Connect with IDE**
   - Configure remote debugging in IDE
   - Set breakpoints and debug as normal

### Dynamic Bytecode Instrumentation

1. **Java Agents**
   ```java
   public class DebugAgent {
       public static void premain(String args, Instrumentation inst) {
           inst.addTransformer(new DebugTransformer());
       }
       
       static class DebugTransformer implements ClassFileTransformer {
           @Override
           public byte[] transform(ClassLoader loader, String className, 
                                  Class<?> classBeingRedefined, 
                                  ProtectionDomain protectionDomain, 
                                  byte[] classfileBuffer) {
               // Use bytecode manipulation library like ASM or Javassist
               // to add logging or other instrumentation
               return modifiedClassBytes;
           }
       }
   }
   ```
   
   - Use with:
   ```bash
   java -javaagent:debugagent.jar -jar myapp.jar
   ```

2. **Bytecode Manipulation Libraries**
   - ASM
   - Javassist
   - ByteBuddy

### JVM Debugging Tools

1. **jcmd**
   ```bash
   # List available commands
   jcmd <pid> help
   
   # Thread dump
   jcmd <pid> Thread.print
   
   # Heap histogram
   jcmd <pid> GC.class_histogram
   
   # JFR recording
   jcmd <pid> JFR.start
   ```

2. **jstat**
   ```bash
   # Monitor garbage collection
   jstat -gc <pid> 1000
   ```

3. **jinfo**
   ```bash
   # View and modify JVM flags
   jinfo -flag PrintGCDetails <pid>
   jinfo -flag +PrintGCDetails <pid>
   ```
