import {
  ThemeType,
  PositionType,
  SizeType,
  StateType,
  RoundingType,
  ShadowType,
} from "@/types/types";

/**
 * Props for the Chip component.
 */
export interface ChipProps {
  /** Optional unique ID for the chip. */
  id?: string;
  /** Message text to display inside the chip. */
  message: string;
  /** Whether the chip is currently visible. */
  visible: boolean;
  /** Optional icon component to show on the left side. */
  icon?: React.ElementType;
  /** Size of the chip (e.g., "small", "medium", "large"). */
  size?: SizeType;
  /** Whether to use a portal for rendering the chip. */
  usePortal?: boolean;
  /** Callback when the chip is closed manually or automatically. */
  onClose?: () => void;
  /** Theme color for the chip (e.g., "primary", "success", "error"). */
  theme?: ThemeType;
  /** Rounding style for the chip (e.g., "none", "small", "medium", "large"). */
  rounding?: RoundingType;
  /** Shadow style for the chip (e.g., "none", "light", "medium"). */
  shadow?: ShadowType;
  /** State of the chip (e.g., "success", "error"). */
  state?: StateType;
  /** Position of the chip on the screen. */
  position?: PositionType;
  /** Additional class name for custom styling. */
  className?: string;
  /** Index for stacking multiple chips, useful for z-index logic. */
  stackIndex?: number;
  /** Whether the chip should close automatically after a delay. */
  autoClose?: boolean;
  /** Time in milliseconds before auto-closing (default: 3000). */
  duration?: number;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}
