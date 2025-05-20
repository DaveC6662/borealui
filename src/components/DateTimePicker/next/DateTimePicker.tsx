"use client";

import React from "react";
import DateTimePickerBase from "../DateTimePickerBase";
import styles from "./DateTimePicker.module.scss";
import type { DateTimePickerProps } from "../DateTimePicker.types";

const DateTimePicker: React.FC<DateTimePickerProps> = (props) => (
  <DateTimePickerBase {...props} classMap={styles} />
);

export default DateTimePicker;
