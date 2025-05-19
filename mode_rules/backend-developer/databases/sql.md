# SQL Databases - Backend Developer Rules

## Overview
These rules provide guidelines for implementing backend features with SQL databases (PostgreSQL, MySQL, SQL Server, etc.). When working with SQL databases, you must follow these guidelines to ensure data integrity, performance, and security.

## SQL Database Implementation Guidelines

### 1. Schema Design
- **Required Approach**:
  - Design normalized schemas (typically 3NF)
  - Use appropriate data types for columns
  - Implement proper primary and foreign keys
  - Use constraints to enforce data integrity
  - Design indexes for query optimization
  - Use consistent naming conventions
  - Document schema design decisions

### 2. Query Optimization
- **Required Approach**:
  - Write efficient SQL queries
  - Use appropriate joins (INNER, LEFT, etc.)
  - Avoid SELECT * in production code
  - Use WHERE clauses to filter data early
  - Implement pagination for large result sets
  - Use query plans to analyze performance
  - Optimize subqueries and complex joins

### 3. Indexing Strategy
- **Required Approach**:
  - Index columns used in WHERE clauses
  - Index columns used in JOIN conditions
  - Index columns used for sorting (ORDER BY)
  - Consider composite indexes for multi-column conditions
  - Avoid over-indexing (balance with write performance)
  - Monitor and maintain indexes
  - Consider partial indexes for filtered queries

### 4. Transaction Management
- **Required Approach**:
  - Use transactions for multi-step operations
  - Implement proper isolation levels
  - Keep transactions short and focused
  - Handle deadlocks appropriately
  - Implement proper error handling in transactions
  - Consider using savepoints for complex transactions
  - Document transaction boundaries

### 5. Security
- **Required Approach**:
  - Use parameterized queries to prevent SQL injection
  - Implement proper access controls
  - Use principle of least privilege for database users
  - Encrypt sensitive data
  - Audit database access
  - Implement proper error handling
  - Sanitize inputs before using in queries

### 6. Performance Monitoring
- **Required Approach**:
  - Monitor query performance
  - Identify and optimize slow queries
  - Use database profiling tools
  - Monitor connection pooling
  - Implement proper caching strategies
  - Monitor database size and growth
  - Implement proper logging

### 7. Migration and Versioning
- **Required Approach**:
  - Use database migration tools
  - Version control database schema changes
  - Implement backward-compatible changes when possible
  - Test migrations thoroughly
  - Document migration procedures
  - Implement rollback procedures
  - Consider zero-downtime migrations

## Database-Specific Guidelines

### PostgreSQL
- Use appropriate PostgreSQL-specific data types (jsonb, array, etc.)
- Implement proper partitioning for large tables
- Use PostgreSQL's full-text search capabilities
- Implement proper VACUUM and ANALYZE maintenance
- Use PostgreSQL's advanced indexing (GIN, GiST, etc.)
- Leverage PostgreSQL's extension ecosystem
- Implement proper connection pooling

### MySQL
- Choose appropriate storage engines (InnoDB for most cases)
- Implement proper character sets and collations
- Use MySQL's performance schema for monitoring
- Implement proper indexing for full-text search
- Configure proper buffer pool size
- Use MySQL's replication capabilities
- Implement proper connection pooling

### SQL Server
- Use appropriate SQL Server-specific features
- Implement proper indexing strategies
- Use SQL Server's query store for performance monitoring
- Implement proper backup and recovery procedures
- Use SQL Server's security features
- Leverage SQL Server's in-memory capabilities
- Implement proper connection pooling

## SQL Query Templates

### Basic CRUD Operations

```sql
-- Create (Insert)
INSERT INTO table_name (column1, column2, column3)
VALUES (value1, value2, value3);

-- Read (Select)
SELECT column1, column2
FROM table_name
WHERE condition
ORDER BY column1
LIMIT 10 OFFSET 20;

-- Update
UPDATE table_name
SET column1 = value1, column2 = value2
WHERE condition;

-- Delete
DELETE FROM table_name
WHERE condition;
```

### Joins and Relationships

```sql
-- Inner Join
SELECT a.column1, a.column2, b.column1
FROM table_a a
INNER JOIN table_b b ON a.id = b.a_id
WHERE a.column1 = 'value';

-- Left Join
SELECT a.column1, a.column2, b.column1
FROM table_a a
LEFT JOIN table_b b ON a.id = b.a_id
WHERE a.column1 = 'value';

-- Multiple Joins
SELECT a.column1, b.column1, c.column1
FROM table_a a
INNER JOIN table_b b ON a.id = b.a_id
LEFT JOIN table_c c ON b.id = c.b_id
WHERE a.column1 = 'value';
```

