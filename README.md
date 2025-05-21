# Boreal UI

A highly customizable, accessible React and Next.js component library with SCSS-based theming and support for both Core (framework-agnostic) and Next.js-optimized variants.

## Features

- **Core & Next.js Variants**: Use `boreal-ui/core` for plain React or `boreal-ui/next` for Next.js-optimized components (with built‑in `<Image>` support).
- **Theming**: SCSS variables for colors, typography, spacing, and borders — easily override to match your brand.
- **Accessibility**: WCAG‑friendly defaults, keyboard navigation, and ARIA roles out of the box.
- **Comprehensive Components**: Buttons, IconButtons, Cards, Accordions, Modals, Tabs, DataTable, Avatar, Badge, Tooltip, FileUpload, and more.
- **Testing**: Includes Jest unit tests and Cypress integration tests for confidence in your UI.
- **Storybook**: Live component playground and documentation at `/storybook`.
- **TypeScript Ready**: Fully typed props and interfaces.

## Installation

```bash
npm install boreal-ui
# or with Yarn
yarn add boreal-ui
```

## Usage

### Importing Components

**React (Core)**

```tsx
import { Button } from "boreal-ui/core/Button";
import { Card } from "boreal-ui/core/Card";
```

**Next.js (Optimized)**

```tsx
import { Button } from "boreal-ui/next/Button";
import { Card } from "boreal-ui/next/Card";
```

### Theming

Override default SCSS variables by editing `src/styles/theme.scss`:

```scss
// theme.scss
enable-light-mode: true;
$primary-color: #1c4d3a;
$secondary-color: #6e502e;
$text-color: #ffffff;
$spacing-base: 16px;
// ...etc.
```

Then import your theme at the entrypoint:

```scss
@use "boreal-ui/styles/theme" as theme;
@use "boreal-ui/styles/globals";
```

## Running Locally

```bash
# Install deps
yarn install

# Start Storybook
yarn storybook

# Run tests
yarn test      # Jest
yarn cypress:open # Cypress
```

## Contributing

1. Fork this repo
2. Create a branch: `git checkout -b feat/my-component`
3. Commit: `git commit -m "Add MyComponent"`
4. Push: `git push origin feat/my-component`
5. Open a PR and follow the [Contribution Guidelines](CONTRIBUTING.md).

Please include tests, Storybook stories, and documentation for new components.

## License

MIT © Davin Chiupka
