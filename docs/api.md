# API Documentation

The application exposes API endpoints for managing applications and handling authentication. These APIs are built using TanStack Start server functions and Drizzle ORM for database operations.

## Overview

API endpoints are organized by functionality:
1. Application management endpoints
2. Authentication endpoints (managed by Better Auth)

## Application API

Application-related endpoints are located at `/api/apps` and provide CRUD operations for managing homelab applications.

### Get All Apps

**Endpoint**: GET `/api/apps`
**Function**: `$getApps`
**File**: `src/lib/db/functions/apps.ts`

Retrieves all applications for the authenticated user.

**Request**
- Method: GET
- Authentication: Required (via authMiddleware)
- Parameters: None

**Response**
- Success: Array of App objects
- Error: Unauthorized error if user is not authenticated

**Implementation Details**
- Fetches apps from database using `getAppsQuery`
- Filters results by authenticated user ID
- Returns empty array if user has no apps

### Create App

**Endpoint**: POST `/api/apps`
**Function**: `$createApp`
**File**: `src/lib/db/functions/apps.ts`

Creates a new application entry.

**Request**
- Method: POST
- Authentication: Required (via authMiddleware)
- Body: NewApp object
- Validation: Type validation using validator middleware

**Response**
- Success: Created App object
- Error: Unauthorized error if user is not authenticated

**Implementation Details**
- Inserts new app into database using `createAppQuery`
- Associates app with authenticated user ID
- Returns created app with generated ID

### Update App

**Endpoint**: POST `/api/apps`
**Function**: `$updateApp`
**File**: `src/lib/db/functions/apps.ts`

Updates an existing application entry.

**Request**
- Method: POST
- Authentication: Required (via authMiddleware)
- Body: Object with `id` and `app` properties
  - `id`: String ID of app to update
  - `app`: Partial NewApp object with updated fields
- Validation: Type validation using validator middleware

**Response**
- Success: Updated App object
- Error: Unauthorized error if user is not authenticated

**Implementation Details**
- Updates app in database using `updateAppQuery`
- Verifies user owns the app before updating
- Returns updated app object

### Delete App

**Endpoint**: POST `/api/apps`
**Function**: `$deleteApp`
**File**: `src/lib/db/functions/apps.ts`

Deletes an application entry.

**Request**
- Method: POST
- Authentication: Required (via authMiddleware)
- Body: Object with `id` property
  - `id`: String ID of app to delete
- Validation: Type validation using validator middleware

**Response**
- Success: Boolean indicating success
- Error: Unauthorized error if user is not authenticated

**Implementation Details**
- Deletes app from database using `deleteAppQuery`
- Verifies user owns the app before deleting
- Returns true if deletion successful, false otherwise

## Authentication API

Authentication endpoints are managed by Better Auth and located at `/api/auth/*`.

**Endpoint**: POST `/api/auth/*`
**File**: `src/routes/api/auth/$.ts`

Handles various authentication operations including:
- User registration
- User login
- Session management
- Password reset
- Social authentication

**Implementation Details**
- Routes all auth requests to Better Auth handler
- Supports both GET and POST methods
- Handles all authentication flows automatically

## Middleware

API functions use middleware for common functionality:

### Auth Middleware

**File**: `src/lib/auth/middleware.ts`

Protects API endpoints by verifying user authentication.

**Features**
- Checks for valid user session
- Extracts user context for database operations
- Throws error for unauthenticated requests

## Database Queries

The API functions use database queries located in `src/lib/db/queries/apps.ts`:

### createApp

Creates a new application entry in the database.

Parameters:
- `newApp`: NewApp object with app data
- `userId`: String ID of user owning the app

Returns: Created App object

### getApps

Retrieves all applications for a user.

Parameters:
- `userId`: String ID of user

Returns: Array of App objects

### getAppById

Retrieves a specific application by ID.

Parameters:
- `id`: String ID of app
- `userId`: String ID of user

Returns: App object or undefined

### updateApp

Updates an existing application.

Parameters:
- `id`: String ID of app to update
- `updatedApp`: Partial NewApp object with updated fields
- `userId`: String ID of user

Returns: Updated App object or undefined

### deleteApp

Deletes an application.

Parameters:
- `id`: String ID of app to delete
- `userId`: String ID of user

Returns: Boolean indicating success

## Error Handling

API functions implement consistent error handling:

1. **Authentication Errors**: Unauthorized errors when user is not authenticated
2. **Validation Errors**: Type validation errors for malformed requests
3. **Database Errors**: Database-level errors are caught and logged
4. **General Errors**: Unexpected errors are caught and logged

## Security

API functions implement several security measures:

1. **Authentication**: All app-related endpoints require authentication
2. **Authorization**: Users can only access their own apps
3. **Input Validation**: All inputs are validated before processing
4. **Error Sanitization**: Sensitive information is not exposed in error messages

## Performance

API functions are optimized for performance:

1. **Database Queries**: Efficient queries with proper WHERE clauses
2. **Caching**: Integration with TanStack Query for client-side caching
3. **Batch Operations**: Related operations are batched when possible
4. **Indexing**: Database is properly indexed for common queries