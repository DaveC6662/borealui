import { forwardRef, useId, useState } from "react";
import { combineClassNames } from "@/utils/classNames";
import { TooltipProps } from "./Tooltip.types";

export const TooltipBase = forwardRef<
  HTMLDivElement,
  TooltipProps & { classMap: Record<string, string> }
>(
  (
    {
      content,
      position = "top",
      theme = "primary",
      children,
      className = "",
      "data-testid": testId = "tooltip",
      classMap,
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
        className={combineClassNames(classMap.tooltipContainer, className)}
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
          className={classMap.triggerWrapper}
        >
          {children}
        </span>
        <div
          ref={ref}
          id={tooltipId}
          className={combineClassNames(
            classMap.tooltip,
            classMap[position],
            classMap[theme]
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
