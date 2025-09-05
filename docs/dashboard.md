# Dashboard Page Documentation

The dashboard page is the main interface for managing applications in the homelab environment. It provides a comprehensive view of all applications with options to create, edit, and delete entries.

## Overview

The dashboard is accessible at `/dashboard` and requires user authentication. It displays a grid of applications with details about each one, including local and remote access options.

## Features

1. **Application Grid Display**
   - Shows all applications in a responsive grid layout
   - Displays key information for each application:
     - Name and description
     - Local IP and port
     - Remote IP (if configured)
     - Domain and subdomain (if configured)
   - Provides quick access buttons:
     - Local Access (opens application on local network)
     - Remote Access (opens application via remote IP or domain)

2. **Application Management**
   - **Create New App**: Add new applications to the dashboard
   - **Edit App**: Modify existing application details
   - **Delete App**: Remove applications from the dashboard

3. **Error Handling**
   - Loading states while fetching applications
   - Error messages for failed operations
   - Empty state when no applications exist

## Components

The dashboard page is composed of several key components:

### AppGrid (`src/components/app-grid.tsx`)

Displays applications in a responsive grid layout. Shows a message when no applications are available.

Props:
- `apps`: Array of application objects to display
- `onEdit`: Function to handle edit requests
- `onDelete`: Function to handle delete requests

### AppCard (`src/components/app-card.tsx`)

Individual card component for displaying application information.

Props:
- `app`: Application object to display
- `onEdit`: Function to handle edit requests
- `onDelete`: Function to handle delete requests

Features:
- Displays application name, description, and connection details
- Provides Local Access and Remote Access buttons
- Edit and Delete action buttons

### AppForm (`src/components/app-form.tsx`)

Form component for creating and editing applications.

Props:
- `app` (optional): Existing application object for editing
- `onSubmit`: Function to handle form submission
- `onCancel`: Function to handle form cancellation
- `isLoading`: Loading state indicator
- `userId`: ID of the current user

Form Fields:
- Name (required)
- Local IP (required, IPv4 format)
- Port (required, 1-65535)
- Remote IP (optional, IPv4 format)
- Domain (optional)
- Subdomain (optional)
- Description (optional)

## Data Flow

1. **Data Fetching**: On page load, the dashboard fetches all applications for the current user using TanStack Query.
2. **State Management**: Application state is managed through TanStack Query for caching and synchronization.
3. **CRUD Operations**: 
   - Create: Opens a form, submits new application data
   - Read: Displays applications in grid format
   - Update: Opens a pre-filled form with existing data
   - Delete: Removes application with confirmation

## API Integration

The dashboard integrates with backend functions through the following API calls:

- `$createApp`: Creates a new application entry
- `$updateApp`: Updates an existing application entry
- `$deleteApp`: Deletes an application entry
- `appsQueryOptions`: Query configuration for fetching applications

## User Experience

The dashboard provides a clean, intuitive interface with:

- Responsive design that works on desktop and mobile devices
- Clear visual hierarchy with important information prioritized
- Immediate feedback for user actions
- Accessible form controls with proper validation
- Dark/light theme support