# NoSQL Databases - Backend Developer Rules

## Overview
These rules provide guidelines for implementing backend features with NoSQL databases (MongoDB, DynamoDB, Cassandra, etc.). When working with NoSQL databases, you must follow these guidelines to ensure data integrity, performance, and security.

## NoSQL Database Implementation Guidelines

### 1. Data Modeling
- **Required Approach**:
  - Design data models based on access patterns
  - Consider embedding vs. referencing for relationships
  - Denormalize data when appropriate
  - Design for query efficiency
  - Consider data growth and evolution
  - Document data model decisions
  - Implement proper validation

### 2. Query Optimization
- **Required Approach**:
  - Design indexes based on query patterns
  - Use appropriate query operators
  - Implement pagination for large result sets
  - Avoid full collection scans
  - Monitor and analyze query performance
  - Use projection to limit returned fields
  - Consider query caching

### 3. Indexing Strategy
- **Required Approach**:
  - Index fields used in query filters
  - Index fields used for sorting
  - Consider compound indexes for multi-field queries
  - Avoid over-indexing (balance with write performance)
  - Monitor index size and usage
  - Consider partial indexes where supported
  - Document indexing strategy

### 4. Consistency and Transactions
- **Required Approach**:
  - Understand consistency model of the database
  - Use transactions when available and appropriate
  - Implement optimistic concurrency control
  - Design for eventual consistency when necessary
  - Handle partial failures gracefully
  - Document consistency requirements
  - Test concurrent operations

### 5. Security
- **Required Approach**:
  - Implement proper authentication and authorization
  - Use principle of least privilege
  - Encrypt sensitive data
  - Validate and sanitize all inputs
  - Implement proper access controls
  - Audit database access
  - Secure connection strings and credentials

### 6. Performance Monitoring
- **Required Approach**:
  - Monitor query performance
  - Identify and optimize slow queries
  - Monitor database size and growth
  - Implement proper caching strategies
  - Monitor connection usage
  - Use database profiling tools
  - Implement proper logging

### 7. Scaling and Sharding
- **Required Approach**:
  - Design for horizontal scaling
  - Choose appropriate shard keys
  - Understand replication and consistency implications
  - Monitor shard balance
  - Implement proper backup and recovery procedures
  - Test scaling scenarios
  - Document scaling strategy

## Database-Specific Guidelines

### MongoDB
- Choose appropriate data types
- Use MongoDB aggregation pipeline for complex queries
- Implement proper indexing strategy
- Use change streams for real-time updates
- Implement proper validation schemas
- Use transactions for multi-document operations
- Consider time-series collections for time-series data

### DynamoDB
- Design for single-table patterns when appropriate
- Use sparse indexes for optional attributes
- Implement proper partition key design
- Use Global Secondary Indexes strategically
- Consider DynamoDB Streams for event-driven architecture
- Implement proper capacity planning
- Use TTL for data expiration

### Cassandra
- Design for partition key distribution
- Minimize the number of partitions read
- Avoid large partitions
- Use materialized views for query optimization
- Implement proper compaction strategy
- Consider lightweight transactions for consistency
- Design for high write throughput

## NoSQL Query Templates

### MongoDB CRUD Operations

```javascript
// Create (Insert)
db.collection.insertOne({
  name: "Product Name",
  price: 29.99,
  category: "Electronics",
  tags: ["gadget", "new"],
  created_at: new Date()
});

// Read (Find)
db.collection.find({
  category: "Electronics",
  price: { $lt: 100 }
})
.sort({ price: 1 })
.limit(10)
.skip(20);

// Update
db.collection.updateOne(
  { _id: ObjectId("...") },
  { 
    $set: { price: 39.99, updated_at: new Date() },
    $push: { tags: "sale" }
  }
);

// Delete
db.collection.deleteOne({ _id: ObjectId("...") });
```

### MongoDB Aggregation Pipeline

```javascript
db.orders.aggregate([
  // Stage 1: Filter documents
  { $match: { status: "completed", order_date: { $gte: ISODate("2023-01-01") } } },
  
  // Stage 2: Group by category and calculate statistics
  { $group: {
      _id: "$product_category",
      total_sales: { $sum: "$total" },
      average_order: { $avg: "$total" },
      count: { $sum: 1 }
  }},
  
  // Stage 3: Sort by total sales
  { $sort: { total_sales: -1 } },
  
  // Stage 4: Add calculated fields
  { $addFields: {
      percentage_of_total: { $multiply: [{ $divide: ["$total_sales", total_sum] }, 100] }
  }},
  
  // Stage 5: Project only needed fields
  { $project: {
      category: "$_id",
      total_sales: 1,
      average_order: 1,
      count: 1,
      percentage_of_total: 1,
      _id: 0
  }}
]);
```

