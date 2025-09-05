# Authentication Documentation

The application uses Better Auth for handling user authentication, providing both email/password and social authentication options.

## Overview

Authentication is required to access the dashboard and other protected routes. The system supports:

1. Email/password authentication
2. Social authentication (GitHub, Google)
3. Session management
4. User registration

## Login Page (`/login`)

Located at `src/routes/(auth)/login.tsx`, the login page allows existing users to sign in to their accounts.

### Features

- Email and password fields with validation
- Social login options (GitHub, Google)
- Error handling for failed login attempts
- Redirect to original page after successful login
- Loading states during authentication process

### Form Fields

- **Email**: Required, must be a valid email format
- **Password**: Required

### Social Authentication

The login page provides options to sign in with:
- GitHub (enabled)
- Google (disabled in preview deployment)

## Signup Page (`/signup`)

Located at `src/routes/(auth)/signup.tsx`, the signup page allows new users to create accounts.

### Features

- Name, email, and password fields with validation
- Password confirmation field
- Social signup options (GitHub, Google)
- Error handling for failed signup attempts
- Redirect to dashboard after successful signup
- Loading states during registration process

### Form Fields

- **Name**: Required
- **Email**: Required, must be a valid email format
- **Password**: Required
- **Confirm Password**: Required, must match password

### Social Authentication

The signup page provides options to sign up with:
- GitHub (enabled)
- Google (disabled in preview deployment)

## Authentication Client

The authentication client (`src/lib/auth/auth-client.ts`) provides functions for:

- Signing in with email/password
- Signing in with social providers
- Signing up with email/password
- Signing out
- Managing session state

## Authentication Queries

The authentication queries (`src/lib/auth/queries.ts`) provide:

- User session data fetching
- Authentication state management
- Integration with TanStack Query for caching

## Middleware

Authentication middleware (`src/lib/auth/middleware.ts`) provides:

- Protection for server functions
- Session validation
- User context injection

## User Experience

The authentication system provides:

- Clean, responsive forms that work on all device sizes
- Clear error messaging for failed attempts
- Visual feedback during loading states
- Consistent design with the rest of the application
- Accessible form controls