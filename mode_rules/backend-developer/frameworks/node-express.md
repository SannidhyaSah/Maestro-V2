# Node.js with Express Framework - Backend Developer Rules

## Overview
These rules extend the core Backend Developer rules specifically for Node.js and Express-based projects. When implementing backend features using Node.js and Express, you must follow these guidelines to ensure high-quality, maintainable, and performant code.

## Node.js and Express-Specific Implementation Guidelines

### 1. Project Structure
- **Required Approach**:
  - Use a modular, feature-based structure
  - Separate routes, controllers, services, and models
  - Implement middleware in dedicated files
  - Use environment-based configuration
  - Separate business logic from HTTP handling
  - Implement proper error handling middleware
  - Use a consistent file naming convention

### 2. Express Configuration
- **Required Approach**:
  - Use helmet for security headers
  - Implement CORS with appropriate restrictions
  - Use compression for response compression
  - Implement proper body parsing middleware
  - Configure rate limiting for API endpoints
  - Use morgan or winston for request logging
  - Implement proper error handling middleware

### 3. API Implementation
- **Required Approach**:
  - Use Express Router for route organization
  - Implement controller pattern for route handlers
  - Validate request inputs with Joi or express-validator
  - Use consistent response formats
  - Implement proper HTTP status codes
  - Document API with Swagger/OpenAPI
  - Implement versioning for APIs

### 4. Authentication and Authorization
- **Required Approach**:
  - Use JWT for stateless authentication
  - Implement proper token validation
  - Use secure cookie options for web applications
  - Implement role-based access control
  - Use middleware for authorization checks
  - Store passwords with bcrypt or Argon2
  - Implement proper session management if needed

### 5. Database Integration
- **Required Approach**:
  - Use Mongoose for MongoDB or Sequelize/Prisma for SQL
  - Implement repository pattern for data access
  - Use connection pooling for SQL databases
  - Implement proper indexing strategy
  - Use transactions for multi-step operations
  - Implement data validation at the model level
  - Use query builders for complex queries

### 6. Error Handling
- **Required Approach**:
  - Implement centralized error handling middleware
  - Create custom error classes for different error types
  - Use async/await with try/catch
  - Implement proper error logging
  - Return appropriate HTTP status codes
  - Avoid exposing sensitive information in errors
  - Handle uncaught exceptions and unhandled rejections

### 7. Testing
- **Required Approach**:
  - Use Jest or Mocha for testing
  - Implement supertest for API testing
  - Use mock databases for testing
  - Implement proper test fixtures
  - Test error handling and edge cases
  - Implement proper test coverage
  - Use test-driven development where appropriate

## Node.js and Express Project Structure
For Node.js and Express projects, organize your code following this structure:

```
src/
├── config/                 # Configuration files
│   ├── database.js         # Database configuration
│   ├── express.js          # Express configuration
│   └── environment.js      # Environment variables
├── api/                    # API implementation
│   ├── routes/             # Route definitions
│   ├── controllers/        # Request handlers
│   ├── services/           # Business logic
│   ├── models/             # Data models
│   ├── middleware/         # Custom middleware
│   └── validators/         # Request validators
├── utils/                  # Utility functions
│   ├── logger.js           # Logging utility
│   ├── errors.js           # Custom error classes
│   └── helpers.js          # Helper functions
├── tests/                  # Test files
│   ├── unit/               # Unit tests
│   ├── integration/        # Integration tests
│   └── fixtures/           # Test fixtures
├── app.js                  # Express application setup
└── server.js               # Server entry point
```

## Express Route Template
Use this template for creating new Express routes:

