import React from "react";
import BaseRadioButton from "../RadioButtonBase";
import "./RadioButton.scss";
import { RadioButtonProps } from "../RadioButton.types";

const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  (props, ref) => (
    <BaseRadioButton
      {...props}
      ref={ref}
      classNames={{
        wrapper: "radioWrapper",
        input: "radioInput",
        circle: "radioCircle",
        label: "radioLabel",
        disabled: "disabled",
        themeMap: {
          primary: "primary",
          secondary: "secondary",
          success: "success",
          error: "error",
          warning: "warning",
        },
      }}
    />
  )
);

RadioButton.displayName = "RadioButton";
export default RadioButton;
