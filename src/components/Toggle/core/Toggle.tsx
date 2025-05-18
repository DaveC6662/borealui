import React from "react";
import "./Toggle.scss";
import ToggleBase from "../ToggleBase";
import { ToggleProps } from "../Toggle.types";

const classes = {
  container: "container",
  toggle: "toggle",
  active: "toggle_active",
  slider: "toggle_slider",
  label: "toggle_label",
  primary: "toggle_primary",
  secondary: "toggle_secondary",
  success: "toggle_success",
  warning: "toggle_warning",
  danger: "toggle_danger",
  clear: "toggle_clear",
  disabled: "toggle_disabled",
  xs: "toggle_xs",
  small: "toggle_small",
  medium: "toggle_medium",
  large: "toggle_large",
  xl: "toggle_xl",
};

const Toggle: React.FC<ToggleProps> = (props) => {
  return <ToggleBase {...props} classMap={classes} />;
};

export default Toggle;
