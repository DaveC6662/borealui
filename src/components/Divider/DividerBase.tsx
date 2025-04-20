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
      "data-testid": testId,
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
        role="separator"
        aria-orientation={orientation}
        style={style}
        data-testid={testId}
        {...rest}
      />
    );
  }
);

DividerBase.displayName = "DividerBase";

export default DividerBase;
