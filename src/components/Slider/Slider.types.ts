import { SizeType, StateType, ThemeType } from "@/types/types";

/**
 * Props for the Slider component.
 */
export interface SliderProps {
    /** The current numeric value of the slider. */
    value: number;
    /**
     * Callback invoked when the slider value changes.
     * Receives the change event from the input element.
     */
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    /** The minimum value of the slider (default: 0). */
    min?: number;
    /** The maximum value of the slider (default: 100). */
    max?: number;
    /** Increment step for the slider (default: 1). */
    step?: number;
    /** Optional label displayed above or beside the slider. */
    label?: string;
    /** If true, the current slider value is displayed alongside the slider (default: true). */
    showValue?: boolean;
    /** Size variant for the slider (e.g., "small", "medium", "large"). */
    size?: SizeType;
    /** Theme variant for styling (e.g., "primary", "secondary"). */
  theme?: ThemeType;
  /** State of the slider ex "success", "warning", "error" */
  state?: StateType;
    /** Additional CSS class names for custom styling. */
    className?: string;
    /** Accessible label for the slider if label is not provided. */
    "aria-label"?: string;
    /** Optional test ID for testing frameworks. */
    "data-testid"?: string;
  }