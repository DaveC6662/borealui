import React from "react";
import BaseRadioButton from "../RadioButtonBase";
import "./RadioButton.scss";
import { RadioButtonProps } from "../RadioButton.types";

const classes = {
  wrapper: "radio_wrapper",
  input: "radio_input",
  circle: "radio_circle",
  label: "radio_label",
  disabled: "radio_disabled",
  primary: "radio_primary",
  secondary: "radio_secondary",
  success: "radio_success",
  error: "radio_error",
  warning: "radio_warning",
  clear: "radio_clear",
};

const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  (props, ref) => <BaseRadioButton {...props} ref={ref} classMap={classes} />
);

RadioButton.displayName = "RadioButton";
export default RadioButton;
