import React, { forwardRef } from "react";
import { DividerBaseProps } from "./Divider.types";
import { combineClassNames } from "../../utils/classNames";
import { getDefaultTheme } from "../../config/boreal-style-config";

const DividerBase = forwardRef<HTMLElement, DividerBaseProps>(
  (
    {
      orientation = "horizontal",
      thickness = "1px",
      length = "100%",
      className = "",
      dashed = false,
      theme = getDefaultTheme(),
      state = "",
      as = "div",
      classMap,
      "data-testid": testId = "divider",
      "aria-hidden": ariaHidden,
      ...rest
    },
    ref
  ) => {
    const isVertical = orientation === "vertical";

    const ComponentTag = as;

    const needsExplicitRole = ComponentTag !== "hr" || isVertical;
    const role = needsExplicitRole ? "separator" : undefined;

    const style: React.CSSProperties =
      ComponentTag === "hr"
        ? {
            border: 0,
            margin: 0,
            ...(isVertical
              ? {
                  width: 0,
                  height: length,
                  borderLeft: `${thickness} ${dashed ? "dashed" : "solid"} currentColor`,
                }
              : {
                  height: 0,
                  width: length,
                  borderTop: `${thickness} ${dashed ? "dashed" : "solid"} currentColor`,
                }),
          }
        : {
            width: isVertical ? thickness : length,
            height: isVertical ? length : thickness,
            backgroundColor: dashed ? "transparent" : undefined,
          };

    return (
      <ComponentTag
        ref={ref as never}
        className={combineClassNames(
          classMap.divider,
          classMap[orientation],
          theme && classMap[theme],
          state && classMap[state],
          dashed && classMap.dashed,
          className
        )}
        {...(role && { role })}
        {...(isVertical && { "aria-orientation": "vertical" })}
        {...(ariaHidden !== undefined && { "aria-hidden": ariaHidden })}
        data-orientation={orientation}
        style={style}
        data-testid={testId}
        {...rest}
      />
    );
  }
);

DividerBase.displayName = "DividerBase";

export default DividerBase;
