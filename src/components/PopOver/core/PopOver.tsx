import React from "react";
import BasePopover from "../PopOverBase";
import "./Popover.scss";
import { PopoverProps } from "../PopOver.types";

const classes = {
  container: "popover_container",
  trigger: "popover_trigger",
  popover: "popover_popover",
  top: "popover_top",
  bottom: "popover_bottom",
  left: "popover_left",
  right: "popover_right",
  primary: "popover_primary",
  secondary: "popover_secondary",
  success: "popover_success",
  error: "popover_error",
  warning: "popover_warning",
  clear: "popover_clear",
};

const Popover: React.FC<PopoverProps> = (props) => {
  return <BasePopover {...props} classMap={classes} />;
};

export default Popover;
