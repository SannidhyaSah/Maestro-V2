# Django Framework - Backend Developer Rules

## Overview
These rules extend the core Backend Developer rules specifically for Django-based projects. When implementing backend features using Django, you must follow these guidelines to ensure high-quality, maintainable, and performant code.

## Django-Specific Implementation Guidelines

### 1. Project Structure
- **Required Approach**:
  - Use a modular, app-based structure
  - Follow Django's MTV (Model-Template-View) pattern
  - Organize code by feature or domain
  - Implement proper settings management
  - Separate business logic from views
  - Use Django apps for logical separation
  - Follow Django's naming conventions

### 2. Django Configuration
- **Required Approach**:
  - Use environment variables for sensitive settings
  - Implement settings for different environments
  - Configure security settings properly
  - Use Django's built-in security features
  - Configure proper static and media file handling
  - Implement proper logging configuration
  - Use Django's middleware appropriately

### 3. API Implementation
- **Required Approach**:
  - Use Django REST Framework for APIs
  - Implement proper serializers
  - Use ViewSets or APIViews for endpoints
  - Implement proper authentication and permissions
  - Use consistent response formats
  - Implement proper pagination
  - Document API with drf-yasg or similar

### 4. Authentication and Authorization
- **Required Approach**:
  - Use Django's authentication system
  - Implement JWT or OAuth2 for API authentication
  - Configure proper CORS settings
  - Use Django's permission system
  - Implement custom permissions when needed
  - Use Django's Groups and Permissions
  - Implement proper password validation

### 5. Database Integration
- **Required Approach**:
  - Use Django's ORM for database access
  - Implement proper model relationships
  - Use migrations for schema changes
  - Implement proper indexing strategy
  - Use Django's transaction management
  - Implement proper model validation
  - Use QuerySets efficiently

### 6. Error Handling
- **Required Approach**:
  - Implement proper exception handling
  - Create custom exception classes when needed
  - Use Django REST Framework exception handlers
  - Return appropriate HTTP status codes
  - Implement proper logging of exceptions
  - Avoid exposing sensitive information in errors
  - Handle validation errors properly

### 7. Testing
- **Required Approach**:
  - Use Django's testing framework
  - Implement proper test fixtures
  - Use factory_boy or similar for test data
  - Test views and API endpoints
  - Implement proper test coverage
  - Test error handling and edge cases
  - Use test-driven development where appropriate

## Django Project Structure
For Django projects, organize your code following this structure:

```
project_name/
├── manage.py
├── requirements/
│   ├── base.txt
│   ├── development.txt
│   └── production.txt
├── project_name/
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings/
│   │   ├── __init__.py
│   │   ├── base.py
│   │   ├── development.py
│   │   └── production.py
│   ├── urls.py
│   └── wsgi.py
├── apps/
│   ├── core/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── migrations/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── services.py
│   │   ├── tests/
│   │   │   ├── __init__.py
│   │   │   ├── test_models.py
│   │   │   ├── test_serializers.py
│   │   │   └── test_views.py
│   │   ├── urls.py
│   │   └── views.py
│   └── users/
│       ├── __init__.py
│       ├── admin.py
│       ├── apps.py
│       ├── migrations/
│       ├── models.py
│       ├── serializers.py
│       ├── services.py
│       ├── tests/
│       ├── urls.py
│       └── views.py
├── static/
├── media/
├── templates/
└── utils/
    ├── __init__.py
    ├── exceptions.py
    └── helpers.py
```

## Django Model Template
Use this template for creating new Django models:

```python
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model

User = get_user_model()

class TimeStampedModel(models.Model):
    """
    An abstract base class model that provides self-updating
    created and modified fields.
    """
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Resource(TimeStampedModel):
    """
    Resource model for storing resource data.
    """
    STATUS_CHOICES = (
        ('draft', _('Draft')),
        ('published', _('Published')),
        ('archived', _('Archived')),
    )

    name = models.CharField(_('Name'), max_length=255)
    description = models.TextField(_('Description'), blank=True)
    status = models.CharField(
        _('Status'),
        max_length=20,
        choices=STATUS_CHOICES,
        default='draft'
    )
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='resources',
        verbose_name=_('Owner')
    )
    is_active = models.BooleanField(_('Active'), default=True)
    
    # Add indexes for frequently queried fields
    class Meta:
        verbose_name = _('Resource')
        verbose_name_plural = _('Resources')
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status', 'is_active']),
            models.Index(fields=['owner']),
        ]
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        # Custom save logic if needed
        super().save(*args, **kwargs)
    
    def get_absolute_url(self):
        from django.urls import reverse
        return reverse('resource-detail', kwargs={'pk': self.pk})
```

