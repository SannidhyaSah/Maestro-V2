# PostgreSQL Database Guidelines

## Overview
PostgreSQL is a powerful, open-source object-relational database system with a strong reputation for reliability, feature robustness, and performance. It has earned a strong reputation for its proven architecture, data integrity, extensibility, and dedicated open-source community.

## Key Features and Strengths

### Core Features
- Full ACID compliance
- Advanced indexing (B-tree, Hash, GiST, SP-GiST, GIN, BRIN)
- Multi-version concurrency control (MVCC)
- Point-in-time recovery
- Table partitioning
- Asynchronous replication
- Stored procedures and functions in multiple languages
- Extensive data type support
- Full-text search
- JSON/JSONB support with indexing
- Foreign data wrappers
- Declarative table partitioning
- Parallel query execution

### Extensions Ecosystem
- PostGIS for geospatial data
- TimescaleDB for time-series data
- pg_stat_statements for query performance monitoring
- pgvector for vector similarity search
- pg_partman for partition management
- pg_repack for table reorganization
- pg_cron for scheduled jobs
- pgrouting for geospatial routing
- pgAudit for audit logging

## When to Use PostgreSQL
- For complex transactional applications requiring data integrity
- When advanced data types and indexing are needed
- For applications requiring both relational and document storage (via JSONB)
- When geospatial capabilities are required (via PostGIS)
- For systems that need robust security features
- When open-source licensing is preferred
- For applications that may need to scale vertically

## Schema Design Best Practices

### Table Design
- Use appropriate data types for columns
- Implement check constraints for data validation
- Use SERIAL or IDENTITY for auto-incrementing primary keys
- Consider UUID for distributed systems
- Implement foreign key constraints
- Use schemas to organize related tables
- Consider table partitioning for very large tables
- Document tables with COMMENT ON

### Indexing Strategy
- Index foreign key columns
- Create indexes for frequently queried columns
- Use partial indexes for filtered queries
- Consider covering indexes (INCLUDE) for performance
- Use expression indexes for computed values
- Implement GIN indexes for JSONB and array columns
- Monitor index usage with pg_stat_user_indexes
- Regularly reindex to prevent bloat

### Data Types
- Use appropriate numeric types (INTEGER, BIGINT, NUMERIC)
- Choose TEXT over VARCHAR for variable-length strings
- Use TIMESTAMP WITH TIME ZONE for timestamps
- Leverage specialized types (UUID, INET, CIDR, etc.)
- Consider ENUM types for constrained values
- Use JSONB for semi-structured data
- Implement domain types for reusable constraints

### Constraints
- Implement NOT NULL constraints where appropriate
- Use CHECK constraints for data validation
- Implement UNIQUE constraints for uniqueness
- Define appropriate foreign key constraints
- Consider EXCLUSION constraints for complex uniqueness
- Use DEFERRABLE constraints when needed for bulk operations

## Query Optimization

### General Optimization
- Use EXPLAIN ANALYZE to understand query plans
- Filter data as early as possible in queries
- Use appropriate JOIN types (INNER, LEFT, etc.)
- Implement pagination for large result sets
- Use CTEs for readability but be aware of optimization limitations
- Consider materialized views for complex, frequent queries
- Use prepared statements for parameterized queries
- Implement connection pooling

### PostgreSQL-Specific Optimizations
- Use JSONB_PATH_OPS for JSONB containment queries
- Leverage window functions for analytical queries
- Use LATERAL joins for correlated subqueries
- Implement partitioning for large tables
- Consider parallel query execution for large datasets
- Use appropriate isolation levels for transactions
- Leverage advisory locks for application-level locking
- Implement appropriate vacuum and analyze schedules

## Performance Tuning

### Configuration Parameters
- shared_buffers: 25% of system memory (up to 8GB)
- effective_cache_size: 50-75% of system memory
- work_mem: 4-64MB depending on complex query needs
- maintenance_work_mem: 64MB-1GB for maintenance operations
- wal_buffers: 16MB
- checkpoint_timeout: 15min
- max_connections: Based on application needs
- random_page_cost: 1.1 for SSDs, 4.0 for HDDs
- effective_io_concurrency: 200 for SSDs, 2 for HDDs
- autovacuum: Enable and tune based on workload

### Monitoring
- Use pg_stat_statements for query performance tracking
- Monitor table and index bloat
- Track cache hit ratios
- Monitor lock contention
- Implement regular EXPLAIN ANALYZE for critical queries
- Set up alerting for long-running queries
- Monitor replication lag for replicas
- Track connection usage

## High Availability and Scaling

### Replication
- Implement streaming replication for high availability
- Consider logical replication for selective data replication
- Set up appropriate WAL retention
- Monitor replication lag
- Implement connection pooling with failover
- Consider tools like Patroni for automated failover

### Scaling Strategies
- Vertical scaling for most workloads
- Read scaling with replicas
- Table partitioning for large tables
- Connection pooling (pgBouncer, Odyssey)
- Application-level sharding for extreme scale
- Consider Citus extension for distributed PostgreSQL

### Backup and Recovery
- Implement regular base backups
- Configure appropriate WAL archiving
- Test recovery procedures regularly
- Consider point-in-time recovery needs
- Implement monitoring for backup success
- Document recovery procedures thoroughly

## Security Best Practices

### Authentication
- Use scram-sha-256 authentication
- Implement SSL/TLS for connections
- Create role-based access control
- Use least privilege principle for roles
- Implement connection limits per role
- Consider client certificate authentication for sensitive systems

### Authorization
- Implement row-level security for multi-tenant applications
- Use schema-based separation for security boundaries
- Grant minimum necessary privileges
- Implement column-level privileges where needed
- Use security definer functions carefully
- Audit permission grants regularly

### Auditing
- Implement pgAudit for comprehensive audit logging
- Configure log_statement for query logging
- Set up log analysis and alerting
- Implement application-level audit trails
- Consider regulatory compliance requirements

## Migration and Upgrade

### Version Upgrades
- Test upgrades in staging environment
- Use pg_upgrade for major version upgrades
- Plan for appropriate downtime
- Verify extension compatibility
- Update configuration parameters for new version
- Test application compatibility thoroughly

### Data Migration
- Use COPY for efficient data loading
- Consider foreign data wrappers for cross-database migration
- Implement validation checks post-migration
- Plan for appropriate indexes during migration
- Document migration procedures thoroughly
