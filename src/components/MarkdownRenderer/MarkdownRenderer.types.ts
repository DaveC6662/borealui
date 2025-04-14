/**
 * Props for the MarkdownRenderer component.
 */
export interface MarkdownRendererProps {
    /** Raw markdown content to be rendered as HTML. */
    content: string;
    /** Optional additional class name for styling. */
    className?: string;
    /** Optional test ID for testing frameworks. */
    "data-testid"?: string;
  }