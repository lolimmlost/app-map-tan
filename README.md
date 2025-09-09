# [React TanStarter](https://github.com/dotnize/react-tanstarter)

A minimal starter template for 🏝️ TanStack Start. [→ Preview here](https://tanstarter.nize.ph/)

- [React 19](https://react.dev) + [React Compiler](https://react.dev/learn/react-compiler)
- TanStack [Start](https://tanstack.com/start/latest) + [Router](https://tanstack.com/router/latest) + [Query](https://tanstack.com/query/latest)
- [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Drizzle ORM](https://orm.drizzle.team/) + PostgreSQL
- [Better Auth](https://www.better-auth.com/)

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Authentication](#authentication)
- [Database](#database)
- [Components](#components)
- [Routing](#routing)
- [API Functions](#api-functions)
- [Homelab Setup](#homelab-setup)
- [Security Considerations](#security-considerations)
- [Testing](#testing)
- [Deployment](#deployment)
- [Scripts](#scripts)
- [License](#license)

## Getting Started

We use **npm** by default, but you can modify the scripts in [package.json](./package.json) to use your preferred package manager.

1. [Use this template](https://github.com/new?template_name=react-tanstarter&template_owner=dotnize) or clone this repository with gitpick:

   ```bash
   npx gitpick dotnize/react-tanstarter myapp
   cd myapp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on [`.env.example`](./.env.example).

4. Push the schema to your database with drizzle-kit:

   ```bash
   npm db push
   ```

   https://orm.drizzle.team/docs/migrations

5. Run the development server:

   ```bash
   npm dev
   ```

   The development server should now be running at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── components/          # Reusable UI components
├── lib/                 # Core application logic
│   ├── auth/            # Authentication logic
│   ├── db/              # Database operations
│   └── utils.ts         # Utility functions
├── routes/              # Application routes
│   ├── (auth)/          # Authentication routes
│   ├── api/             # API routes
│   ├── dashboard/       # Dashboard routes
│   ├── __root.tsx       # Root layout
│   └── index.tsx        # Home page
└── styles.css           # Global styles
```

## Authentication

This project uses [Better Auth](https://www.better-auth.com/) for authentication. The authentication system includes:

- Email/password authentication
- Social authentication (GitHub, Google)
- Session management

Key files:
- [`src/lib/auth/auth.ts`](./src/lib/auth/auth.ts) - Better Auth configuration
- [`src/lib/auth/auth-client.ts`](./src/lib/auth/auth-client.ts) - Client-side authentication functions
- [`src/lib/auth/queries.ts`](./src/lib/auth/queries.ts) - Authentication queries
- [`src/lib/auth/middleware.ts`](./src/lib/auth/middleware.ts) - Authentication middleware

## Database

The project uses [Drizzle ORM](https://orm.drizzle.team/) with PostgreSQL. Database operations are organized as follows:

- [`src/lib/db/schema/`](./src/lib/db/schema/) - Database schema definitions
- [`src/lib/db/queries/`](./src/lib/db/queries/) - Database queries
- [`src/lib/db/functions/`](./src/lib/db/functions/) - Database functions

### Apps Schema

The main database table is for storing applications in a homelab environment:

- `id` (text) - Unique identifier
- `name` (text) - Application name
- `localIp` (varchar) - Local IP address
- `remoteIp` (varchar, optional) - Remote IP address
- `port` (integer) - Port number
- `domain` (varchar, optional) - Domain name
- `subdomain` (varchar, optional) - Subdomain
- `userId` (text) - Reference to user
- `description` (text, optional) - Application description

## Components

The project uses [shadcn/ui](https://ui.shadcn.com/) components built on top of [Tailwind CSS](https://tailwindcss.com/).

Key custom components:
- [`AppCard`](./src/components/app-card.tsx) - Displays individual app information
- [`AppForm`](./src/components/app-form.tsx) - Form for creating/editing apps
- [`AppGrid`](./src/components/app-grid.tsx) - Grid layout for displaying apps

## Routing

The project uses [TanStack Router](https://tanstack.com/router/latest) for routing:

- `/` - Home page
- `/login` - Login page
- `/signup` - Signup page
- `/dashboard` - Dashboard page (requires authentication)

## API Functions

Database operations are exposed through API functions:

- [`$createApp`](./src/lib/db/functions/apps.ts) - Create a new app
- [`$updateApp`](./src/lib/db/functions/apps.ts) - Update an existing app
- [`$deleteApp`](./src/lib/db/functions/apps.ts) - Delete an app

## Homelab Setup

This template is designed for managing homelab applications. After setting up the project:

1. Configure your `.env` for local Postgres (use docker-compose.yml for a local instance):
   ```
   DATABASE_URL=postgresql://user:pass@localhost:5432/homelabdb
   ```

2. Add your first app via the dashboard: Enter local IP (e.g., 192.168.1.100), port (e.g., 8080), and optional domain/subdomain for external access.

3. Integrate with your network: Ensure the app server runs on a trusted LAN; use reverse proxies like Nginx for domain routing.

Example entry: Name "Home Assistant", localIp "192.168.1.50", port 8123, domain "home.example.com".

## Security Considerations

For homelab use cases:

- **Data Protection**: Stored IPs/ports/domains are sensitive; enable HTTPS and encrypt DB if exposing remotely. Use Zod for input validation in forms (add to AppForm).

- **Access Controls**: Apply auth middleware to all protected routes. Limit API exposure to authenticated users only. For local access, use VPN or firewall rules to restrict dashboard to LAN IPs.

- **Risks**: Avoid storing credentials in the apps table; use external secrets management. Regularly audit logs for unauthorized CRUD actions.

- **Best Practices**: Run in a containerized environment (Docker) for isolation. Update dependencies frequently to patch vulnerabilities in Better Auth/Drizzle.

## Testing

Run tests with Vitest:

```bash
npm test
```

Current coverage: Basic integration test for AppCard. Add unit tests for queries/functions (e.g., createApp) and e2e for auth/CRUD flows using Testing Library. Goal: 80% coverage. Configure in vitest.config.ts for reports.

## Issue watchlist

- [React Compiler docs](https://react.dev/learn/react-compiler), [Working Group](https://github.com/reactwg/react-compiler/discussions) - React Compiler is in RC.
- [Start BETA Tracking](https://github.com/TanStack/router/discussions/2863) - TanStack Start is in beta and may still undergo major changes.
- [Devtools Releases](https://github.com/TanStack/devtools/releases) - TanStack Devtools is in alpha and may still have breaking changes.

## Goodies

#### Scripts

These scripts in [package.json](./package.json#L5) use **npm** by default, but you can modify them to use your preferred package manager.

- **`auth:generate`** - Regenerate the [auth db schema](./src/lib/db/schema/auth.schema.ts) if you've made changes to your Better Auth [config](./src/lib/auth/auth.ts).
- **`db`** - Run drizzle-kit commands. (e.g. `npm db generate` to generate a migration)
- **`ui`** - The shadcn/ui CLI. (e.g. `npm ui add button` to add the button component)
- **`format`**, **`lint`**, **`check-types`** - Run Prettier, ESLint, and check TypeScript types respectively.
  - **`check`** - Run all three above. (e.g. `npm check`)
- **`deps`** - Selectively upgrade dependencies via taze.

#### Utilities

- [`auth/middleware.ts`](./src/lib/auth/middleware.ts) - Sample middleware for forcing authentication on server functions. (see [#5](https://github.com/dotnize/react-tanstarter/issues/5#issuecomment-2615905686) and [#17](https://github.com/dotnize/react-tanstarter/issues/17#issuecomment-2853482062))
- [`theme-toggle.tsx`](./src/components/theme-toggle.tsx), [`theme-provider.tsx`](./src/components/theme-provider.tsx) - A theme toggle and provider for toggling between light and dark mode. ([#7](https://github.com/dotnize/react-tanstarter/issues/7#issuecomment-3141530412))

## License

Code in this template is public domain via [Unlicense](./LICENSE). Feel free to remove or replace for your own project.

## Also check out

- [create-tsrouter-app](https://github.com/TanStack/create-tsrouter-app/tree/main/cli/create-tsrouter-app) - The official CLI tool from the TanStack team to create Router/Start projects.
- [CarlosZiegler/fullstack-start-template](https://github.com/CarlosZiegler/fullstack-start-template) - A more batteries-included boilerplate that provides a solid foundation for building modern web apps.
