import { ThemeType, OrientationType, StateType } from "@/types/types";
import { JSX } from "react";

/**
 * Props for the Divider component.
 */
export interface DividerProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Orientation of the divider
   * ('horizontal' | 'vertical'). Default is 'horizontal'.
   */
  orientation?: OrientationType;

  /** Thickness of the divider (e.g., "1px", "4px"). */
  thickness?: string;

  /** Length of the divider (e.g., "100%", "60px"). */
  length?: string;

  /** Whether the divider should be dashed instead of solid. */
  dashed?: boolean;

  /**
   * Theme style to apply to the divider
   * ('primary' | 'secondary' | 'tertiary' | 'quaternary' | 'clear').
   */
  theme?: ThemeType;

  /**
   * State of the divider
   * ('success' | 'error' | 'warning' | 'disabled' | '').
   */
  state?: StateType;

  /**
   * HTML tag to render
   * ('div' | 'hr' | 'span').
   */
  as?: "div" | "hr" | "span";

  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

export interface DividerBaseProps extends DividerProps {
  classMap: Record<string, string>;
}
