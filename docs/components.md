# Component Documentation

The application uses a component-based architecture with reusable UI components built with React and shadcn/ui. Components are organized by functionality and purpose.

## Overview

Components are located in the `src/components/` directory and are organized into:

1. Custom application components
2. UI components (shadcn/ui)
3. Layout components

## Custom Components

### AppCard (`src/components/app-card.tsx`)

Displays information about a single application in a card format.

Props:
- `app`: Application object to display
- `onEdit`: Function to handle edit requests
- `onDelete`: Function to handle delete requests

Features:
- Displays application name, description, and connection details
- Provides Local Access and Remote Access buttons
- Edit and Delete action buttons
- Responsive design

### AppForm (`src/components/app-form.tsx`)

Form component for creating and editing applications.

Props:
- `app` (optional): Existing application object for editing
- `onSubmit`: Function to handle form submission
- `onCancel`: Function to handle form cancellation
- `isLoading`: Loading state indicator
- `userId`: ID of the current user

Features:
- Form validation for all fields
- IP address format validation
- Port number validation (1-65535)
- Responsive layout
- Loading states

### AppGrid (`src/components/app-grid.tsx`)

Displays a grid of applications using AppCard components.

Props:
- `apps`: Array of application objects to display
- `onEdit`: Function to handle edit requests
- `onDelete`: Function to handle delete requests

Features:
- Responsive grid layout
- Empty state handling
- Passes callbacks to child AppCard components

### Theme Components

#### ThemeProvider (`src/components/theme-provider.tsx`)

Provides theme context for the application, enabling light/dark mode switching.

Features:
- Theme persistence using localStorage
- System preference detection
- Context provider for child components

#### ThemeToggle (`src/components/theme-toggle.tsx`)

UI component for switching between light and dark themes.

Features:
- Toggle button with sun/moon icons
- Accessible controls
- Integration with ThemeProvider

### Layout Components

#### DefaultCatchBoundary (`src/components/default-catch-boundary.tsx`)

Error boundary component for handling unexpected errors.

Features:
- Displays error information
- Provides reset mechanism
- User-friendly error messages

#### DefaultNotFound (`src/components/default-not-found.tsx`)

Component for handling 404 Not Found errors.

Features:
- Friendly 404 message
- Link back to home page

## UI Components

UI components are located in `src/components/ui/` and are based on shadcn/ui:

### Button (`src/components/ui/button.tsx`)

Customizable button component with multiple variants.

Variants:
- default
- destructive
- outline
- secondary
- ghost
- link

Sizes:
- default
- sm
- lg
- icon

### DropdownMenu (`src/components/ui/dropdown-menu.tsx`)

Accessible dropdown menu component with subcomponents:
- DropdownMenuTrigger
- DropdownMenuContent
- DropdownMenuItem
- DropdownMenuLabel
- DropdownMenuSeparator

### Input (`src/components/ui/input.tsx`)

Styled input component with consistent styling.

Features:
- Consistent styling with the application theme
- Focus states
- Disabled states

### Label (`src/components/ui/label.tsx`)

Accessible label component for form inputs.

Features:
- Proper accessibility attributes
- Consistent styling

### Sonner (`src/components/ui/sonner.tsx`)

Toast notification component.

Features:
- Rich notifications with colors
- Customizable positions
- Accessible notifications

## Component Architecture

### Reusability

Components are designed to be reusable across the application:

- AppCard can be used anywhere application information needs to be displayed
- AppForm can be used for both creation and editing scenarios
- UI components follow a consistent API pattern

### Props Pattern

Components follow consistent prop patterns:

- Callback props are prefixed with `on` (e.g., `onEdit`, `onDelete`)
- Optional props are clearly marked
- Data props are passed as objects when appropriate

### Styling

Components use Tailwind CSS for styling with these principles:

- Consistent spacing using Tailwind's spacing scale
- Responsive design with appropriate breakpoints
- Dark mode support through Tailwind's dark mode variants
- Accessible color contrast

## Best Practices

1. **Component Composition**: Components are built by composing smaller components
2. **Single Responsibility**: Each component has a clear, single purpose
3. **Accessibility**: Components follow accessibility best practices
4. **Performance**: Components are optimized to minimize re-renders
5. **Type Safety**: Components use TypeScript for type checking