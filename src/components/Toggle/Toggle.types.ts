import {
  RoundingType,
  ShadowType,
  SizeType,
  StateType,
  ThemeType,
} from "@/types/types";

/**
 * Props for the Toggle component.
 */
export interface ToggleProps {
  /** Indicates whether the toggle is in the "on" (true) or "off" (false) state. */
  checked: boolean;
  /**
   * Callback that is invoked when the toggle's state changes.
   * Receives the new boolean state as an argument.
   */
  onChange: (checked: boolean) => void;
  /** Optional label to be displayed next to the toggle switch. */
  label?: string;
  /** Theme used for styling the toggle (e.g., "primary", "secondary"). Defaults to "primary". */
  theme?: ThemeType;
  /** State of the toggle (e.g., "success", "error"). Defaults to "". */
  state?: StateType;
  /** Rounding applied to the toggle (e.g., "small", "medium", "large"). Defaults to "medium". */
  rounding?: RoundingType;
  /** Shadow style applied to the toggle (e.g., "none", "light", "medium"). Defaults to "medium". */
  shadow?: ShadowType;
  /** Size variant for the toggle (e.g., "small", "medium", "large"). Defaults to "medium". */
  size?: SizeType;
  /** If true, disables user interaction with the toggle. */
  disabled?: boolean;
  /** Additional CSS class names for custom styling. */
  className?: string;
  /** Optional test ID for testing frameworks. Defaults to "toggle". */
  "data-testid"?: string;
}
