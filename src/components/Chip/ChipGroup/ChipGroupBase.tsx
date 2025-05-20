import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import type { ChipGroupProps, ChipGroupRef } from "./ChipGroup.types";
import type { ChipProps } from "../Chip.types";
import { v4 as uuidv4 } from "uuid";
import { combineClassNames } from "@/utils/classNames";

export interface ChipGroupBaseProps extends ChipGroupProps {
  ChipComponent: React.ElementType;
  classMap: Record<string, string>;
}

const ChipGroupBase = forwardRef<ChipGroupRef, ChipGroupBaseProps>(
  (
    {
      chips,
      onRemove,
      position = "topCenter",
      size = "medium",
      className = "",
      ChipComponent,
      classMap,
    },
    ref
  ) => {
    const [visibleChips, setVisibleChips] = useState<ChipProps[]>([]);

    useEffect(() => {
      const initialized = chips.map((chip) => ({
        ...chip,
        id: chip.id || uuidv4(),
      }));
      setVisibleChips(initialized);
    }, [chips]);

    const handleClose = useCallback(
      (id: string) => {
        setVisibleChips((prev) => prev.filter((c) => c.id !== id));
        onRemove?.(id);
      },
      [onRemove]
    );

    useImperativeHandle(ref, () => ({
      closeAllChips: () => {
        visibleChips.forEach((chip) => handleClose(chip.id!));
      },
    }));

    const containerClassName = [
      classMap.container,
      classMap[position],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        className={containerClassName}
        role="region"
        aria-label="Notifications"
        aria-live="polite"
        data-testid="chip-group"
      >
        <ul role="list" className={classMap.list}>
          {visibleChips.map((chip, index) => {
            const chipPosition = chip.position || position;
            const chipPositionClass = classMap[chipPosition];

            return (
              <li key={chip.id} role="listitem">
                <ChipComponent
                  id={chip.id}
                  message={chip.message}
                  icon={chip.icon}
                  theme={chip.theme}
                  size={chip.size || size}
                  visible={true}
                  onClose={() => handleClose(chip.id!)}
                  autoClose={chip.autoClose}
                  duration={chip.duration}
                  position={chipPosition}
                  usePortal={false}
                  stackIndex={index}
                  className={combineClassNames(
                    classMap.chip,
                    chip.className,
                    chipPositionClass
                  )}
                  data-testid={chip["data-testid"]}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);

ChipGroupBase.displayName = "ChipGroupBase";
export default ChipGroupBase;
