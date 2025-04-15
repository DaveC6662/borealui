"use client";

import {
  forwardRef,
  useId,
} from "react";
import styles from "./Tooltip.module.scss";
import { combineClassNames } from "@/utils/classNames";
import { TooltipProps } from "../Tooltip.types";

/**
 * Tooltip component displays additional information when hovering over or focusing on an element.
 * It wraps the trigger element and renders an accessible tooltip with customizable content,
 * position, and theme.
 *
 * @component
 * @example
 * ```tsx
 * <Tooltip content="This is a tooltip message" position="bottom" theme="primary">
 *   <button>Hover over me</button>
 * </Tooltip>
 * ```
 *
 * @param {TooltipProps} props - Props to configure the Tooltip component.
 * @param {React.Ref<HTMLDivElement>} ref - A ref forwarded to the tooltip element.
 * @returns {JSX.Element} The rendered Tooltip component.
 */
const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      position = "top",
      theme = "primary",
      children,
      className = "",
      "data-testid": testId = "tooltip",
      ...rest
    },
    ref
  ) => {
    // Unique ID for associating the tooltip with the trigger for ARIA.
    const tooltipId = useId();

    return (
      <div
        className={combineClassNames(styles.tooltipContainer, className)}
        data-testid={`${testId}-container`}
      >
        {/* Trigger wrapper (can be focused by keyboard if needed) */}
        <span
          tabIndex={0}
          aria-describedby={tooltipId}
          data-testid={`${testId}-trigger`}
          className={styles.triggerWrapper}
        >
          {children}
        </span>

        {/* Tooltip content */}
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
