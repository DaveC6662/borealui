"use client";

import React from "react";
import BaseRadioButton from "../RadioButtonBase";
import styles from "./RadioButton.module.scss";
import { RadioButtonProps } from "../RadioButton.types";

const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  (props, ref) => <BaseRadioButton {...props} ref={ref} classMap={styles} />
);

RadioButton.displayName = "RadioButton";
export default RadioButton;
