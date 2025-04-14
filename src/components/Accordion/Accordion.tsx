/**
 * Accordion component loader that conditionally imports either the Next.js-optimized
 * or React-compatible version of the component.
 *
 * - If running in a Next.js environment (`process.env.NEXT_RUNTIME` is set) or on the client (`typeof window !== "undefined"`),
 *   it loads `./Accordion.next` — which uses Next.js features like `useId`, `next/link`, etc.
 *
 * - Otherwise, it falls back to `./Accordion.core`, a lightweight version compatible with any React runtime.
 *
 * @module Accordion
 * @see {@link AccordionProps} for prop definitions
 */

let Accordion: React.FC<any>;

if (process.env.NEXT_RUNTIME || typeof window !== "undefined") {
  Accordion = require("./Accordion.next").default;
} else {
  Accordion = require("./Accordion.core").default;
}

export default Accordion;
