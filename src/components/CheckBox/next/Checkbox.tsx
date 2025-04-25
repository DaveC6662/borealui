"use client";

import React from "react";
import CheckboxBase from "../CheckboxBase";
import styles from "./CheckBox.module.scss";
import { CheckboxProps } from "../Checkbox.types";

const Checkbox: React.FC<CheckboxProps> = (props) => {
  return <CheckboxBase {...props} classMap={styles} />;
};

export default Checkbox;
