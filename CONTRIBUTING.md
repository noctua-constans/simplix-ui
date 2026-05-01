# Contributing

Thank you for your interest in contributing to **Simplix**.

Simplix is a layered UI foundation. Keep changes explicit, typed, and scoped to the package that owns the behavior.

## Requirements

- **Node.js**: `20.x` or higher
- **PNPM**: `10.x`
- **TypeScript**: `5.x`
- **Git**

## Repository Structure

```txt
packages
├── core      // Framework-agnostic runtime primitives: identity, stateflow, shared types
├── dom       // DOM event helpers and interaction bindings
├── headless  // Behavior contracts and headless component logic
└── react-dom // React DOM adapter, layout primitives, and React-specific types
```

## Package Boundaries

### `@simplix/core`

Owns low-level runtime primitives. This package must not depend on DOM, React, or styling.

Current areas:

- `identity`: Cursor-like sequence and id generation primitives
- `stateflow`: Mutable state, transition tables, and stateful machines
- `types`: Small shared runtime contracts

### `@simplix/headless`

Owns framework-agnostic behavior contracts built on top of core. It should not render UI or depend on DOM APIs unless
that behavior is explicitly abstracted.

### `@simplix/dom`

Owns browser-specific event and interaction helpers.

Current areas:

- `events`: Event listener primitives
- `bindings`: Focus, keyboard, and pointer binders

### `@simplix/react-dom`

Owns React DOM rendering adapters and React-specific types. React dependencies belong here, not in `core`, `dom`, or the
root package.

Current areas:

- `layouts`: Layout primitives such as Layout, Flex, Grid, and Stack
- `types`: React polymorphic component helper types

## Setup

Install dependencies from the repository root:

```bash
pnpm install
```

Run the full verification pipeline:

```bash
pnpm verify
```

## Common Commands

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm verify
```

Coverage commands:

```bash
pnpm test:coverage
pnpm test:coverage:text
pnpm test:coverage:html
```

For a single package, use `--filter`:

```bash
pnpm --filter @simplix/core test
pnpm --filter @simplix/core test:coverage:text
pnpm --filter @simplix/react-dom typecheck
```

## Dependency Rules

- Keep shared tooling in the root `devDependencies`
- Keep framework-specific dependencies in the package that uses them
- `react` and `react-dom` belong in `@simplix/react-dom` as peer dependencies and local dev dependencies
- Do not add React, DOM, or styling dependencies to `@simplix/core`
- Do not add runtime dependencies unless there is a clear package-level reason

Examples:

```txt
root devDependencies: typescript, eslint, prettier, tsup, vitest
react-dom peerDependencies: react, react-dom
react-dom devDependencies: react, react-dom, @types/react, @types/react-dom
```

## Code Style

- Use TypeScript only
- Use named exports only
- Prefer `import type` for type-only imports
- Keep implementation files explicit and small
- Do not add hidden global state
- Do not add broad utility modules without a clear package owner
- Follow the existing factory pattern: public `create-*` functions wrap internal `_...Impl` classes

## Testing

Tests should cover public behavior, not private implementation details.

Use public factories:

```ts
createSequence(...);
createId(...);
createMutableState(...);
createTransitionTable(...);
createStatefulMachine(...);
```

Do not import internal `_...Impl` classes from tests.

Prefer focused tests by responsibility:

- Ideal path: The normal behavior works
- Missing value: Nothing is found, no transition exists, sequence is exhausted, etc
- Branches: Guards, equality checks, optional reducers, optional targets
- Optional fields: Defaults and omitted options behave correctly
- Contract: Public API delegates, notifies, resets, subscribes, or preserves state as promised

When testing layered modules, keep layers separate:

- `MutableState`: Tests data storage and subscriptions
- `TransitionTable`: Tests transition policy only
- `StatefulMachine`: Tests delegation and application of resolved transitions

## Accessibility

Interactive behavior must account for:

- keyboard support
- focus handling
- correct tab order
- ARIA roles when needed

This mainly applies to headless behavior and React DOM adapters.

## Styling

Simplix should remain style-agnostic.

Do not introduce:

- Tailwind classes
- Styled Components
- Emotion
- global CSS
- package-specific styling systems

Components may accept styling props when that is part of their explicit public API.

## Pull Requests

Keep PRs small and scoped. Prefer multiple commits that each explain one change.

A good PR should include:

- a clear summary of the change
- tests for behavior changes
- updated docs when public API or package structure changes
- successful `pnpm verify`

Avoid mixing unrelated work, such as package renames, feature additions, and formatting-only edits in one commit.
