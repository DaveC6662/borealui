import React, { useState, KeyboardEvent, JSX } from "react";
import { FaStar } from "react-icons/fa";
import { RatingProps } from "./Rating.types";

export interface BaseRatingProps extends RatingProps {
  classNames: {
    wrapper: string;
    star: string;
    active: string;
    themeMap: Record<string, string>;
    sizeMap: Record<string, string>;
    interactive: string;
  };
}

const BaseRating: React.FC<BaseRatingProps> = ({
  value,
  onChange,
  max = 5,
  size = "medium",
  interactive = true,
  theme = "primary",
  className = "",
  "data-testid": testId = "rating",
  classNames,
}: BaseRatingProps): JSX.Element => {
  const [hover, setHover] = useState<number | null>(null);

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

  return (
    <div
      className={[
        classNames.wrapper,
        classNames.themeMap[theme],
        classNames.sizeMap[size],
        interactive ? classNames.interactive : "",
        className,
      ].join(" ")}
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
            className={`${classNames.star} ${active ? classNames.active : ""}`}
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
            <FaStar aria-hidden="true" />
          </span>
        );
      })}
    </div>
  );
};

export default BaseRating;
