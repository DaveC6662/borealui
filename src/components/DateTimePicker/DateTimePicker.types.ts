import { SizeType, ThemeType } from "@/types/types";

/**
 * Props for the DateTimePicker component.
 */
export interface DateTimePickerProps {
    /** Optional label displayed above the input. */
    label?: string;
    /** Current value in ISO 8601 format (e.g., "2025-04-10T12:00"). */
    value?: string;
    /** Callback triggered when the date/time value changes. */
    onChange?: (newValue: string) => void;
    /** Minimum allowed date/time (ISO 8601 format). */
    min?: string;
    /** Maximum allowed date/time (ISO 8601 format). */
    max?: string;
    /** Name attribute for form submission. */
    name?: string;
    /** Additional class name for custom styling. */
    className?: string;
    /** Whether the input is required for form validation. */
    required?: boolean;
    /** Whether the input is disabled. */
    disabled?: boolean;
    /** Thematic style (e.g., "primary", "secondary"). */
    theme?: ThemeType;
    /** Size of the component ("small", "medium", "large"). */
    size?: SizeType;
    /** Whether to use outlined styling. */
    outline?: boolean;
    /** Optional test ID for testing frameworks. */
    "data-testid"?: string;
  }