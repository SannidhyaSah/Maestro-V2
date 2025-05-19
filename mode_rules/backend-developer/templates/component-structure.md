# Backend Component Structure Templates

## Overview
This document provides standardized templates for component structure across different backend frameworks. These templates should be used as a starting point for creating new components to ensure consistency and maintainability.

## Node.js/Express Component Templates

### Express Controller
```javascript
/**
 * Resource controller for handling resource-related operations
 * @module controllers/resource
 */

const resourceService = require('../services/resource.service');
const { validateResource } = require('../validators/resource.validator');
const logger = require('../utils/logger');

/**
 * Get all resources with optional filtering
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, sort } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      status,
      sort
    };
    
    const result = await resourceService.getAll(options);
    
    res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination
    });
  } catch (error) {
    logger.error('Error in getAll resources', { error: error.message, stack: error.stack });
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
    const resource = await resourceService.getById(id);
    
    if (!resource) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Resource not found'
        }
      });
    }
    
    res.status(200).json({
      success: true,
      data: resource
    });
  } catch (error) {
    logger.error('Error in getById resource', { id: req.params.id, error: error.message });
    next(error);
  }
};

/**
 * Create a new resource
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.create = async (req, res, next) => {
  try {
    const { error, value } = validateResource(req.body);
    
    if (error) {
      return res.status(422).json({
        success: false,
        error: {
          message: 'Validation error',
          details: error.details.map(detail => ({
            field: detail.path[0],
            message: detail.message
          }))
        }
      });
    }
    
    const resource = await resourceService.create(value);
    
    res.status(201).json({
      success: true,
      data: resource
    });
  } catch (error) {
    logger.error('Error in create resource', { body: req.body, error: error.message });
    next(error);
  }
};

/**
 * Update an existing resource
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = validateResource(req.body, true);
    
    if (error) {
      return res.status(422).json({
        success: false,
        error: {
          message: 'Validation error',
          details: error.details.map(detail => ({
            field: detail.path[0],
            message: detail.message
          }))
        }
      });
    }
    
    const resource = await resourceService.update(id, value);
    
    if (!resource) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Resource not found'
        }
      });
    }
    
    res.status(200).json({
      success: true,
      data: resource
    });
  } catch (error) {
    logger.error('Error in update resource', { id: req.params.id, body: req.body, error: error.message });
    next(error);
  }
};

/**
 * Delete a resource
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await resourceService.delete(id);
    
    if (!result) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Resource not found'
        }
      });
    }
    
    res.status(204).send();
  } catch (error) {
    logger.error('Error in delete resource', { id: req.params.id, error: error.message });
    next(error);
  }
};
```

### Express Service
```javascript
/**
 * Resource service for business logic related to resources
 * @module services/resource
 */

const Resource = require('../models/resource.model');
const { NotFoundError, DatabaseError } = require('../utils/errors');
const logger = require('../utils/logger');

/**
 * Get all resources with optional filtering
 * @param {Object} options - Query options
 * @param {number} options.page - Page number
 * @param {number} options.limit - Items per page
 * @param {string} options.status - Filter by status
 * @param {string} options.sort - Sort field and direction
 * @returns {Promise<Object>} Resources and pagination info
 */
exports.getAll = async (options) => {
  try {
    const { page = 1, limit = 10, status, sort } = options;
    const skip = (page - 1) * limit;
    
    // Build query
    const query = {};
    if (status) {
      query.status = status;
    }
    
    // Build sort
    const sortOptions = {};
    if (sort) {
      const [field, direction] = sort.split(':');
      sortOptions[field] = direction === 'desc' ? -1 : 1;
    } else {
      sortOptions.createdAt = -1; // Default sort
    }
    
    // Execute query
    const [resources, total] = await Promise.all([
      Resource.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .lean(),
      Resource.countDocuments(query)
    ]);
    
    // Calculate pagination
    const totalPages = Math.ceil(total / limit);
    
    return {
      data: resources,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  } catch (error) {
    logger.error('Error in getAll resources service', { error: error.message });
    throw new DatabaseError('Failed to fetch resources');
  }
};

/**
 * Get resource by ID
 * @param {string} id - Resource ID
 * @returns {Promise<Object>} Resource object
 */
exports.getById = async (id) => {
  try {
    const resource = await Resource.findById(id).lean();
    
    if (!resource) {
      throw new NotFoundError(`Resource with ID ${id} not found`);
    }
    
    return resource;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    
    logger.error('Error in getById resource service', { id, error: error.message });
    throw new DatabaseError(`Failed to fetch resource with ID ${id}`);
  }
};

/**
 * Create a new resource
 * @param {Object} data - Resource data
 * @returns {Promise<Object>} Created resource
 */
exports.create = async (data) => {
  try {
    const resource = new Resource(data);
    await resource.save();
    return resource.toObject();
  } catch (error) {
    logger.error('Error in create resource service', { data, error: error.message });
    throw new DatabaseError('Failed to create resource');
  }
};

/**
 * Update an existing resource
 * @param {string} id - Resource ID
 * @param {Object} data - Updated resource data
 * @returns {Promise<Object>} Updated resource
 */
exports.update = async (id, data) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    ).lean();
    
    if (!resource) {
      throw new NotFoundError(`Resource with ID ${id} not found`);
    }
    
    return resource;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    
    logger.error('Error in update resource service', { id, data, error: error.message });
    throw new DatabaseError(`Failed to update resource with ID ${id}`);
  }
};

/**
 * Delete a resource
 * @param {string} id - Resource ID
 * @returns {Promise<boolean>} True if deleted, false if not found
 */
exports.delete = async (id) => {
  try {
    const result = await Resource.findByIdAndDelete(id);
    
    if (!result) {
      throw new NotFoundError(`Resource with ID ${id} not found`);
    }
    
    return true;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    
    logger.error('Error in delete resource service', { id, error: error.message });
    throw new DatabaseError(`Failed to delete resource with ID ${id}`);
  }
};
```

