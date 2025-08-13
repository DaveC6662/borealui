import { RoundingType, ShadowType, StateType, ThemeType } from "@/types/types";

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
  /**
   * Theme for styling.
   * "primary" | "secondary" | "tertiary" | "quaternary" | "clear"
   */
  theme?: ThemeType;

  /**
   * State variant for styling.
   * "success" | "error" | "warning" | "disabled" | ""
   */
  state?: StateType;

  /**
   * If true, the select element is styled as outlined.
   */
  outline?: boolean;

  /**
   * An array of options that will be rendered as dropdown choices.
   */
  options: Option[];

  /**
   * The current selected value.
   */
  value: string;

  /**
   * Callback fired when the selected option changes.
   * Receives the new value as an argument.
   */
  onChange: (value: string) => void;

  /**
   * If provided, the select element will render options asynchronously (with debounce).
   * Should return a Promise resolving to Option[] based on search query.
   */
  asyncOptions?: (query: string) => Promise<Option[]>;

  /**
   * Optional polling interval for updating options in milliseconds.
   */
  pollInterval?: number;

  /**
   * Placeholder text to display when no option is selected.
   */
  placeholder?: string;

  /**
   * Rounding style of the select element.
   * "none" | "small" | "medium" | "large" | "full"
   */
  rounding?: RoundingType;

  /**
   * Shadow style of the select element.
   * "none" | "light" | "medium" | "strong" | "intense"
   */
  shadow?: ShadowType;

  /** Whether the select element is required. */
  required?: boolean;

  /**
   * Accessible label for the select element.
   */
  ariaLabel?: string;

  /**
   * Optional description for the select element, used for accessibility.
   */
  ariaDescription?: string;

  /**
   * If true, the select element is disabled.
   */
  disabled?: boolean;

  /**
   * Name for the select element.
   */
  name?: string;

  /**
   * Additional class name(s) for custom styling.
   */
  className?: string;

  /**
   * Optional test ID for testing frameworks.
   */
  "data-testid"?: string;
}

export interface BaseSelectProps extends SelectProps {
  classMap: Record<string, string>;
}
