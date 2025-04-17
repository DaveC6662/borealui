import React, { forwardRef } from "react";
import "./Divider.scss";
import { combineClassNames } from "../../../utils/classNames";
import { DividerProps } from "../Divider.types";

/**
 * Divider is a flexible, styled visual separator. It supports vertical or horizontal layout,
 * optional dashed styling, custom thickness and length, and semantic roles for accessibility.
 *
 * @param {DividerProps} props - Props to configure the divider.
 * @param {React.Ref<HTMLElement>} ref - Ref forwarded to the underlying element.
 * @returns {JSX.Element} A styled horizontal or vertical divider.
 */
const Divider = forwardRef<HTMLElement, DividerProps>(
  (
    {
      orientation = "horizontal",
      thickness = "1px",
      length = "100%",
      className = "",
      dashed = false,
      theme = "",
      as = "div",
      "data-testid": testId,
      ...rest
    },
    ref
  ) => {
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
          "divider",
          orientation,
          theme,
          dashed && "dashed",
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

Divider.displayName = "Divider";

export default React.memo(Divider);
