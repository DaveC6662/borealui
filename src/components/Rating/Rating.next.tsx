"use client";

import React, { useState, KeyboardEvent, JSX } from "react";
import { FaStar } from "react-icons/fa";
import styles from "./Rating.module.scss";
import { RatingProps } from "./Rating.types";

/**
 * Rating component displays a series of stars representing a rating value.
 * Users can interact with the stars (via mouse or keyboard) to change the rating
 * when the component is marked as interactive. It uses proper ARIA roles and attributes 
 * to ensure accessibility.
 *
 * @param {RatingProps} props - Props for configuring the Rating component.
 * @returns {JSX.Element} A renderable rating component.
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
}: RatingProps): JSX.Element => {
  // Local state to track the current hover index (if any)
  const [hover, setHover] = useState<number | null>(null);

  /**
   * Handles clicking on a star to set the new rating.
   *
   * @param {number} index - The star index that was clicked.
   */
  const handleClick = (index: number) => {
    if (interactive && onChange) {
      onChange(index + 1);
    }
  };

  /**
   * Handles keyboard events (Enter, Space, Arrow keys) for accessibility.
   *
   * - "Enter" or " " (space): Sets rating based on the focused star.
   * - "ArrowRight": Increases the rating.
   * - "ArrowLeft": Decreases the rating.
   *
   * @param {KeyboardEvent<HTMLSpanElement>} event - The keyboard event.
   * @param {number} index - The index of the focused star.
   */
  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>, index: number) => {
    if (!interactive) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick(index);
    } else if (event.key === "ArrowRight" && index < max - 1) {
      event.preventDefault();
      const next = index + 2;
      onChange?.(next);
    } else if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      const prev = index;
      onChange?.(prev);
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
      {[...Array(max)].map((_, index) => {
        // Determine if this star is active (based on hover or current rating)
        const active = index < (hover ?? value);
        // Check if this star is exactly the current selection (for ARIA)
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
