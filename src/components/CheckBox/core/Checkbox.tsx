import React from "react";
import CheckboxBase from "../CheckboxBase";
import "./CheckBox.scss";
import { CheckBoxProps } from "../Checkbox.types";

const classes = {
  checkbox: "checkbox",
  primary: "checkbox_primary",
  secondary: "checkbox_secondary",
  success: "checkbox_success",
  error: "checkbox_error",
  warning: "checkbox_warning",
  clear: "checkbox_clear",
  disabled: "checkbox_disabled",
  indeterminate: "checkbox_indeterminate",
  left: "checkbox_left",
  right: "checkbox_right",
  label: "checkbox_label",
  input: "checkbox_input",
  box: "checkbox_box",
};

const Checkbox: React.FC<CheckBoxProps> = (props) => {
  return <CheckboxBase {...props} classMap={classes} />;
};

export default Checkbox;
