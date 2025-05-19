# Relational Database Design Guidelines

## Overview
Relational databases organize data into tables with rows and columns, establishing relationships between tables through keys. They excel at maintaining data integrity, supporting complex queries, and handling structured data with well-defined relationships.

## When to Use Relational Databases
- When data has a clear, stable structure with well-defined relationships
- When ACID compliance is required (Atomicity, Consistency, Isolation, Durability)
- When complex queries and joins are needed
- When data integrity and consistency are critical
- When transactions must be supported
- For systems with complex reporting requirements

## Key Principles

### Normalization
- **First Normal Form (1NF)**: Eliminate repeating groups, create separate tables for related data, identify each set of related data with a primary key
- **Second Normal Form (2NF)**: Meet 1NF requirements and remove subsets of data that apply to multiple rows to separate tables, create relationships using foreign keys
- **Third Normal Form (3NF)**: Meet 2NF requirements and remove columns not dependent on the primary key
- **Denormalization**: Strategically violate normalization rules for performance when necessary, but document the trade-offs

### Keys and Relationships
- **Primary Keys**: Use surrogate keys (auto-incrementing integers or UUIDs) for most tables
- **Foreign Keys**: Always define foreign key constraints to maintain referential integrity
- **Composite Keys**: Use when a combination of columns uniquely identifies a row
- **Relationship Types**:
  - One-to-One: Implement with foreign keys on either table
  - One-to-Many: Place foreign key in the "many" table
  - Many-to-Many: Create a junction table with foreign keys to both related tables

### Indexing Strategy
- Index all foreign key columns
- Index columns frequently used in WHERE clauses
- Index columns used in JOIN conditions
- Index columns used in ORDER BY and GROUP BY clauses
- Consider covering indexes for frequently executed queries
- Avoid over-indexing as it impacts write performance
- Regularly analyze index usage and performance

### Data Types
- Use the most appropriate data type for each column
- Use fixed-length types when the length is consistent
- Use variable-length types when the length varies significantly
- Use specialized types for dates, times, and timestamps
- Consider storage and performance implications of data types
- Use ENUM or CHECK constraints for columns with a limited set of values

### Constraints
- **NOT NULL**: Apply to columns that should never be null
- **UNIQUE**: Apply to columns or combinations that must have unique values
- **CHECK**: Use to enforce domain integrity
- **DEFAULT**: Provide sensible defaults for columns
- **FOREIGN KEY**: Enforce referential integrity
- **PRIMARY KEY**: Uniquely identify each row

## Schema Design Best Practices
- Use consistent naming conventions
- Prefix table names with domain or module
- Use singular nouns for table names
- Use lowercase with underscores for column names
- Avoid reserved words as table or column names
- Document all tables and columns with comments
- Keep column names concise but descriptive
- Include audit columns (created_at, updated_at) on all tables
- Consider soft deletes (is_deleted flag) instead of hard deletes
- Use junction tables for many-to-many relationships
- Implement hierarchical data using adjacency lists or nested sets

## Query Optimization
- Write queries to retrieve only needed columns
- Use appropriate JOINs (INNER, LEFT, RIGHT)
- Filter data as early as possible in the query
- Use EXISTS instead of IN for better performance with subqueries
- Avoid functions on indexed columns in WHERE clauses
- Use EXPLAIN/EXPLAIN ANALYZE to understand query execution plans
- Consider materialized views for complex, frequently-run queries
- Use appropriate isolation levels for transactions
- Implement pagination for large result sets
- Use prepared statements to avoid SQL injection and improve performance

## Common Anti-Patterns to Avoid
- Entity-Attribute-Value (EAV) tables
- Storing comma-separated values in a single column
- Overusing stored procedures for business logic
- Ignoring indexing needs
- Using natural keys for primary keys
- Not defining foreign key constraints
- Overusing triggers
- Implementing business logic in triggers
- Using SELECT * in production code
- Not parameterizing queries

## Performance Considerations
- Monitor query performance regularly
- Implement connection pooling
- Consider read replicas for read-heavy workloads
- Implement appropriate caching strategies
- Partition large tables by date or other logical divisions
- Use database-specific optimization features
- Consider table compression for large tables
- Implement proper maintenance routines (VACUUM, ANALYZE, etc.)
- Monitor and manage index fragmentation
- Use appropriate isolation levels for transactions

## Migration and Evolution
- Use database migration tools to manage schema changes
- Version all schema changes
- Make schema changes backward compatible when possible
- Test migrations thoroughly before applying to production
- Have rollback plans for all migrations
- Document all schema changes
- Consider the impact of schema changes on application code
- Implement zero-downtime migration strategies for production systems
