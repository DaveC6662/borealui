import React, { useState, KeyboardEvent } from "react";
import { FaStar } from "react-icons/fa";
import styles from "./Rating.module.scss";
import { RatingProps } from "../Rating.types";

/**
 * A reusable star-based Rating component with full keyboard and mouse interactivity.
 *
 * @param {RatingProps} props - The configuration props.
 * @returns {JSX.Element} The rendered rating UI.
 */
const Rating: React.FC<RatingProps> = ({
  value,
  onChange,
  max = 5,
  size = "medium",
  interactive = true,
  theme = "primary",
  className = "",
  "data-testid": testId = "rating",
}) => {
  const [hover, setHover] = useState<number | null>(null);

  /**
   * Handle user clicking on a star to change rating.
   */
  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index + 1);
    }
  };

  /**
   * Handle keyboard input for star interaction.
   */
  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>, index: number) => {
    if (!interactive) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick(index);
    } else if (event.key === "ArrowRight" && index < max - 1) {
      event.preventDefault();
      onChange?.(index + 2);
    } else if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      onChange?.(index);
    }
  };

  return (
    <div
      className={`${styles.rating} ${styles[theme]} ${styles[size]} ${
        interactive ? styles.interactive : ""
      } ${className}`}
      role="radiogroup"
      aria-label="Rating"
      data-testid={testId}
    >
      {Array.from({ length: max }, (_, index) => {
        const active = index < (hover ?? value);
        const isChecked = value === index + 1;

        return (
          <span
            key={index}
            className={`${styles.star} ${active ? styles.active : ""}`}
            onClick={() => handleClick(index)}
            onMouseEnter={() => interactive && setHover(index)}
            onMouseLeave={() => interactive && setHover(null)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            role="radio"
            aria-checked={isChecked}
            tabIndex={interactive ? 0 : -1}
            aria-label={`${index + 1} ${index + 1 === 1 ? "star" : "stars"}`}
            data-testid={`${testId}-star-${index + 1}`}
          >
            <FaStar aria-hidden="true" />
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
