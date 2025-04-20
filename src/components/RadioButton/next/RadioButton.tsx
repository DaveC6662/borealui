"use client";

import React from "react";
import BaseRadioButton from "../RadioButtonBase";
import styles from "./RadioButton.module.scss";
import { RadioButtonProps } from "../RadioButton.types";

const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  (props, ref) => (
    <BaseRadioButton
      {...props}
      ref={ref}
      classNames={{
        wrapper: styles.radioWrapper,
        input: styles.radioInput,
        circle: styles.radioCircle,
        label: styles.radioLabel,
        disabled: styles.disabled,
        themeMap: {
          primary: styles.primary,
          secondary: styles.secondary,
          success: styles.success,
          error: styles.error,
          warning: styles.warning,
        },
      }}
    />
  )
);

RadioButton.displayName = "RadioButton";
export default RadioButton;
