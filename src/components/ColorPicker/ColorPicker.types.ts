import { SizeType } from "@/types/types";

/**
 * Represents a color option available for selection.
 */
export interface ColorOption {
  /** Label to display as a tooltip or for screen readers. */
  label: string;
  /** Color value (e.g., `#ff0000`, `rgb(255,0,0)`, `red`). */
  value: string;
}

type ShapeType = "square" | "round" | "pill";

/**
 * Props for the ColorPicker component.
 */
export interface ColorPickerProps {
  /** Optional label above the color group. */
  label?: string;
  /** Array of color options to choose from. */
  colors: ColorOption[];
  /** Currently selected color value. */
  selected: string;
  /** Callback triggered when a color is selected. */
  onChange: (color: string) => void;
  /** Optional name attribute for the radio group. */
  name?: string;
  /** Whether the picker is disabled. */
  disabled?: boolean;
  /** Size of the swatches ("small", "medium", "large"). */
  size?: SizeType;
  /** Shape of the swatches ("square", "round", "pill"). */
  shape?: ShapeType;
  /** If true, allows picking a custom color via a color input. */
  allowCustom?: boolean;
  /** Custom class name for the component container. */
  className?: string;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}
