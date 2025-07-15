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

  /**
   * Size of the chip
   * ('xs' | 'small' | 'medium' | 'large' | 'xl').
   */
  size?: SizeType;

  /** Whether to use a portal for rendering the chip. */
  usePortal?: boolean;

  /** Callback when the chip is closed manually or automatically. */
  onClose?: () => void;

  /**
   * Theme color for the chip
   * ('primary' | 'secondary' | 'tertiary' | 'quaternary' | 'clear').
   */
  theme?: ThemeType;

  /**
   * Rounding style for the chip
   * ('none' | 'small' | 'medium' | 'large' | 'full').
   */
  rounding?: RoundingType;

  /**
   * Shadow style for the chip
   * ('none' | 'light' | 'medium' | 'strong' | 'intense').
   */
  shadow?: ShadowType;

  /**
   * State of the chip
   * ('success' | 'error' | 'warning' | 'disabled' | '').
   */
  state?: StateType;

  /**
   * Position of the chip on the screen
   * ('topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight').
   */
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
