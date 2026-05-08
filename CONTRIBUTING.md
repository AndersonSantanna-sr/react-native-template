# Contributing

## Setup

```bash
git clone <your-fork>
cd react-native-template
pnpm install
cp .env.example .env
```

## Branch naming

```
feat/short-description
fix/short-description
chore/short-description
```

## Commit messages

This repo enforces [Conventional Commits](https://www.conventionalcommits.org) via commitlint.

```
feat(scope): add something new
fix(scope): correct a bug
chore(scope): tooling or config change
docs(scope): documentation only
test(scope): add or fix tests
refactor(scope): code change with no behavior change
```

## Before opening a PR

```bash
pnpm run lint:eslint    # 0 warnings
pnpm run typecheck      # 0 errors
pnpm run test:coverage  # all tests pass with coverage
```

## Pull request

Use the PR template. Keep PRs focused — one concern per PR.
