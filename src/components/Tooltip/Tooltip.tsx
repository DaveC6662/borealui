"use client";

import React, { ReactNode, forwardRef, useId, HTMLAttributes } from "react";
import styles from "./Tooltip.module.scss";
import { ThemeType } from "@/types/types";
import { combineClassNames } from "@/utils/classNames";

/**
 * Props for the Tooltip component.
 *
 * @property {string} content - The text content to display inside the tooltip.
 * @property {"top" | "bottom" | "left" | "right"} [position="top"] - The position of the tooltip relative to the trigger element.
 * @property {ThemeType} [theme="primary"] - The theme/style variant for the tooltip.
 * @property {ReactNode} children - The trigger element(s) which will display the tooltip on hover/focus.
 * @property {string} [data-testid="tooltip"] - Optional test identifier.
 * @extends HTMLAttributes<HTMLDivElement>
 */
interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  theme?: ThemeType;
  children: ReactNode;
  "data-testid"?: string;
}

/**
 * Tooltip component displays additional information when hovering over or focusing on an element.
 * It wraps the trigger element and renders an accessible tooltip with customizable content,
 * position, and theme.
 *
 * @component
 * @example
 * <Tooltip content="This is a tooltip message" position="bottom" theme="primary">
 *   <button>Hover over me</button>
 * </Tooltip>
 *
 * @param {TooltipProps} props - Props to configure the Tooltip component.
 * @param {React.Ref<HTMLDivElement>} ref - A ref to the tooltip element.
 * @returns {JSX.Element} The rendered Tooltip component.
 */
const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      position = "top",
      theme = "primary",
      children,
      "data-testid": testId = "tooltip",
      ...rest
    },
    ref
  ) => {
    // Create a unique ID for tooltip accessibility linking.
    const tooltipId = useId();

    return (
      <div className={styles.tooltipContainer} data-testid={`${testId}-container`}>
        <div
          aria-describedby={tooltipId}
          data-testid={`${testId}-trigger`}
        >
          {children}
        </div>
        <div
          ref={ref}
          id={tooltipId}
          className={combineClassNames(
            styles.tooltip,
            styles[position],
            styles[theme]
          )}
          role="tooltip"
          data-testid={testId}
          {...rest}
        >
          {content}
        </div>
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";
export default Tooltip;
