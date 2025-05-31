import { ThemeType, OrientationType, StateType } from "@/types/types";

/**
 * Props for the Divider component.
 */
export interface DividerProps extends React.HTMLAttributes<HTMLElement> {
  /** Orientation of the divider: "horizontal" (default) or "vertical". */
  orientation?: OrientationType;
  /** Thickness of the divider (e.g., "1px", "4px"). */
  thickness?: string;
  /** Length of the divider (e.g., "100%", "60px"). */
  length?: string;
  /** Whether the divider should be dashed instead of solid. */
  dashed?: boolean;
  /** Optional theme styling. */
  theme?: ThemeType;
  /** State of the divider ex "error", "success", "warning*/
  state?: StateType;
  /** HTML tag to render (e.g., "div", "hr", or "span"). */
  as?: "div" | "hr" | "span";
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}