"use client";

import React, { useMemo } from "react";
import styles from "./Badge.module.scss";
import { BadgeProps } from "../Badge.types";
import { combineClassNames } from "@/utils/classNames";

/**
 * A flexible badge component that supports icons, accessibility, and styling variants.
 *
 * @example
 * <Badge text="New" theme="success" icon={FaCheck} />
 */
const Badge: React.FC<BadgeProps> = ({
  text,
  children,
  theme = "primary",
  title,
  size = "medium",
  outline = false,
  testId = "badge",
  icon: Icon,
  className = "",
}) => {
  const combinedClassName = useMemo(
    () =>
      combineClassNames(
        styles.badge,
        styles[theme],
        styles[size],
        outline && styles.outline,
        className
      ),
    [theme, size, outline, className]
  );

  if (!text && !children) return null;

  return (
    <span
      className={combinedClassName}
      aria-label={text}
      title={title || text}
      data-testid={testId}
      role="note"
    >
      {Icon && <Icon className={styles.icon} aria-hidden="true" focusable="false" />}
      {children ?? text}
    </span>
  );
};

export default Badge;