```javascript
const express = require('express');
const { validate } = require('../middleware/validate');
const { authenticate, authorize } = require('../middleware/auth');
const controller = require('../controllers/resource.controller');
const validation = require('../validators/resource.validator');

const router = express.Router();

/**
 * @swagger
 * /api/resources:
 *   get:
 *     summary: Get all resources
 *     description: Retrieve a list of all resources
 *     responses:
 *       200:
 *         description: A list of resources
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /api/resources/{id}:
 *   get:
 *     summary: Get a resource by ID
 *     description: Retrieve a resource by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the resource
 *     responses:
 *       200:
 *         description: A resource object
 *       404:
 *         description: Resource not found
 */
router.get('/:id', validate(validation.getById), controller.getById);

/**
 * @swagger
 * /api/resources:
 *   post:
 *     summary: Create a new resource
 *     description: Create a new resource with the provided data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resource'
 *     responses:
 *       201:
 *         description: Created resource
 *       400:
 *         description: Invalid input
 */
router.post(
  '/',
  authenticate,
  authorize('admin'),
  validate(validation.create),
  controller.create
);

/**
 * @swagger
 * /api/resources/{id}:
 *   put:
 *     summary: Update a resource
 *     description: Update a resource with the provided data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the resource
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resource'
 *     responses:
 *       200:
 *         description: Updated resource
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Resource not found
 */
router.put(
  '/:id',
  authenticate,
  authorize('admin'),
  validate(validation.update),
  controller.update
);

/**
 * @swagger
 * /api/resources/{id}:
 *   delete:
 *     summary: Delete a resource
 *     description: Delete a resource by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the resource
 *     responses:
 *       204:
 *         description: Resource deleted
 *       404:
 *         description: Resource not found
 */
router.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  validate(validation.delete),
  controller.delete
);

module.exports = router;
```

## Express Controller Template
Use this template for creating new Express controllers:

```javascript
const { StatusCodes } = require('http-status-codes');
const service = require('../services/resource.service');
const { ApiError } = require('../../utils/errors');

/**
 * Get all resources
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort, filter } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort,
      filter
    };
    
    const result = await service.getAll(options);
    
    res.status(StatusCodes.OK).json({
      success: true,
      data: result.data,
      pagination: result.pagination
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get resource by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resource = await service.getById(id);
    
    if (!resource) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Resource not found');
    }
    
    res.status(StatusCodes.OK).json({
      success: true,
      data: resource
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create new resource
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.create = async (req, res, next) => {
  try {
    const resource = await service.create(req.body);
    
    res.status(StatusCodes.CREATED).json({
      success: true,
      data: resource
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update resource
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const resource = await service.update(id, req.body);
    
    if (!resource) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Resource not found');
    }
    
    res.status(StatusCodes.OK).json({
      success: true,
      data: resource
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete resource
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.delete(id);
    
    if (!result) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Resource not found');
    }
    
    res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};
```

## Node.js and Express Best Practices
When implementing Node.js and Express applications, follow these best practices:

1. **Asynchronous Programming**:
   - Use async/await for asynchronous operations
   - Avoid callback hell with promises
   - Handle promise rejections properly
   - Use Promise.all for parallel operations
   - Implement proper error handling for async code
   - Consider using promisify for callback-based APIs
   - Use async middleware for Express

2. **Security**:
   - Use helmet to set security headers
   - Implement proper CORS configuration
   - Validate and sanitize all inputs
   - Use parameterized queries for database operations
   - Implement rate limiting for API endpoints
   - Use HTTPS in production
   - Keep dependencies up to date

3. **Performance**:
   - Use compression middleware
   - Implement proper caching strategies
   - Optimize database queries
   - Use connection pooling
   - Consider using clustering for multi-core systems
   - Implement proper logging levels
   - Use streaming for large files

4. **Error Handling**:
   - Implement centralized error handling
   - Create custom error classes
   - Log errors with proper context
   - Return appropriate HTTP status codes
   - Avoid exposing stack traces in production
   - Handle uncaught exceptions and unhandled rejections
   - Use try/catch with async/await

5. **Testing**:
   - Write unit tests for business logic
   - Implement integration tests for API endpoints
   - Use mock objects for external dependencies
   - Test error handling and edge cases
   - Implement proper test coverage
   - Use test-driven development where appropriate
   - Automate testing in CI/CD pipeline
