"use client";

import React from "react";
import CheckboxBase from "../CheckboxBase";
import styles from "./CheckBox.module.scss";
import { CheckboxProps } from "../Checkbox.types";

const classMap = {
  checkboxWrapper: styles.checkboxWrapper,
  checkboxInput: styles.checkboxInput,
  checkboxBox: styles.checkboxBox,
  checkboxLabel: styles.checkboxLabel,
  primary: styles.primary,
  secondary: styles.secondary,
  disabled: styles.disabled,
  left: styles.left,
  right: styles.right,
};

const Checkbox: React.FC<CheckboxProps> = (props) => {
  return <CheckboxBase {...props} classMap={classMap} />;
};

export default Checkbox;
