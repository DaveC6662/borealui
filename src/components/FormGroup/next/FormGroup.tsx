"use client";

import React from "react";
import BaseFormGroup from "../FormGroupBase";
import styles from "./FormGroup.module.scss";
import { FormGroupProps } from "../FormGroup.types";

const FormGroup: React.FC<FormGroupProps> = (props) => {
  return (
    <BaseFormGroup
      {...props}
      classNames={{
        wrapper: styles.formGroup,
        label: styles.label,
        srOnly: styles.srOnly,
        required: styles.required,
        inputWrapper: styles.inputWrapper,
        inputField: styles.inputField,
        controller: styles.controller,
        description: styles.description,
        errorMessage: styles.errorMessage,
        error: styles.error,
        layoutMap: {
          vertical: styles.vertical,
          horizontal: styles.horizontal,
        },
        spacingMap: {
          sm: styles.sm,
          medium: styles.medium,
          lg: styles.lg,
        },
      }}
    />
  );
};

export default FormGroup;
