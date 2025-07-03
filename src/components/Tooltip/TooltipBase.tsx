import { forwardRef, useId, useMemo, useState } from "react";
import { combineClassNames } from "@/utils/classNames";
import { TooltipProps } from "./Tooltip.types";
import { capitalize } from "@/utils/capitalize";
import {
  defaultRounding,
  defaultShadow,
  defaultTheme,
} from "@/config/boreal-style-config";

export const TooltipBase = forwardRef<
  HTMLDivElement,
  TooltipProps & { classMap: Record<string, string> }
>(
  (
    {
      content,
      position = "top",
      theme = defaultTheme,
      rounding = defaultRounding,
      shadow = defaultShadow,
      state = "",
      children,
      className = "",
      "data-testid": testId = "tooltip",
      classMap,
      ...rest
    },
    ref
  ) => {
    const tooltipId = useId();
    const [visible, setVisible] = useState(false);
    const showTooltip = () => setVisible(true);
    const hideTooltip = () => setVisible(false);

    const toolTipClassName = useMemo(
      () =>
        combineClassNames(
          classMap.tooltip,
          classMap[position],
          classMap[theme],
          classMap[state],
          visible && classMap.visible,
          shadow && classMap[`shadow${capitalize(shadow)}`],
          rounding && classMap[`round${capitalize(rounding)}`]
        ),
      [classMap, position, theme, visible, shadow, rounding]
    );

    return (
      <div
        className={combineClassNames(classMap.container, className)}
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
          className={toolTipClassName}
          role="tooltip"
          data-testid={testId}
          aria-hidden={!visible}
          {...rest}
        >
          {content}
        </div>
      </div>
    );
  }
);

TooltipBase.displayName = "TooltipBase";
