import React, { useState, KeyboardEvent, useMemo, useId } from "react";
import { StarIcon } from "../../Icons";
import { combineClassNames } from "../../utils/classNames";
import {
  getDefaultSize,
  getDefaultTheme,
} from "../../config/boreal-style-config";
import { BaseRatingProps } from "./Rating.types";

const BaseRating: React.FC<BaseRatingProps> = ({
  value,
  onChange,
  max = 5,
  size = getDefaultSize(),
  interactive = true,
  theme = getDefaultTheme(),
  state = "",
  className = "",
  label,
  "data-testid": testId = "rating",
  classMap,
}) => {
  const uid = useId();
  const safeMax = Math.max(1, Math.floor(max || 1));
  const clampedValue = Math.min(safeMax, Math.max(0, Math.floor(value || 0)));
  const [hover, setHover] = useState<number | null>(null);

  const labelId = label ? `${uid}-label` : undefined;
  const groupProps = label
    ? { "aria-labelledby": labelId }
    : { "aria-label": "Rating" };

  const handleClick = (index: number) => {
    if (interactive && onChange) onChange(index + 1);
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLSpanElement>,
    index: number
  ) => {
    if (!interactive) return;

    const commit = (v: number) => onChange?.(v);

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        commit(index + 1);
        break;
      case "ArrowRight":
      case "ArrowUp": {
        event.preventDefault();
        const next = Math.min(safeMax, clampedValue + 1) || 1;
        commit(next);
        break;
      }
      case "ArrowLeft":
      case "ArrowDown": {
        event.preventDefault();
        const prev = Math.max(1, clampedValue - 1);
        commit(prev);
        break;
      }
      case "Home":
        event.preventDefault();
        commit(1);
        break;
      case "End":
        event.preventDefault();
        commit(safeMax);
        break;
    }
  };

  const wrapperClass = useMemo(
    () =>
      combineClassNames(
        classMap.wrapper,
        classMap[theme],
        classMap[state],
        classMap[size],
        interactive && classMap.interactive,
        className
      ),
    [classMap, theme, state, size, interactive, className]
  );

  return (
    <div className={classMap.container || ""}>
      {label && (
        <span
          id={labelId}
          className={classMap.label}
          data-testid={`${testId}-label`}
        >
          {label}
        </span>
      )}

      <div
        className={wrapperClass}
        role="radiogroup"
        {...groupProps}
        aria-disabled={!interactive || undefined}
        data-testid={testId}
      >
        {Array.from({ length: safeMax }).map((_, index) => {
          const active = index < (hover ?? clampedValue);
          const isChecked = clampedValue === index + 1;
          const isTabbable =
            interactive && (isChecked || (clampedValue === 0 && index === 0));

          return (
            <span
              key={index}
              className={combineClassNames(
                classMap.star,
                active && classMap.active
              )}
              onClick={() => handleClick(index)}
              onMouseEnter={() => interactive && setHover(index)}
              onMouseLeave={() => interactive && setHover(null)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              role="radio"
              aria-checked={!!isChecked}
              tabIndex={isTabbable ? 0 : -1}
              aria-label={`${index + 1} out of ${safeMax} stars`}
              data-testid={`${testId}-star-${index + 1}`}
            >
              <StarIcon aria-hidden="true" />
            </span>
          );
        })}
      </div>
    </div>
  );
};

BaseRating.displayName = "BaseRating";
export default BaseRating;
