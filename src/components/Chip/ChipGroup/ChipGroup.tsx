"use client";

import React, {
  useEffect,
  useCallback,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import Chip from "@components/Chip/Chip";
import { ThemeType, PositionType, SizeType } from "@/types/types";
import { v4 as uuidv4 } from "uuid";
import styles from "./ChipGroup.module.scss";
import { combineClassNames } from "@/utils/classNames";

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
interface ChipGroupProps {
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
 * A group of transient, dismissible `Chip` messages rendered in a specific screen position.
 * Chips can be auto-dismissed, removed manually, or cleared programmatically via ref.
 *
 * @param {ChipGroupProps} props - Props to configure the chip group.
 * @param {React.Ref} ref - Ref exposing the `closeAllChips` method.
 * @returns {JSX.Element} A rendered group of chips.
 */
const ChipGroup = forwardRef(({
  chips,
  onRemove,
  position = "topCenter",
  size = "medium",
  className = "",
}: ChipGroupProps, ref) => {
  const [visibleChips, setVisibleChips] = useState<ChipItem[]>([]);

  /**
   * Initialize chip IDs on mount/update.
   */
  useEffect(() => {
    const initialized = chips.map((chip) => ({
      ...chip,
      id: chip.id || uuidv4(),
    }));
    setVisibleChips(initialized);
  }, [chips]);

  /**
   * Handles closing of a chip by ID.
   */
  const handleClose = useCallback(
    (id: string) => {
      setVisibleChips((prev) => prev.filter((c) => c.id !== id));
      onRemove?.(id);
    },
    [onRemove]
  );

  /**
   * Exposes an imperative method to close all chips.
   */
  useImperativeHandle(ref, () => ({
    closeAllChips: () => {
      visibleChips.forEach((chip) => {
        handleClose(chip.id!);
      });
    },
  }));

  return (
    <div
      className={combineClassNames(
        styles.chipGroupContainer,
        styles[position],
        className
      )}
    >
      {visibleChips.map((chip, index) => (
        <Chip
          key={chip.id}
          id={chip.id}
          message={chip.message}
          icon={chip.icon}
          theme={chip.theme}
          size={chip.size || size}
          visible={true}
          onClose={() => handleClose(chip.id!)}
          autoClose={chip.autoClose}
          duration={chip.duration}
          position={chip.position || position}
          stackIndex={index}
          className={combineClassNames(
            chip.className,
            styles[`chipStack${index}`],
            styles[chip.position || position]
          )}
          data-testid={chip["data-testid"]}
        />
      ))}
    </div>
  );
});

ChipGroup.displayName = "ChipGroup";

export default ChipGroup;
