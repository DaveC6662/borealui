import {
  OrientationType,
  RoundingType,
  ShadowType,
  ThemeType,
} from "@/types/types";

/**
 * Represents a single item within the timeline.
 */
interface TimelineItem {
  /** Title of the timeline event. */
  title: string;
  /** Optional description of the event. */
  description?: string;
  /** Optional date string for the event. */
  date?: string;
  /** Optional icon component to visually represent the event. */
  icon?: React.ComponentType;
}

/**
 * Props for the Timeline component.
 */
export interface TimelineProps {
  /**
   * Array of timeline items to display.
   */
  items: TimelineItem[];

  /**
   * Orientation of the timeline.
   * "vertical" | "horizontal"
   */
  orientation?: OrientationType;

  /**
   * Theme to apply for styling.
   * "primary" | "secondary" | "tertiary" | "quaternary" | "clear"
   */
  theme?: ThemeType;

  /**
   * Rounding of the component.
   * "none" | "small" | "medium" | "large" | "full"
   */
  rounding?: RoundingType;

  /**
   * Shadow style of the component.
   * "none" | "light" | "medium" | "strong" | "intense"
   */
  shadow?: ShadowType;

  /**
   * Optional test ID for testing purposes.
   */
  "data-testid"?: string;
}