## Spring Boot Component Templates

### Spring Boot Controller
```java
package com.example.api.controller;

import com.example.api.dto.ResourceDTO;
import com.example.api.dto.ResourceRequest;
import com.example.api.dto.ResponseDTO;
import com.example.api.dto.PaginationDTO;
import com.example.api.service.ResourceService;
import com.example.api.exception.ResourceNotFoundException;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for managing resources
 */
@RestController
@RequestMapping("/api/resources")
@RequiredArgsConstructor
@Slf4j
public class ResourceController {

    private final ResourceService resourceService;

    /**
     * GET /api/resources : Get all resources
     * 
     * @param status optional status filter
     * @param pageable pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of resources
     */
    @GetMapping
    public ResponseEntity<ResponseDTO<Page<ResourceDTO>>> getAllResources(
            @RequestParam(required = false) String status,
            @PageableDefault(size = 10) Pageable pageable) {
        
        log.debug("REST request to get resources with status: {}", status);
        Page<ResourceDTO> page = resourceService.findAll(status, pageable);
        
        PaginationDTO pagination = PaginationDTO.builder()
                .totalItems(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .currentPage(page.getNumber())
                .pageSize(page.getSize())
                .build();
        
        ResponseDTO<Page<ResourceDTO>> response = ResponseDTO.<Page<ResourceDTO>>builder()
                .success(true)
                .data(page)
                .pagination(pagination)
                .build();
        
        return ResponseEntity.ok(response);
    }

    /**
     * GET /api/resources/:id : Get resource by id
     * 
     * @param id the id of the resource to retrieve
     * @return the ResponseEntity with status 200 (OK) and the resource, or with status 404 (Not Found)
     */
    @GetMapping("/{id}")
    public ResponseEntity<ResponseDTO<ResourceDTO>> getResourceById(@PathVariable Long id) {
        log.debug("REST request to get Resource : {}", id);
        
        try {
            ResourceDTO resource = resourceService.findById(id);
            
            ResponseDTO<ResourceDTO> response = ResponseDTO.<ResourceDTO>builder()
                    .success(true)
                    .data(resource)
                    .build();
            
            return ResponseEntity.ok(response);
        } catch (ResourceNotFoundException e) {
            ResponseDTO<ResourceDTO> response = ResponseDTO.<ResourceDTO>builder()
                    .success(false)
                    .error(e.getMessage())
                    .build();
            
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    /**
     * POST /api/resources : Create a new resource
     * 
     * @param request the resource to create
     * @return the ResponseEntity with status 201 (Created) and the new resource
     */
    @PostMapping
    public ResponseEntity<ResponseDTO<ResourceDTO>> createResource(
            @Valid @RequestBody ResourceRequest request) {
        
        log.debug("REST request to create Resource : {}", request);
        ResourceDTO result = resourceService.create(request);
        
        ResponseDTO<ResourceDTO> response = ResponseDTO.<ResourceDTO>builder()
                .success(true)
                .data(result)
                .build();
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * PUT /api/resources/:id : Update an existing resource
     * 
     * @param id the id of the resource to update
     * @param request the resource to update
     * @return the ResponseEntity with status 200 (OK) and the updated resource
     */
    @PutMapping("/{id}")
    public ResponseEntity<ResponseDTO<ResourceDTO>> updateResource(
            @PathVariable Long id,
            @Valid @RequestBody ResourceRequest request) {
        
        log.debug("REST request to update Resource : {}", id);
        
        try {
            ResourceDTO result = resourceService.update(id, request);
            
            ResponseDTO<ResourceDTO> response = ResponseDTO.<ResourceDTO>builder()
                    .success(true)
                    .data(result)
                    .build();
            
            return ResponseEntity.ok(response);
        } catch (ResourceNotFoundException e) {
            ResponseDTO<ResourceDTO> response = ResponseDTO.<ResourceDTO>builder()
                    .success(false)
                    .error(e.getMessage())
                    .build();
            
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    /**
     * DELETE /api/resources/:id : Delete a resource
     * 
     * @param id the id of the resource to delete
     * @return the ResponseEntity with status 204 (NO_CONTENT)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResource(@PathVariable Long id) {
        log.debug("REST request to delete Resource : {}", id);
        
        try {
            resourceService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
```

