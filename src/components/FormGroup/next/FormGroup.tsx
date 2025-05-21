"use client";

import React from "react";
import BaseFormGroup from "../FormGroupBase";
import styles from "./FormGroup.module.scss";
import { FormGroupProps } from "../FormGroup.types";

const FormGroup: React.FC<FormGroupProps> = (props) => {
  return <BaseFormGroup {...props} classMap={styles} />;
};

export default FormGroup;
