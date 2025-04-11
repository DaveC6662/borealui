"use client";

import React, { forwardRef } from "react";
import styles from "./Divider.module.scss";
import { ThemeType, OrientationType } from "@/types/types";
import { combineClassNames } from "@/utils/classNames";

/**
 * Props for the Divider component.
 */
export interface DividerProps extends React.HTMLAttributes<HTMLElement> {
  /** Orientation of the divider: "horizontal" (default) or "vertical". */
  orientation?: OrientationType;
  /** Thickness of the divider (e.g., "1px", "4px"). */
  thickness?: string;
  /** Length of the divider (e.g., "100%", "60px"). */
  length?: string;
  /** Whether the divider should be dashed instead of solid. */
  dashed?: boolean;
  /** Optional theme styling. */
  theme?: ThemeType;
  /** HTML tag to render (e.g., "div", "hr", or "span"). */
  as?: "div" | "hr" | "span";
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

/**
 * Divider is a flexible, styled visual separator. It supports vertical or horizontal layout,
 * optional dashed styling, custom thickness and length, and semantic roles for accessibility.
 *
 * @param {DividerProps} props - Props to configure the divider.
 * @param {React.Ref<HTMLElement>} ref - Ref forwarded to the underlying element.
 * @returns {JSX.Element} A styled horizontal or vertical divider.
 */
const Divider = forwardRef<HTMLElement, DividerProps>(({
  orientation = "horizontal",
  thickness = "1px",
  length = "100%",
  className = "",
  dashed = false,
  theme = "",
  as = "div",
  "data-testid": testId,
  ...rest
}, ref) => {
  const isVertical = orientation === "vertical";

  /** Determines the inline styles based on orientation and custom sizing. */
  const style: React.CSSProperties = {
    width: isVertical ? thickness : length,
    height: isVertical ? length : thickness,
    backgroundColor: dashed ? "transparent" : undefined,
  };

  const ComponentTag = as;

  return (
    <ComponentTag
      ref={ref as never}
      className={combineClassNames(
        styles.divider,
        styles[orientation],
        styles[theme],
        dashed && styles.dashed,
        className
      )}
      role="separator"
      aria-orientation={orientation}
      style={style}
      data-testid={testId}
      {...rest}
    />
  );
});

Divider.displayName = "Divider";

export default React.memo(Divider);
