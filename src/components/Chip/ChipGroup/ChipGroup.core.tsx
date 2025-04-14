import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useState,
  } from "react";
  import { Chip } from "@/index";
  import { v4 as uuidv4 } from "uuid";
  import styles from "./ChipGroup.module.scss";
  import { combineClassNames } from "@/utils/classNames";
import { ChipGroupProps, ChipGroupRef, ChipItem } from "./ChipGroup.types";
  
 
  
  /**
   * A group of transient, dismissible `Chip` messages rendered in a specific screen position.
   * Chips can be auto-dismissed, removed manually, or cleared programmatically via ref.
   *
   * @param {ChipGroupProps} props - Props to configure the chip group.
   * @param {React.Ref} ref - Ref exposing the `closeAllChips` method.
   * @returns {JSX.Element} A rendered group of chips.
   */
  const ChipGroup = forwardRef<ChipGroupRef, ChipGroupProps>(
    ({ chips, onRemove, position = "topCenter", size = "medium", className = "" }, ref) => {
      const [visibleChips, setVisibleChips] = useState<ChipItem[]>([]);
  
      /** Initialize chip IDs on mount/update. */
      useEffect(() => {
        const initialized = chips.map((chip) => ({
          ...chip,
          id: chip.id || uuidv4(),
        }));
        setVisibleChips(initialized);
      }, [chips]);
  
      /** Handles closing of a chip by ID. */
      const handleClose = useCallback(
        (id: string) => {
          setVisibleChips((prev) => prev.filter((c) => c.id !== id));
          onRemove?.(id);
        },
        [onRemove]
      );
  
      /** Expose a ref method to close all chips programmatically. */
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
    }
  );
  
  ChipGroup.displayName = "ChipGroup";
  
  export default ChipGroup;
  