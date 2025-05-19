# MongoDB Database Guidelines

## Overview
MongoDB is a document-oriented NoSQL database that stores data in flexible, JSON-like documents. It provides high performance, high availability, and automatic scaling, making it popular for modern web applications, mobile apps, and other use cases requiring flexible schema design.

## Key Features and Strengths

### Core Features
- Document-oriented storage (BSON format)
- Flexible schema design
- Rich query language
- Secondary indexes
- Aggregation framework
- Full-text search
- Geospatial indexing and queries
- Time-series collections
- Transactions (multi-document)
- Change streams for real-time data changes
- Horizontal scaling via sharding
- High availability via replica sets
- Atlas cloud platform

### Ecosystem
- MongoDB Compass (GUI)
- MongoDB Charts (visualization)
- MongoDB Realm (mobile and edge computing)
- MongoDB BI Connector (SQL interface)
- MongoDB Atlas Search (full-text search)
- MongoDB Atlas Data Lake
- MongoDB Atlas Online Archive

## When to Use MongoDB
- For applications requiring flexible schema design
- When rapid development and iteration are priorities
- For document-oriented data models
- When horizontal scalability is required
- For real-time analytics and reporting
- For content management systems
- For mobile and IoT applications
- When working with semi-structured or unstructured data
- For event sourcing and time-series data

## Schema Design Best Practices

### Document Design
- Design documents based on access patterns
- Embed related data that is accessed together
- Reference data that is accessed independently or shared
- Limit document size (16MB maximum)
- Consider document growth over time
- Use descriptive field names
- Follow consistent naming conventions
- Include schema version field for evolution

### Embedding vs. Referencing
- **Embed when**:
  - Data belongs to the parent and is not shared
  - Data is always accessed with the parent
  - Data cardinality is low (one-to-few)
  - Data doesn't grow unbounded
- **Reference when**:
  - Data is shared across multiple parents
  - Data is accessed independently
  - Data cardinality is high (one-to-many, many-to-many)
  - Data is large or grows significantly

### Indexing Strategy
- Create indexes for frequent query patterns
- Use compound indexes for multi-field queries
- Consider index order for range and equality queries
- Implement text indexes for full-text search
- Use geospatial indexes for location data
- Create partial indexes for filtered queries
- Monitor index size and usage
- Avoid over-indexing (impacts write performance)

### Data Types
- Use appropriate BSON types
- Store dates as ISODate objects, not strings
- Use ObjectId for document IDs
- Consider UUID for distributed systems
- Use NumberDecimal for financial calculations
- Leverage arrays for one-to-few relationships
- Use subdocuments for structured data

## Query Optimization

### General Optimization
- Use explain() to analyze query performance
- Ensure queries are covered by indexes
- Filter documents as early as possible
- Project only needed fields
- Use appropriate operators ($eq, $in, etc.)
- Implement pagination for large result sets
- Consider collation for string comparisons
- Use hint() to force index selection when needed

### Aggregation Pipeline Optimization
- Filter documents early in the pipeline
- Use indexes for $match stages
- Place $project and $unwind after $match when possible
- Use $limit and $skip for pagination
- Consider memory limits for large aggregations
- Use allowDiskUse for complex aggregations
- Break complex pipelines into stages with $out
- Monitor pipeline performance with explain()

### MongoDB-Specific Optimizations
- Use covered queries when possible
- Leverage the aggregation framework for complex operations
- Implement read concern and write concern appropriate for your use case
- Use change streams for real-time updates
- Consider time-series collections for time-series data
- Implement appropriate read preference for replica sets
- Use causal consistency when needed

## Performance Tuning

### Configuration Parameters
- wiredTigerCacheSizeGB: 50-60% of RAM
- maxIncomingConnections: Based on application needs
- oplogSizeMB: Sufficient for replication window
- notablescan: Consider for production to prevent full collection scans
- profiling: Configure for performance monitoring
- cursorTimeoutMillis: Adjust based on application needs

### Monitoring
- Use MongoDB Atlas monitoring
- Monitor query performance with profiler
- Track index usage
- Monitor memory usage
- Track operation counts and latencies
- Set up alerting for slow queries
- Monitor replication lag
- Track connection usage

## High Availability and Scaling

### Replica Sets
- Deploy with at least 3 nodes for production
- Distribute across availability zones
- Configure appropriate write concern
- Implement read preference based on use case
- Monitor replication lag
- Set up automated failover
- Consider hidden members for backups and analytics

### Sharding
- Choose appropriate shard key
- Avoid monotonically increasing shard keys
- Consider compound shard keys for better distribution
- Implement zones for data locality
- Monitor chunk distribution
- Plan for appropriate initial number of shards
- Consider pre-splitting for large initial loads

### Backup and Recovery
- Implement regular backups
- Consider point-in-time recovery needs
- Test recovery procedures regularly
- Implement monitoring for backup success
- Document recovery procedures thoroughly
- Consider MongoDB Atlas backup for managed service

## Security Best Practices

### Authentication
- Enable authentication
- Use SCRAM authentication
- Implement x.509 certificates for internal cluster auth
- Consider LDAP or Kerberos integration
- Rotate credentials regularly
- Use connection strings with authentication parameters

### Authorization
- Implement role-based access control
- Create custom roles with least privilege
- Use database-level roles for multi-tenant applications
- Implement field-level redaction when needed
- Audit permission grants regularly
- Consider client-side field level encryption for sensitive data

### Network Security
- Enable TLS/SSL for all connections
- Configure IP whitelisting
- Use VPC peering in cloud environments
- Implement network isolation for cluster traffic
- Consider MongoDB Atlas Private Endpoint
- Use secure configuration defaults

### Auditing
- Enable auditing for security events
- Configure appropriate audit filters
- Set up log analysis and alerting
- Consider regulatory compliance requirements
- Implement application-level audit trails

## Migration and Upgrade

### Version Upgrades
- Test upgrades in staging environment
- Follow the recommended upgrade path
- Plan for appropriate downtime
- Verify driver compatibility
- Update configuration parameters for new version
- Test application compatibility thoroughly

### Data Migration
- Use mongodump/mongorestore for smaller datasets
- Consider MongoDB Atlas Live Migration
- Implement validation checks post-migration
- Plan for appropriate indexes during migration
- Document migration procedures thoroughly
- Consider dual-write patterns for zero-downtime migration
