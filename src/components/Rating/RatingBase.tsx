import React, { useState, KeyboardEvent, JSX, useMemo } from "react";
import { StarIcon } from "../../Icons";
import { RatingProps } from "./Rating.types";
import { combineClassNames } from "../../utils/classNames";
import {
  getDefaultSize,
  getDefaultTheme,
} from "../../config/boreal-style-config";

export interface BaseRatingProps extends RatingProps {
  classMap: Record<string, string>;
}

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
}: BaseRatingProps): JSX.Element => {
  const [hover, setHover] = useState<number | null>(null);
  const labelId = label ? `${testId}-label` : undefined;

  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index + 1);
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLSpanElement>,
    index: number
  ) => {
    if (!interactive) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick(index);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      const next = (index + 1) % max;
      onChange?.(next + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      const prev = (index - 1 + max) % max;
      onChange?.(prev + 1);
    }
  };

  const wrapperClass = useMemo(
    () =>
      combineClassNames(
        classMap.wrapper,
        classMap[theme],
        classMap[state],
        classMap[size],
        interactive ? classMap.interactive : "",
        className
      ),
    [classMap, theme, state, size, interactive, className]
  );

  return (
    <div className={classMap.container || ""}>
      {label && (
        <label id={labelId} className={classMap.label} htmlFor={undefined}>
          {label}
        </label>
      )}
      <div
        className={wrapperClass}
        role="radiogroup"
        aria-label="Rating"
        data-testid={testId}
      >
        {Array.from({ length: max }).map((_, index) => {
          const active = index < (hover ?? value);
          const isChecked = value === index + 1;

          return (
            <span
              key={index}
              className={combineClassNames(
                classMap.star,
                active ? classMap.active : ""
              )}
              onClick={() => handleClick(index)}
              onMouseEnter={() => interactive && setHover(index)}
              onMouseLeave={() => interactive && setHover(null)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              role="radio"
              aria-checked={isChecked}
              tabIndex={interactive && (isChecked || index === 0) ? 0 : -1}
              aria-label={`${index + 1} out of ${max} stars`}
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

export default BaseRating;
