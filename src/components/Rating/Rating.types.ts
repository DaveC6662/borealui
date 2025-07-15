import { SizeType, StateType, ThemeType } from "@/types/types";

/**
 * Props for the Rating component.
 */
export interface RatingProps {
  /**
   * The current rating value.
   */
  value: number;

  /**
   * Callback function invoked when the rating changes.
   * Receives the new rating (1-indexed) as its argument.
   */
  onChange?: (rating: number) => void;

  /**
   * The maximum number of stars available for the rating.
   */
  max?: number;

  /**
   * The label for the rating component, used for accessibility.
   */
  label?: string;

  /**
   * The size of the rating component.
   * One of: "xs" | "small" | "medium" | "large" | "xl"
   */
  size?: SizeType;

  /**
   * If true, the user can interact with the rating (hover, click, keyboard navigation).
   */
  interactive?: boolean;

  /**
   * The theme to use for styling.
   * One of: "primary" | "secondary" | "tertiary" | "quaternary" | "clear"
   */
  theme?: ThemeType;

  /**
   * State of the rating.
   * One of: "success" | "error" | "warning" | "disabled" | ""
   */
  state?: StateType;

  /**
   * Optional additional CSS class names for custom styling.
   */
  className?: string;

  /**
   * Optional test ID for testing frameworks.
   */
  "data-testid"?: string;
}
