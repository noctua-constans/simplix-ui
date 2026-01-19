## Introduction

Thank you for your interest in contributing to **Simplix**!    
This library aims to provide a clean, composable, strictly typed UI foundation with zero unnecessary magic.    
Contributions are welcome once the core API becomes stable — feel free to submit issues, ideas, or PRs.


## Requirements
To work on this project you will need:

- **Node.js**: `20.x (LTS)` or higher
- **PNPM**: `9+` (recommended package manager)
- **TypeScript**: `5+`
- **Git**   


## Structure
```
apps/
    docs/
    playground/

packages/
    core/
    headless/
    ui/*
```  


## Setup

### Clone Repository
```bash
git clone https://github.com/d9ff1ck/simplix.git
cd simplix
```

### Start the Playground

```bash
cd apps/playground
pnpm dev
```

### Build Library (React)

```bash
cd packages/ui/react
pnpm build
```


## Rules
To keep the project clean, consistent, and maintainable, all contributions must follow these rules.

### No New Runtime Dependencies
This library must remain dependency-free.    
PRs adding new runtime packages will be rejected.


### Follow the Existing Architecture
**Components must be:**

- composable
- predictable
- explicit
- free of hidden abstractions
- aligned with the rest of the library

If your implementation “feels different” — it’s probably **wrong**.


### Strict TypeScript Only
- no `any, unknown` etc
- no implicit returns
- no untyped event handlers
- no “magic” types that hide behavior
- always prefer **type imports** (`import type { ... }`)

If TypeScript complains — fix it, don’t silence it.


### Accessibility Is Not Optional
All interactive components **must** include:
- keyboard support
- correct tab order
- proper ARIA roles where needed
- focus management

PRs ignoring accessibility will not be accepted.


### Unopinionated Styling
Do **not** introduce:
- Tailwind classes
- Styled Components
- Emotion
- custom CSS frameworks
- global styles

Components must be style-agnostic.


### Keep Components Small and Composable
No huge “mega components”.
If your component can be split into smaller primitives — it should be.


### Consistent Code Style
- use ESLint + Prettier rules from the repo
- use named exports only
- no default exports
- no side effects
- no random utilities added to the root


### Tests for Complex Behavior
If your PR touches:
- focus behavior
- keyboard navigation
- positioning
- internal state logic

— tests are required before it can be merged.


### Document Your Changes
PRs must include:
- updated examples, if relevant
- updated docs
- clear explanation of the change

### Keep PRs Small

Large pull requests will be rejected unless previously discussed.
Open an issue first if you want to introduce larger changes.