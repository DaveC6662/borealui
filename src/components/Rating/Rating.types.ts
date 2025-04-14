import { SizeType, ThemeType } from "@/types/types";

/**
 * Props for the Rating component.
 */
export interface RatingProps {
  /** The current rating value. */
  value: number;
  /**
   * Callback function invoked when the rating changes.
   * Receives the new rating (1-indexed) as its argument.
   */
  onChange?: (rating: number) => void;
  /**
   * The maximum number of stars available for the rating.
   * @default 5
   */
  max?: number;
  /**
   * The size of the rating component (e.g., "small", "medium", "large").
   * @default "medium"
   */
  size?: SizeType;
  /**
   * If true, the user can interact with the rating (hover, click, keyboard navigation).
   * @default true
   */
  interactive?: boolean;
  /**
   * The theme to use for styling (e.g., "primary", "secondary").
   * @default "primary"
   */
  theme?: ThemeType;
  /** Optional additional CSS class names for custom styling. */
  className?: string;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}