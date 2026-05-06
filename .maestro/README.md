# E2E Tests (Maestro)

## Install

```bash
curl -Ls "https://get.maestro.mobile.dev" | bash
```

## Run

Start the app first:

```bash
npx expo start --ios
```

Then in another terminal:

```bash
maestro test .maestro/login.yaml
```

## Add new flows

Create `.yaml` files in this directory. Use `testID` props (already on components) as selectors via `id:` in Maestro.
