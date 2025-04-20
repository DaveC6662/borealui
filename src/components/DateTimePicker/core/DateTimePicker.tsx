import React from "react";
import DateTimePickerBase from "../DateTimePickerBase";
import "./DateTimePicker.scss";
import type { DateTimePickerProps } from "../DateTimePicker.types";

const styles = {
  wrapper: "wrapper",
  label: "label",
  inputWrapper: "inputWrapper",
  input: "input",
  primary: "primary",
  secondary: "secondary",
  small: "small",
  medium: "medium",
  large: "large",
  outline: "outline",
  disabled: "disabled",
};

const DateTimePicker: React.FC<DateTimePickerProps> = (props) => (
  <DateTimePickerBase {...props} styles={styles} />
);

export default DateTimePicker;
