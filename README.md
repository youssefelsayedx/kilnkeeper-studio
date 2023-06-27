# KilnKeeper

KilnKeeper is a calm, local-first production board for small pottery studios. It keeps the active firing queue visible, makes priority work easy to find, and preserves selections even when filters change.

## Run locally

Requires Node 20 or newer.

```bash
npm install
npm run dev
```

Checks: `npm test`, `npm run typecheck`, and `npm run build`.

All order data is stored in the browser's local storage. No external service is required by the app.
