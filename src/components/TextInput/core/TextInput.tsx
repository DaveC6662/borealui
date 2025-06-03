import { forwardRef } from "react";
import "./TextInput.scss";
import { TextInputProps } from "../TextInput.types";
import TextInputBase from "../TextInputBase";
import { IconButton } from "@/index.core";

const classes = {
  container: "textInput_container",
  textInput: "textInput",
  iconContainer: "textInput_icon_container",
  togglePassword: "textInput_togglePassword",
  primary: "textInput_primary",
  secondary: "textInput_secondary",
  tertiary: "textInput_tertiary",
  quaternary: "textInput_quaternary",
  success: "textInput_success",
  warning: "textInput_warning",
  error: "textInput_error",
  clear: "textInput_clear",
  xs: "textInput_xs",
  xl: "textInput_xl",
  small: "textInput_small",
  medium: "textInput_medium",
  large: "textInput_large",
  outline: "textInput_outline",
  disabled: "textInput_disabled",
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  return (
    <TextInputBase
      {...props}
      IconButton={IconButton}
      ref={ref}
      classMap={classes}
    />
  );
});

TextInput.displayName = "TextInput";
export default TextInput;
