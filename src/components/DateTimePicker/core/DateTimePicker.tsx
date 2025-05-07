import React from "react";
import DateTimePickerBase from "../DateTimePickerBase";
import "./DateTimePicker.scss";
import type { DateTimePickerProps } from "../DateTimePicker.types";

const styles = {
  wrapper: "datetime_picker_wrapper",
  label: "datetime_picker_label",
  inputWrapper: "datetime_picker_inputWrapper",
  input: "datetime_picker_input",
  primary: "datetime_picker_primary",
  secondary: "datetime_picker_secondary",
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
};

const DateTimePicker: React.FC<DateTimePickerProps> = (props) => (
  <DateTimePickerBase {...props} styles={styles} />
);

export default DateTimePicker;
