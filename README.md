# Boreal UI

A **highly customizable**, **accessible** React and Next.js component library with SCSS-powered theming.  
Offers both Core (framework-agnostic React) and Next.js-optimized variants for seamless integration in any project.

---

## Features

- **Dual Build Support:**  
  Use `boreal-ui/core` for any React project or `boreal-ui/next` for Next.js apps.
- **SCSS-Based Theming:**  
  Override color, typography, spacing, border, and shadow variables to perfectly match your brand.
- **Accessibility First:**  
  WCAG-friendly out of the box. Includes keyboard navigation, ARIA roles, and robust focus states.
- **Rich Component Set:**  
  Buttons, IconButtons, Cards, Accordions, Modals, Tabs, DataTable, Avatar, Badge, Tooltip, FileUpload, EmptyState, and more.
- **TypeScript Native:**  
  All components include full prop typing and interfaces for an exceptional developer experience.

---

## Installation

```bash
npm install boreal-ui
# or
yarn add boreal-ui
```

---

## Quick Usage

### Importing Components

**For React (Core):**

```tsx
import { Button } from "boreal-ui/core/Button";
import { Card } from "boreal-ui/core/Card";
```

**For Next.js (Optimized):**

```tsx
import { Button } from "boreal-ui/next/Button";
import { Card } from "boreal-ui/next/Card";
```

---

## Global Configuration

Boreal UI lets you define project-wide style defaults (theme, rounding, shadow, size) in a single config API.

**Call the config API**

````ts
import { setBorealStyleConfig } from "boreal-ui/config/boreal-style-config";

setBorealStyleConfig({
  defaultTheme: "secondary",     // "primary" | "secondary" | "tertiary" | "quaternary"
  defaultRounding: "medium",     // "none" | "small" | "medium" | "large" | "full"
  defaultShadow: "light",        // "none" | "light" | "medium" | "strong" | "intense"
  defaultSize: "large",          // "xs" | "small" | "medium" | "large" | "xl"
});

Call this once early in your app before rendering any components.

These defaults apply globally, but you can override them per component as needed:

```tsx
<Button theme="secondary" size="large" shadow="strong">
  Custom Button
</Button>
````

---

## Theming & Custom Color Schemes

Boreal UI supports custom color schemes through the `ThemeProvider`.

**Wrap your app (typically in `_app.tsx` or a custom provider):**

```tsx
"use client";
import { ThemeProvider } from "boreal-ui";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          customSchemes={[
            {
              name: "Cyberpunk Pulse",
              primaryColor: "#ff006e",
              secondaryColor: "#8338ec",
              tertiaryColor: "#3a0ca3",
              quaternaryColor: "#fb5607",
              backgroundColor: "#0f0f0f",
            },
          ]}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**Theme property reference:**

| Property          | Description                      |
| ----------------- | -------------------------------- |
| `name`            | Unique identifier for the scheme |
| `primaryColor`    | Main UI color                    |
| `secondaryColor`  | Accent color                     |
| `tertiaryColor`   | Additional accent                |
| `quaternaryColor` | Optional border/highlight        |
| `backgroundColor` | Background/base color            |

---

## Why Use Boreal UI?

- Enforces consistent styling and branding across your project.
- Save time: define defaults once, override only when needed.
- Switch between multiple color schemes easily (great for light/dark mode).
- Fully accessible and ready for production.

---

## Contributing

1. Fork this repo.
2. Create a feature branch: `git checkout -b feat/my-component`
3. Commit your changes: `git commit -m "Add MyComponent"`
4. Push to your fork: `git push origin feat/my-component`
5. Open a Pull Request.

**Please include tests, Storybook stories, and clear documentation for new components.**

---

## License

MIT © [Davin Chiupka](https://davinchiupka.com)