## Django REST Framework View Template
Use this template for creating new Django REST Framework views:

```python
from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Resource
from .serializers import ResourceSerializer, ResourceDetailSerializer
from .permissions import IsOwnerOrReadOnly
from .filters import ResourceFilter


class ResourceViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows resources to be viewed or edited.
    """
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ResourceFilter
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at', 'updated_at']
    ordering = ['-created_at']

    def get_queryset(self):
        """
        This view should return a list of all resources for the currently authenticated user.
        """
        user = self.request.user
        if user.is_staff:
            return Resource.objects.all()
        return Resource.objects.filter(owner=user)

    def get_serializer_class(self):
        """
        Return appropriate serializer class based on the request.
        """
        if self.action == 'retrieve':
            return ResourceDetailSerializer
        return ResourceSerializer

    def perform_create(self, serializer):
        """
        Set the owner to the current user when creating a resource.
        """
        serializer.save(owner=self.request.user)

    @action(detail=True, methods=['post'])
    def archive(self, request, pk=None):
        """
        Custom action to archive a resource.
        """
        resource = self.get_object()
        resource.status = 'archived'
        resource.save()
        serializer = self.get_serializer(resource)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def published(self, request):
        """
        Custom action to get all published resources.
        """
        queryset = self.get_queryset().filter(status='published')
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
```

## Django Serializer Template
Use this template for creating new Django REST Framework serializers:

```python
from rest_framework import serializers
from .models import Resource


class ResourceSerializer(serializers.ModelSerializer):
    """
    Serializer for the Resource model.
    """
    owner = serializers.ReadOnlyField(source='owner.username')
    
    class Meta:
        model = Resource
        fields = ['id', 'name', 'description', 'status', 'owner', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at', 'owner']
    
    def validate_name(self, value):
        """
        Check that the name is not already in use.
        """
        if self.instance is None:  # Creating a new resource
            if Resource.objects.filter(name=value).exists():
                raise serializers.ValidationError("A resource with this name already exists.")
        else:  # Updating an existing resource
            if Resource.objects.filter(name=value).exclude(id=self.instance.id).exists():
                raise serializers.ValidationError("A resource with this name already exists.")
        return value
    
    def validate(self, data):
        """
        Object-level validation.
        """
        # Add custom validation logic here
        return data


class ResourceDetailSerializer(ResourceSerializer):
    """
    Detailed serializer for the Resource model.
    """
    # Add additional fields or nested serializers for detail view
    
    class Meta(ResourceSerializer.Meta):
        # Add additional fields for detail view
        pass
```

## Django Best Practices
When implementing Django applications, follow these best practices:

1. **Models and Database**:
   - Keep models focused and cohesive
   - Use abstract base classes for common fields
   - Implement proper model relationships
   - Use Django's migration system
   - Optimize database queries
   - Use select_related and prefetch_related
   - Implement proper indexing

2. **Security**:
   - Keep Django updated
   - Use Django's security features
   - Implement proper authentication
   - Use Django's CSRF protection
   - Validate and sanitize all inputs
   - Use Django's permission system
   - Configure proper security settings

3. **Performance**:
   - Use Django's caching framework
   - Optimize database queries
   - Use pagination for large result sets
   - Implement proper indexing
   - Use Django Debug Toolbar for development
   - Consider using Django's async capabilities
   - Use Django's ORM efficiently

4. **Error Handling**:
   - Implement proper exception handling
   - Use Django's logging system
   - Create custom middleware for error handling
   - Return appropriate HTTP status codes
   - Implement proper validation
   - Handle edge cases
   - Use Django REST Framework exception handlers

5. **Testing**:
   - Use Django's testing framework
   - Implement proper test fixtures
   - Test views and API endpoints
   - Use factory_boy for test data
   - Test error handling and edge cases
   - Implement proper test coverage
   - Use Django's test client
