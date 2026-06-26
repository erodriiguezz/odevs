# ODevs

Monorepo for the ODevs platform, managed with [pnpm](https://pnpm.io) workspaces and [Turborepo](https://turbo.build).

## Project Structure

```
├── apps/
│   ├── web/    # Next.js frontend (@odevs/web)
│   └── api/    # Backend service (@odevs/api) — TBD
├── packages/   # Shared packages (when needed)
├── turbo.json  # Turborepo task pipeline
└── pnpm-workspace.yaml
```

## Prerequisites

- [Node.js](https://nodejs.org) >= 18
- [pnpm](https://pnpm.io) >= 9

## Getting Started

```bash
# Install dependencies
pnpm install

# Run all apps in development
pnpm dev

# Run only the frontend
pnpm dev:web

# Run only the backend
pnpm dev:api
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm dev:web` | Start only the frontend |
| `pnpm dev:api` | Start only the backend |
| `pnpm build` | Build all apps |
| `pnpm build:web` | Build only the frontend |
| `pnpm build:api` | Build only the backend |
| `pnpm lint` | Lint all apps |
| `pnpm test` | Run tests across all apps |

## Adding a New App

1. Create a folder under `apps/` with its own `package.json`
2. Name it with the `@odevs/` scope (e.g., `@odevs/api`)
3. It will be automatically picked up by the workspace

## Adding a Shared Package

1. Create a folder under `packages/` with its own `package.json`
2. Name it with the `@odevs/` scope (e.g., `@odevs/shared`)
3. Reference it from any app: `"@odevs/shared": "workspace:*"`
