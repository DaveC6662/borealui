import { PositionType, SizeType } from "@/types/types";
import { ChipProps } from "../Chip.types";

/**
 * Props for the ChipGroup component.
 */
export interface ChipGroupProps {
  /** Array of chips to render in the group. */
  chips: ChipProps[];
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
