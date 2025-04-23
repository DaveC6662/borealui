import { ThemeType } from "@/types/types";

/**
 * Represents a single option in the Select component.
 */
interface Option {
  /** The value to be used for the option. */
  value: string;
  /** The display label for the option. */
  label: string;
}

/**
 * Props for the Select component.
 */
export interface SelectProps {
  /** Theme for styling (e.g., "primary", "secondary"). */
  theme?: ThemeType;
  /** An array of options that will be rendered as dropdown choices. */
  options: Option[];
  /** The current selected value. */
  value: string;
  /**
   * Callback fired when the selected option changes.
   * Receives the new value as an argument.
   */
  onChange: (value: string) => void;
  /** Placeholder text to display when no option is selected. */
  placeholder?: string;
  /** Accessible label for the select element. */
  ariaLabel?: string;
  /** Optional description for the select element, used for accessibility. */
  ariaDescription?: string;
  /** If true, the select element is disabled. */
  disabled?: boolean;
  /** Additional class name(s) for custom styling. */
  className?: string;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}
