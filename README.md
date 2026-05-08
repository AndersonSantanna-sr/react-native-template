# React Native Template

Production-ready React Native template built with Expo SDK 55, TypeScript, and a curated stack for scalable apps.

## Stack

| Layer          | Library                                  |
| -------------- | ---------------------------------------- |
| Framework      | Expo SDK 55 + Expo Router                |
| Language       | TypeScript (strict)                      |
| Styling        | NativeWind v4 (Tailwind CSS)             |
| State          | Zustand v5                               |
| Testing (unit) | Jest + React Native Testing Library      |
| Testing (E2E)  | Maestro                                  |
| Linting        | ESLint + Prettier                        |
| Pre-commit     | Husky + lint-staged                      |
| CI             | GitHub Actions                           |
| Data fetching  | TanStack Query v5 + axios                |
| Validation     | Zod v4 + React Hook Form                 |
| Token storage  | expo-secure-store                        |
| Build          | EAS (development / preview / production) |

## Getting started

### 1. Use this template

Click **"Use this template"** on GitHub to create a new repo.

### 2. Install dependencies

```bash
pnpm install
```

> Requires [pnpm](https://pnpm.io/installation). Install with `npm i -g pnpm`.

### 3. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` with your values.

### 4. Start the app

```bash
pnpm start        # Expo dev server
pnpm ios          # iOS simulator
pnpm android      # Android emulator
pnpm web          # Browser
```

## Project structure

```
src/
  app/              # Expo Router screens (file-based routing)
    (auth)/         # Unauthenticated screens (login)
    (app)/          # Authenticated screens (tabs: home, explore)
  components/       # Shared UI components
  constants/        # Theme tokens (colors, spacing, fonts)
  features/         # Feature modules (auth, etc.)
  hooks/            # Custom hooks
  lib/              # Utilities: API client, validation schemas, token storage
  providers/        # React context providers (QueryProvider)
  stores/           # Zustand stores
```

## Development

### Linting & formatting

```bash
pnpm run lint:eslint   # ESLint
pnpm run format        # Prettier
pnpm run typecheck     # TypeScript
```

### Tests

```bash
pnpm test              # Run all unit tests
pnpm run test:watch    # Watch mode
```

### E2E tests (Maestro)

Install Maestro:

```bash
curl -Ls "https://get.maestro.mobile.dev" | bash
```

Run flows:

```bash
maestro test .maestro/login.yaml
```

> Start the app first with `pnpm ios` or `pnpm android`.

## Before you ship — required changes

Search `// TODO:` and `{/* TODO: */}` in the codebase to find every placeholder. Summary:

| File                                | What to change                                                                                    |
| ----------------------------------- | ------------------------------------------------------------------------------------------------- |
| `app.config.ts`                     | `name`, `slug`, `scheme` — replace `MyApp` / `react-native-template` / `reactnativetemplate`      |
| `app.config.ts`                     | `bundleIdentifier` + `android.package` — replace `com.yourcompany.yourapp` before first EAS build |
| `.env`                              | `EXPO_PUBLIC_API_URL` — your real API base URL                                                    |
| `src/components/error-boundary.tsx` | Translate or customize the error strings (`Algo deu errado`, `Tentar novamente`)                  |
| `assets/images/`                    | Replace icon, splash, and adaptive icon assets                                                    |

## Customizing

1. Update `app.config.ts` — change `name`, `slug`, `scheme`, and icon assets
2. Update `EXPO_PUBLIC_API_URL` in `.env` — your API base URL
3. Replace `src/features/auth/LoginScreen.tsx` with your own auth flow
4. Update theme colors in `src/constants/theme.ts`

## CI

GitHub Actions runs on every push and PR to `main`:

- ESLint
- TypeScript typecheck
- Jest tests with coverage
