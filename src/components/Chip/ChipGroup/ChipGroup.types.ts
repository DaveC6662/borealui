import { ThemeType, PositionType, SizeType } from "@/types/types";


/**
 * Represents a single chip item in the group.
 */
export interface ChipItem {
  /** Optional unique ID for the chip (auto-generated if not provided). */
  id?: string;
  /** Text message to display in the chip. */
  message: string;
  /** Optional theme for the chip (e.g., "primary", "error"). */
  theme?: ThemeType;
  /** Optional icon component to display in the chip. */
  icon?: React.ElementType;
  /** Optional size for the chip (e.g., "small", "medium"). */
  size?: SizeType;
  /** Whether the chip should close automatically. */
  autoClose?: boolean;
  /** Time in milliseconds before autoClose triggers. */
  duration?: number;
  /** Position on the screen (e.g., "topCenter", "bottomRight"). */
  position?: PositionType;
  /** Custom class name for individual chip. */
  className?: string;
  /** Optional callback when the chip is closed. */
  onClose?: () => void;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

/**
 * Props for the ChipGroup component.
 */
export interface ChipGroupProps {
  /** Array of chips to render in the group. */
  chips: ChipItem[];
  /** Optional callback when a chip is removed. */
  onRemove?: (id: string) => void;
  /** Default position for chips in the group. */
  position?: PositionType;
  /** Default size for chips if not individually specified. */
  size?: SizeType;
  /** Optional class name for the chip group container. */
  className?: string;
}

 /**
   * Exposed methods via forwarded ref for ChipGroup.
   */
 export interface ChipGroupRef {
    /** Closes all chips currently visible in the group. */
    closeAllChips: () => void;
  }