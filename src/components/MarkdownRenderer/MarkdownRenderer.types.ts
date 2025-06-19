import { RoundingType, ShadowType } from "@/types/types";

/**
 * Props for the MarkdownRenderer component.
 */
export interface MarkdownRendererProps {
  /** Raw markdown content to be rendered as HTML. */
  content: string;
  /** Optional additional class name for styling. */
  className?: string;
  /** Optional rounding*/
  rounding?: RoundingType;
  /** Optional shadow styling */
  shadow?: ShadowType;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}