## Django Component Templates

### Django View
```python
from rest_framework import viewsets, status, filters
from rest_framework.response import Response
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from django.db import transaction
from django.core.exceptions import ValidationError

from .models import Resource
from .serializers import ResourceSerializer, ResourceCreateSerializer
from .filters import ResourceFilter
from .permissions import ResourcePermission

import logging

logger = logging.getLogger(__name__)

class ResourceViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing resources
    """
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    permission_classes = [ResourcePermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ResourceFilter
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at', 'updated_at']
    ordering = ['-created_at']

    def get_serializer_class(self):
        """
        Return appropriate serializer class based on the request
        """
        if self.action in ['create', 'update', 'partial_update']:
            return ResourceCreateSerializer
        return ResourceSerializer

    def get_queryset(self):
        """
        Filter queryset based on user permissions
        """
        queryset = super().get_queryset()
        
        # Apply additional filters based on user
        if not self.request.user.is_staff:
            queryset = queryset.filter(owner=self.request.user)
            
        return queryset

    def list(self, request, *args, **kwargs):
        """
        List resources with pagination
        """
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
            
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'success': True,
            'data': serializer.data
        })

    def retrieve(self, request, *args, **kwargs):
        """
        Get a resource by ID
        """
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response({
                'success': True,
                'data': serializer.data
            })
        except Exception as e:
            logger.error(f"Error retrieving resource: {str(e)}")
            return Response({
                'success': False,
                'error': {
                    'message': 'Resource not found'
                }
            }, status=status.HTTP_404_NOT_FOUND)

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        """
        Create a new resource
        """
        serializer = self.get_serializer(data=request.data)
        
        try:
            serializer.is_valid(raise_exception=True)
            instance = serializer.save(owner=request.user)
            response_serializer = ResourceSerializer(instance)
            
            return Response({
                'success': True,
                'data': response_serializer.data
            }, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            logger.error(f"Validation error creating resource: {str(e)}")
            return Response({
                'success': False,
                'error': {
                    'message': 'Validation error',
                    'details': e.detail if hasattr(e, 'detail') else str(e)
                }
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Error creating resource: {str(e)}")
            return Response({
                'success': False,
                'error': {
                    'message': 'Failed to create resource'
                }
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=True, methods=['post'])
    def archive(self, request, pk=None):
        """
        Archive a resource
        """
        try:
            instance = self.get_object()
            instance.status = 'archived'
            instance.save()
            
            serializer = self.get_serializer(instance)
            return Response({
                'success': True,
                'data': serializer.data
            })
        except Exception as e:
            logger.error(f"Error archiving resource: {str(e)}")
            return Response({
                'success': False,
                'error': {
                    'message': 'Failed to archive resource'
                }
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
```

## Component Documentation Template

When documenting backend components, use this template:

```markdown
# Component Name

## Overview
Brief description of the component's purpose and main functionality.

## Dependencies
- List of dependencies and required services
- External libraries or frameworks used
- Configuration requirements

## API Reference

### Method/Endpoint Name
- **Description**: Brief description of what this method/endpoint does
- **URL** (for API endpoints): `/api/resources`
- **Method** (for API endpoints): `GET`
- **Parameters**:
  - `param1` (type): Description of parameter
  - `param2` (type): Description of parameter
- **Returns**:
  - Success response structure and codes
  - Error response structure and codes
- **Example**:
  ```json
  // Request
  GET /api/resources?status=active

  // Response
  {
    "success": true,
    "data": [
      {
        "id": "123",
        "name": "Example Resource",
        "status": "active"
      }
    ],
    "pagination": {
      "total": 1,
      "page": 1,
      "limit": 10
    }
  }
  ```

## Error Handling
Description of how errors are handled in this component.

## Security Considerations
Notes on security features and considerations.

## Performance Considerations
Notes on performance optimizations or potential issues.

## Testing
Guidance on how to test this component.
```
