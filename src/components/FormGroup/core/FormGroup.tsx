import React from "react";
import BaseFormGroup from "../FormGroupBase";
import "./FormGroup.scss";
import { FormGroupProps } from "../FormGroup.types";

const FormGroup: React.FC<FormGroupProps> = (props) => {
  return (
    <BaseFormGroup
      {...props}
      classNames={{
        wrapper: "formGroup",
        label: "label",
        srOnly: "srOnly",
        required: "required",
        inputWrapper: "inputWrapper",
        inputField: "inputField",
        controller: "controller",
        description: "description",
        errorMessage: "errorMessage",
        error: "error",
        layoutMap: {
          vertical: "vertical",
          horizontal: "horizontal",
        },
        spacingMap: {
          sm: "sm",
          medium: "medium",
          lg: "lg",
        },
      }}
    />
  );
};

export default FormGroup;
