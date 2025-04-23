import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import type { ChipGroupProps, ChipGroupRef, ChipItem } from "./ChipGroup.types";
import { v4 as uuidv4 } from "uuid";

export interface ChipGroupBaseProps extends ChipGroupProps {
  ChipComponent: React.ElementType;
  classMap: {
    container: string;
    stackClassPrefix?: string;
    list?: string;
  };
  positionMap: Record<string, string>;
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
      positionMap,
    },
    ref
  ) => {
    const [visibleChips, setVisibleChips] = useState<ChipItem[]>([]);

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
      positionMap[position],
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
          {visibleChips.map((chip, index) => (
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
                position={chip.position || position}
                stackIndex={index}
                className={[
                  chip.className,
                  classMap.stackClassPrefix
                    ? `${classMap.stackClassPrefix}${index}`
                    : "",
                  positionMap[chip.position || position] || "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                data-testid={chip["data-testid"]}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

ChipGroupBase.displayName = "ChipGroupBase";

export default ChipGroupBase;
