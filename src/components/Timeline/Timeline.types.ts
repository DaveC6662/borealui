import {
  OrientationType,
  RoundingType,
  ShadowType,
  StateType,
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
  /** Array of timeline items to display. */
  items: TimelineItem[];
  /** Orientation of the timeline, e.g., "vertical" or "horizontal". Defaults to "vertical". */
  orientation?: OrientationType;
  /** Theme to apply for styling, e.g., "primary", "secondary". Defaults to "primary". */
  theme?: ThemeType;
  /** Rounding of the component */
  rounding?: RoundingType;
  /** Shadow style of the component */
  shadow?: ShadowType;
  /** Optional test ID for testing purposes. */
  "data-testid"?: string;
}
