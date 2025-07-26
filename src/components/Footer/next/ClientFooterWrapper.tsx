/**
 * ---------------------------------------------------------------------
 * ClientFooterWrapper.tsx
 * ---------------------------------------------------------------------
 * A client-side wrapper for the `<Footer>` component to ensure
 * it renders only on the client (required when using dynamic content
 * or browser-specific APIs within the Footer).
 *
 * This is useful in Next.js when a server component cannot render
 * a client-only dependency.
 *
 * Props are directly passed through from `FooterProps`.
 *
 * Usage:
 * ```tsx
 * <ClientFooterWrapper
 *   copyright="© 2025 Davin Chiupka"
 *   showThemeSelect
 * />
 * ```
 */

"use client";

import Footer from "./Footer";
import type { FooterProps } from "../Footer.types";

export default function ClientFooterWrapper(props: FooterProps) {
  return <Footer {...props} />;
}
