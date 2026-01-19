# Simplix
A modular UI system composed from clear, predictable building blocks, with strict typing and zero unnecessary magic.

> The trailing “x” is a small nod to long-standing Unix tradition.

---

## What is Simplix?

1. Simplix is a modular UI system designed to be extended and adapted.

2. At its core, Simplix separates **behavior**, **composition**, and **rendering** into distinct layers, allowing UI to be built predictably, without hidden magic.

3. The framework layer (React, Vue, etc.) is intentionally minimal. Complexity lives in reusable engines and headless logic — not in JSX.

---

## Architecture
Simplix is built as a layered system. Each layer has a single, explicit responsibility and can be used independently.

### Core
The core layer provides low-level engines used to model state, control, and interaction. This layer contains no framework code, no DOM assumptions, and no rendering logic. It defines the fundamental building blocks used by higher layers, but can also be used standalone.

### Headless
The headless layer builds on top of the core engines to define component behavior. It implements interaction patterns and control logic (focus, toggles, menus, etc.) without prescribing structure, markup, or styling.

### UI
The UI layer provides thin framework-specific adapters (e.g. React). Its responsibility is rendering and composition only. State, behavior, and interaction logic are delegated to the headless and core layers.
> *This layer is intentionally minimal and designed to be replaced or extended.*

This separation allows Simplix to remain predictable and extensible.

Complexity is concentrated in reusable engines and headless logic, while the framework layer stays simple and explicit.

---

## Design Principles

- Explicit over implicit.
- Composition over configuration.
- Behavior is code, not props.
- UI is thin, logic is reusable.
- No hidden behavior.

---

## Packages

- **@simplix/core**  
  Low-level engines that model state, control, and interaction. Framework-agnostic and dependency-free.

- **@simplix/headless**  
  Behavior and interaction patterns built on top of the core engines. No rendering, no styling, no framework assumptions.

- **@simplix/ui**  
  Framework-specific UI adapters responsible for rendering and composition.
  >
  > This package represents the UI layer as a concept. Specific framework implementations (React, Vue, etc.) follow the same design and are intentionally not documented separately here.

---

## Quick start

### Installation
```bash
pnpm add @simplix/ui
```

### Usage (React)
```tsx
import { Flex, Dropdown } from "@simplix/react";

export function Example() {
    return (
        <Flex align="center">
            <Dropdown>
                <Dropdown.Trigger>
                    Open
                </Dropdown.Trigger>

                <Dropdown.Menu>
                    <Dropdown.Item>Profile</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item disabled>
                        Disabled action
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Flex>
    );
}
```
> Equivalent examples for Vue follow the same structure and concepts.


---

## Support

See **[SUPPORT.md](./SUPPORT.md)** for framework and component group availability in the current major version.

---

## Contributing
Contribution guidelines are available in **[CONTRIBUTING.md](./CONTRIBUTING.md)**.

---

## LICENSE
**[MIT License](./LICENSE)**