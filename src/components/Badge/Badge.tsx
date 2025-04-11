"use client";

import React, { useMemo } from "react";
import styles from "./Badge.module.scss";
import { IconType } from "react-icons";
import { SizeType, ThemeType } from "@/types/types";
import { combineClassNames } from "@/utils/classNames";

/**
 * Props for the Badge component.
 */
export interface BadgeProps {
  /** Badge content text (fallback if no children provided) */
  text: string;
  /** Optional custom content to override `text` (e.g., formatted JSX) */
  children?: React.ReactNode;
  /** Theme color for the badge */
  theme?: ThemeType;
  /** Optional tooltip/title */
  title?: string;
  /** Badge size */
  size?: SizeType;
  /** Custom test ID for testing */
  testId?: string;
  /** Adds outline style */
  outline?: boolean;
  /** Optional icon component from react-icons */
  icon?: IconType;
  /** Custom class names */
  className?: string;
}

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
