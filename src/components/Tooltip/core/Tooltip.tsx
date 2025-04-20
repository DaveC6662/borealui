import { forwardRef } from "react";
import "./Tooltip.scss";
import { TooltipBase } from "../TooltipBase";
import { TooltipProps } from "../Tooltip.types";

/**
 * Tooltip component for React (Core) using global SCSS classes.
 *
 * This component wraps `TooltipBase` and provides global class names
 * for layout, position, and theme styling. It is intended for use in projects
 * that rely on globally scoped styles rather than CSS Modules (e.g., standard React apps).
 *
 * @component
 * @example
 * ```tsx
 * <Tooltip content="This is a tooltip" position="top" theme="primary">
 *   <span>Hover me</span>
 * </Tooltip>
 * ```
 *
 * @param {TooltipProps} props - Props to configure the tooltip content, theme, position, and trigger.
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to the tooltip DOM element.
 * @returns {JSX.Element} A styled and accessible tooltip component using global SCSS.
 */
const Tooltip = forwardRef<HTMLDivElement, TooltipProps>((props, ref) => (
  <TooltipBase
    {...props}
    ref={ref}
    styles={{
      tooltipContainer: "tooltipContainer",
      triggerWrapper: "triggerWrapper",
      tooltip: "tooltip",
      top: "top",
      bottom: "bottom",
      left: "left",
      right: "right",
      primary: "primary",
      secondary: "secondary",
      success: "success",
      error: "error",
      warning: "warning",
      clear: "clear",
    }}
  />
));

Tooltip.displayName = "Tooltip";

export default Tooltip;
