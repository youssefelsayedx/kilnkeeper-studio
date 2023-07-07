# Architecture

KilnKeeper is a React + TypeScript app with a local-first data boundary.

- `useKilnKeeper` owns studio state, filter state, and the selected order ID set.
- `lib/filters.ts` contains pure filtering and progress functions.
- `lib/storage.ts` isolates browser storage and returns seed data when storage is empty or corrupt.
- Components receive data and callbacks, keeping the table and filter bar easy to test.

Selection is keyed by order IDs in the hook, not derived from filtered rows, so an order remains selected when a filter temporarily hides it.