### DynamoDB Operations

```javascript
// Create (Put)
const params = {
  TableName: 'Products',
  Item: {
    'ProductId': { S: 'prod-123' },
    'Category': { S: 'Electronics' },
    'Name': { S: 'Smartphone' },
    'Price': { N: '599.99' },
    'Tags': { SS: ['gadget', 'new'] },
    'CreatedAt': { S: new Date().toISOString() }
  }
};
await dynamoDb.putItem(params).promise();

// Read (Get)
const params = {
  TableName: 'Products',
  Key: {
    'ProductId': { S: 'prod-123' }
  }
};
const result = await dynamoDb.getItem(params).promise();

// Query
const params = {
  TableName: 'Products',
  IndexName: 'CategoryPriceIndex',
  KeyConditionExpression: 'Category = :category AND Price < :price',
  ExpressionAttributeValues: {
    ':category': { S: 'Electronics' },
    ':price': { N: '1000' }
  },
  Limit: 10
};
const result = await dynamoDb.query(params).promise();

// Update
const params = {
  TableName: 'Products',
  Key: {
    'ProductId': { S: 'prod-123' }
  },
  UpdateExpression: 'SET Price = :price, UpdatedAt = :updatedAt, #tags = list_append(#tags, :newTag)',
  ExpressionAttributeNames: {
    '#tags': 'Tags'
  },
  ExpressionAttributeValues: {
    ':price': { N: '499.99' },
    ':updatedAt': { S: new Date().toISOString() },
    ':newTag': { SS: ['sale'] }
  },
  ReturnValues: 'UPDATED_NEW'
};
const result = await dynamoDb.updateItem(params).promise();

// Delete
const params = {
  TableName: 'Products',
  Key: {
    'ProductId': { S: 'prod-123' }
  }
};
await dynamoDb.deleteItem(params).promise();
```

## NoSQL Best Practices

### 1. Data Modeling
- **Required Practices**:
  - Model data based on access patterns
  - Denormalize data for query efficiency
  - Consider data growth and evolution
  - Document data model decisions
  - Implement proper validation
  - Consider versioning for schema evolution
  - Balance between embedding and referencing

### 2. Performance
- **Required Practices**:
  - Design efficient indexes
  - Implement pagination for large result sets
  - Monitor and optimize slow queries
  - Use projection to limit returned fields
  - Implement proper caching strategies
  - Consider read vs. write optimization
  - Monitor database performance

### 3. Security
- **Required Practices**:
  - Implement proper authentication and authorization
  - Validate and sanitize all inputs
  - Encrypt sensitive data
  - Use principle of least privilege
  - Audit database access
  - Secure connection strings and credentials
  - Implement proper error handling

### 4. Scalability
- **Required Practices**:
  - Design for horizontal scaling
  - Choose appropriate partition/shard keys
  - Monitor database size and growth
  - Implement proper backup and recovery procedures
  - Test scaling scenarios
  - Document scaling strategy
  - Consider multi-region deployment

### 5. Consistency
- **Required Practices**:
  - Understand consistency model of the database
  - Use transactions when available and appropriate
  - Design for eventual consistency when necessary
  - Handle partial failures gracefully
  - Document consistency requirements
  - Test concurrent operations
  - Implement optimistic concurrency control

## ODM/SDK Integration

### 1. ODM/SDK Best Practices
- **Required Practices**:
  - Understand the queries generated by the ODM/SDK
  - Use appropriate data mapping
  - Implement proper validation
  - Use transactions when available
  - Consider using native queries for complex operations
  - Implement proper error handling
  - Monitor performance

### 2. Common ODM/SDK Pitfalls
- **Required Awareness**:
  - N+1 query problem
  - Inefficient query generation
  - Excessive memory usage with large result sets
  - Improper error handling
  - Lack of validation
  - Connection management issues
  - Improper transaction management

### 3. Framework-Specific ODM/SDK Guidelines

#### Mongoose (MongoDB with Node.js)
- Use appropriate schema design
- Implement proper validation
- Use middleware for common operations
- Consider lean queries for read-only operations
- Implement proper indexing
- Use aggregation pipeline for complex queries
- Monitor query performance

#### Spring Data MongoDB (MongoDB with Java)
- Use appropriate annotations
- Implement proper repository design
- Use query methods for simple queries
- Consider MongoTemplate for complex operations
- Implement proper indexing
- Use aggregation framework for complex queries
- Monitor query performance

#### AWS SDK (DynamoDB)
- Use DynamoDB Document Client for simpler operations
- Implement proper error handling
- Use batch operations for bulk operations
- Consider using transactions for consistency
- Implement proper retry logic
- Use pagination for large result sets
- Monitor throughput consumption
