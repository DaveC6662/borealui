import { forwardRef } from "react";
import TextAreaBase from "../TextAreaBase";
import type { TextAreaProps } from "../TextArea.types";
import "./TextArea.scss";

const classes = {
  textArea: "textArea",
  textInput: "textArea_textInput",
  icon: "textArea_icon",
  primary: "textArea_primary",
  secondary: "textArea_secondary",
  tertiary: "textArea_tertiary",
  quaternary: "textArea_quaternary",
  success: "textArea_success",
  error: "textArea_error",
  warning: "textArea_warning",
  clear: "textArea_clear",
  outline: "textArea_outline",
  disabled: "textArea_disabled",
  errorMessage: "textArea_errorMessage",
  iconContainer: "textArea_iconContainer",
  errorMessageContainer: "textArea_errorMessageContainer",
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    return <TextAreaBase {...props} ref={ref} classMap={classes} />;
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
