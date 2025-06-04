import { forwardRef } from "react";
import "./Tooltip.scss";
import { TooltipBase } from "../TooltipBase";
import { TooltipProps } from "../Tooltip.types";

const classes = {
  container: "tooltip_container",
  triggerWrapper: "tooltip_triggerWrapper",
  tooltip: "tooltip",
  top: "tooltip_top",
  bottom: "tooltip_bottom",
  left: "tooltip_left",
  right: "tooltip_right",
  primary: "tooltip_primary",
  secondary: "tooltip_secondary",
  tertiary: "tooltip_tertiary",
  quaternary: "tooltip_quaternary",
  success: "tooltip_success",
  error: "tooltip_error",
  warning: "tooltip_warning",
  clear: "tooltip_clear",
};

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>((props, ref) => (
  <TooltipBase {...props} ref={ref} classMap={classes} />
));

Tooltip.displayName = "Tooltip";

export default Tooltip;
