import React from "react";
import CheckboxBase from "../CheckboxBase";
import "./Checkbox.scss";
import { CheckboxProps } from "../Checkbox.types";

const classMap = {
  checkbox: "checkbox",
  checkbox_primary: "checkbox_primary",
  checkbox_secondary: "checkbox_secondary",
  checkbox_success: "checkbox_success",
  checkbox_error: "checkbox_error",
  checkbox_warning: "checkbox_warning",
  checkbox_disabled: "checkbox_disabled",
  checkbox_indeterminate: "checkbox_indeterminate",
  checkbox_left: "checkbox_left",
  checkbox_right: "checkbox_right",
  checkbox_label: "checkbox_label",
  checkbox_input: "checkbox_input",
  checkbox_box: "checkbox_box",
};

const Checkbox: React.FC<CheckboxProps> = (props) => {
  return <CheckboxBase {...props} classMap={classMap} />;
};

export default Checkbox;
