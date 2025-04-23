import React, { forwardRef } from "react";
import { DividerProps } from "./Divider.types";
import { combineClassNames } from "@/utils/classNames";

export interface DividerBaseProps extends DividerProps {
  styles: Record<string, string>;
}

const DividerBase = forwardRef<HTMLElement, DividerBaseProps>(
  (
    {
      orientation = "horizontal",
      thickness = "1px",
      length = "100%",
      className = "",
      dashed = false,
      theme = "",
      as = "div",
      styles,
      "data-testid": testId = "divider",
      "aria-hidden": ariaHidden,
      ...rest
    },
    ref
  ) => {
    const isVertical = orientation === "vertical";

    const style: React.CSSProperties = {
      width: isVertical ? thickness : length,
      height: isVertical ? length : thickness,
      backgroundColor: dashed ? "transparent" : undefined,
    };

    const ComponentTag = as;

    const role = ComponentTag === "hr" ? undefined : "separator";

    return (
      <ComponentTag
        ref={ref as never}
        className={combineClassNames(
          styles.divider,
          styles[orientation],
          theme && styles[theme],
          dashed && styles.dashed,
          className
        )}
        {...(role && { role })}
        {...(role && isVertical && { "aria-orientation": "vertical" })}
        {...(ariaHidden !== undefined && { "aria-hidden": ariaHidden })}
        style={style}
        data-testid={testId}
        {...rest}
      />
    );
  }
);

DividerBase.displayName = "DividerBase";

export default DividerBase;
