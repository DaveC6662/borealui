import React from "react";
import CheckboxBase from "../CheckboxBase";
import "./CheckBox.scss";
import { CheckBoxProps } from "../Checkbox.types";

const classes = {
  checkbox: "checkbox",

  primary: "checkbox_primary",
  secondary: "checkbox_secondary",
  tertiary: "checkbox_tertiary",
  quaternary: "checkbox_quaternary",

  success: "checkbox_success",
  error: "checkbox_error",
  warning: "checkbox_warning",

  clear: "checkbox_clear",

  disabled: "checkbox_disabled",
  indeterminate: "checkbox_indeterminate",

  left: "checkbox_left",
  right: "checkbox_right",

  xs: "checkbox_xs",
  small: "checkbox_small",
  medium: "checkbox_medium",
  large: "checkbox_large",
  xl: "checkbox_xl",

  shadowNone: "checkbox_shadow-None",
  shadowLight: "checkbox_shadow-Light",
  shadowMedium: "checkbox_shadow-Medium",
  shadowStrong: "checkbox_shadow-Strong",
  shadowIntense: "checkbox_shadow-Intense",

  roundNone: "checkbox_round-None",
  roundSmall: "checkbox_round-Small",
  roundMedium: "checkbox_round-Medium",
  roundLarge: "checkbox_round-Large",

  label: "checkbox_label",
  input: "checkbox_input",
  box: "checkbox_box",
};

const Checkbox: React.FC<CheckBoxProps> = (props) => {
  return <CheckboxBase {...props} classMap={classes} />;
};

export default Checkbox;
