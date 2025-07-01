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
  tertiary: "toggle_tertiary",
  quaternary: "toggle_quaternary",

  success: "toggle_success",
  warning: "toggle_warning",
  error: "toggle_error",

  clear: "toggle_clear",

  disabled: "toggle_disabled",

  xs: "toggle_xs",
  small: "toggle_small",
  medium: "toggle_medium",
  large: "toggle_large",
  xl: "toggle_xl",

  shadowNone: "toggle_shadow-None",
  shadowLight: "toggle_shadow-Light",
  shadowMedium: "toggle_shadow-Medium",
  shadowStrong: "toggle_shadow-Strong",
  shadowIntense: "toggle_shadow-Intense",

  roundNone: "toggle_round-None",
  roundSmall: "toggle_round-Small",
  roundMedium: "toggle_round-Medium",
  roundLarge: "toggle_round-Large",
};

const Toggle: React.FC<ToggleProps> = (props) => {
  return <ToggleBase {...props} classMap={classes} />;
};

export default Toggle;
