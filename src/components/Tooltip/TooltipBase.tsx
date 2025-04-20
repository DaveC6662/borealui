import React, { forwardRef, useId, useState } from "react";
import { combineClassNames } from "@/utils/classNames";
import { TooltipProps } from "./Tooltip.types";

/**
 * Accessible and interactive base component for a tooltip.
 *
 * This component manages visibility through mouse and keyboard events,
 * enhancing usability for all users, including those relying on keyboard navigation or screen readers.
 *
 * @component
 *
 * @param {TooltipProps & { styles: Record<string, string> }} props - The component props.
 * @param {React.ReactNode} props.content - The content displayed inside the tooltip.
 * @param {"top" | "bottom" | "left" | "right"} [props.position="top"] - The position of the tooltip relative to its trigger.
 * @param {string} [props.theme="primary"] - The visual theme of the tooltip.
 * @param {React.ReactNode} props.children - The element that triggers the tooltip on hover or focus.
 * @param {string} [props.className=""] - Optional additional CSS class names.
 * @param {string} [props["data-testid"]="tooltip"] - Identifier for test automation.
 * @param {Record<string, string>} props.styles - An object mapping style names to CSS module or global class names.
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the tooltip element.
 *
 * @example
 * ```tsx
 * <TooltipBase
 *   content="Additional info"
 *   position="bottom"
 *   theme="secondary"
 *   styles={styles}
 * >
 *   <button>Hover or focus me</button>
 * </TooltipBase>
 * ```
 *
 * @returns {JSX.Element} The rendered TooltipBase component.
 */
export const TooltipBase = forwardRef<
  HTMLDivElement,
  TooltipProps & { styles: Record<string, string> }
>(
  (
    {
      content,
      position = "top",
      theme = "primary",
      children,
      className = "",
      "data-testid": testId = "tooltip",
      styles,
      ...rest
    },
    ref
  ) => {
    /** Unique ID used for ARIA linkage between the tooltip trigger and tooltip content. */
    const tooltipId = useId();

    /** Manages the tooltip visibility state. */
    const [visible, setVisible] = useState(false);

    /** Shows the tooltip when user focuses or hovers over the trigger. */
    const showTooltip = () => setVisible(true);

    /** Hides the tooltip when user blurs or moves away from the trigger. */
    const hideTooltip = () => setVisible(false);

    return (
      <div
        className={combineClassNames(styles.tooltipContainer, className)}
        data-testid={`${testId}-container`}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        <span
          tabIndex={0}
          aria-describedby={tooltipId}
          data-testid={`${testId}-trigger`}
          className={styles.triggerWrapper}
        >
          {children}
        </span>
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
          aria-hidden={!visible}
          style={{
            visibility: visible ? "visible" : "hidden",
            opacity: visible ? 1 : 0,
          }}
          {...rest}
        >
          {content}
        </div>
      </div>
    );
  }
);

TooltipBase.displayName = "TooltipBase";