### Aggregation and Grouping

```sql
-- Basic Aggregation
SELECT 
    category_id,
    COUNT(*) as total_count,
    SUM(amount) as total_amount,
    AVG(amount) as average_amount,
    MIN(created_at) as earliest_date,
    MAX(created_at) as latest_date
FROM transactions
WHERE created_at >= '2023-01-01'
GROUP BY category_id
HAVING COUNT(*) > 5
ORDER BY total_amount DESC;

-- Window Functions
SELECT 
    id,
    amount,
    created_at,
    SUM(amount) OVER (PARTITION BY category_id) as category_total,
    ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY amount DESC) as rank_in_category
FROM transactions
WHERE created_at >= '2023-01-01';
```

### Transactions

```sql
-- Basic Transaction
BEGIN;
    UPDATE accounts SET balance = balance - 100 WHERE id = 1;
    UPDATE accounts SET balance = balance + 100 WHERE id = 2;
    
    -- Check if any account would have negative balance
    IF EXISTS (SELECT 1 FROM accounts WHERE balance < 0) THEN
        ROLLBACK;
    ELSE
        COMMIT;
    END IF;

-- Transaction with Savepoint
BEGIN;
    UPDATE inventory SET quantity = quantity - 1 WHERE product_id = 101;
    
    SAVEPOINT after_inventory_update;
    
    INSERT INTO orders (product_id, quantity, customer_id) 
    VALUES (101, 1, 202);
    
    -- If order insertion fails, rollback to savepoint
    IF some_condition THEN
        ROLLBACK TO after_inventory_update;
        -- Handle error
    ELSE
        COMMIT;
    END IF;
```

## SQL Best Practices

### 1. Query Writing
- **Required Practices**:
  - Use meaningful aliases for tables
  - Format SQL for readability
  - Comment complex queries
  - Use CTEs (WITH clauses) for complex queries
  - Avoid cursors when set-based operations are possible
  - Use appropriate joins instead of subqueries when possible
  - Be explicit about column names in SELECT statements

### 2. Performance
- **Required Practices**:
  - Filter data as early as possible
  - Use appropriate indexes
  - Avoid functions on indexed columns in WHERE clauses
  - Use EXPLAIN/EXPLAIN ANALYZE to understand query plans
  - Implement pagination for large result sets
  - Use appropriate data types
  - Consider denormalization for read-heavy workloads

### 3. Security
- **Required Practices**:
  - Always use parameterized queries
  - Never concatenate user input into SQL strings
  - Use principle of least privilege
  - Encrypt sensitive data
  - Implement row-level security where appropriate
  - Audit sensitive data access
  - Regularly review database permissions

### 4. Maintainability
- **Required Practices**:
  - Use consistent naming conventions
  - Document complex queries
  - Version control database schema changes
  - Use migration tools
  - Write idempotent migration scripts
  - Test database changes thoroughly
  - Maintain database documentation

### 5. Data Integrity
- **Required Practices**:
  - Use constraints (PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK)
  - Implement proper validation at the application level
  - Use transactions for multi-step operations
  - Consider using triggers for complex integrity rules
  - Implement proper error handling
  - Use appropriate isolation levels
  - Regularly validate data integrity

## ORM Integration

### 1. ORM Best Practices
- **Required Practices**:
  - Understand the SQL generated by the ORM
  - Use eager loading to avoid N+1 query problems
  - Implement proper entity relationships
  - Use transactions for multi-step operations
  - Consider using native queries for complex operations
  - Implement proper caching strategies
  - Monitor ORM performance

### 2. Common ORM Pitfalls
- **Required Awareness**:
  - N+1 query problem
  - Cartesian product issues with improper joins
  - Inefficient query generation
  - Excessive memory usage with large result sets
  - Lazy loading in loops
  - Entity tracking overhead
  - Improper transaction management

### 3. Framework-Specific ORM Guidelines

#### Hibernate (Java)
- Use appropriate fetch strategies
- Implement proper caching
- Use query hints for optimization
- Consider native queries for complex operations
- Implement proper entity relationships
- Use criteria API for dynamic queries
- Monitor session size and performance

#### Entity Framework (C#)
- Use Include for eager loading
- Implement proper DbContext management
- Use async methods for better performance
- Consider compiled queries for frequent operations
- Use appropriate tracking behavior
- Implement proper entity configurations
- Monitor query performance

#### SQLAlchemy (Python)
- Use joinedload or selectinload for eager loading
- Implement proper session management
- Use Core for performance-critical operations
- Consider hybrid properties for complex attributes
- Implement proper relationship loading
- Use connection pooling
- Monitor query performance
