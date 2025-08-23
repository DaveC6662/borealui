import React from "react";
import DateTimePickerBase from "../DateTimePickerBase";
import "./DateTimePicker.scss";
import type { DateTimePickerProps } from "../DateTimePicker.types";

const classes = {
  wrapper: "datetime_picker_wrapper",
  label: "datetime_picker_label",
  inputWrapper: "datetime_picker_input_wrapper",
  input: "datetime_picker_input",

  primary: "datetime_picker_primary",
  secondary: "datetime_picker_secondary",
  tertiary: "datetime_picker_tertiary",
  quaternary: "datetime_picker_quaternary",

  success: "datetime_picker_success",
  error: "datetime_picker_error",
  warning: "datetime_picker_warning",

  clear: "datetime_picker_clear",

  xs: "datetime_picker_xs",
  small: "datetime_picker_small",
  medium: "datetime_picker_medium",
  large: "datetime_picker_large",
  xl: "datetime_picker_xl",

  outline: "datetime_picker_outline",
  disabled: "datetime_picker_disabled",
  icon: "datetime_picker_icon",

  shadowNone: "datetime_picker_shadow-None",
  shadowLight: "datetime_picker_shadow-Light",
  shadowMedium: "datetime_picker_shadow-Medium",
  shadowStrong: "datetime_picker_shadow-Strong",
  shadowIntense: "datetime_picker_shadow-Intense",

  roundNone: "datetime_picker_round-None",
  roundSmall: "datetime_picker_round-Small",
  roundMedium: "datetime_picker_round-Medium",
  roundLarge: "datetime_picker_round-Large",
};

const DateTimePicker: React.FC<DateTimePickerProps> = (props) => (
  <DateTimePickerBase {...props} classMap={classes} />
);

export default DateTimePicker;
