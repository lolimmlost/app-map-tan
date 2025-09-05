# Database Documentation

The application uses Drizzle ORM with PostgreSQL for data persistence. The database schema is designed to store homelab application information with user associations.

## Overview

The database consists of two main tables:
1. User table (managed by Better Auth)
2. App table (custom application table)

## App Table Schema

The app table (`src/lib/db/schema/apps.schema.ts`) stores information about homelab applications.

### Fields

- `id` (text) - Primary key, unique identifier for each application
- `name` (text) - Application name, required
- `localIp` (varchar, 15 characters) - Local IP address, required, IPv4 format
- `remoteIp` (varchar, 45 characters) - Remote IP address, optional (IPv4 or IPv6)
- `port` (integer) - Port number, required
- `domain` (varchar, 253 characters) - Domain name, optional
- `subdomain` (varchar, 253 characters) - Subdomain, optional
- `userId` (text) - Foreign key to user table, required
- `description` (text) - Application description, optional

### Relationships

- Each app is associated with a single user via the `userId` foreign key
- When a user is deleted, all associated apps are automatically deleted (cascade delete)

## Data Models

### App Model

Represents an application entry in the database:

```typescript
interface App {
  id: string;
  name: string;
  localIp: string;
  remoteIp: string | null;
  port: number;
  domain: string | null;
  subdomain: string | null;
  userId: string;
  description: string | null;
}
```

### NewApp Model

Represents a new application entry for creation:

```typescript
interface NewApp {
  id: string;
  name: string;
  localIp: string;
  remoteIp: string | null;
  port: number;
  domain: string | null;
  subdomain: string | null;
  userId: string;
  description: string | null;
}
```

## Database Operations

Database operations are organized into three main categories:

### Schema Definitions

Located in `src/lib/db/schema/`, these files define the database structure:
- `apps.schema.ts` - App table schema
- `auth.schema.ts` - User table schema (managed by Better Auth)

### Queries

Located in `src/lib/db/queries/`, these files contain functions for fetching data:
- `apps.queries.ts` - App-related queries
- Query options for use with TanStack Query

### Functions

Located in `src/lib/db/functions/`, these files contain CRUD operations:
- `apps.ts` - App creation, update, and deletion functions
- Functions prefixed with `$` are server functions that run on the server

## API Integration

Database functions are exposed through server functions that can be called from client components:

- `$createApp` - Creates a new application entry
- `$updateApp` - Updates an existing application entry
- `$deleteApp` - Deletes an application entry

These functions handle:
- Data validation
- Database transactions
- Error handling
- Security checks

## Migration System

The project uses Drizzle Kit for database migrations:

- Migration files are stored in the `drizzle/` directory
- Each migration contains SQL commands to update the database schema
- Migration snapshots track the database structure over time

## Best Practices

1. **Data Validation**: All data is validated both client-side and server-side
2. **Security**: User data is isolated using foreign key constraints
3. **Performance**: Queries are optimized with appropriate indexing
4. **Reliability**: Database operations use transactions where appropriate