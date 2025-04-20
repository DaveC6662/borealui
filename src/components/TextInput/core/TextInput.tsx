import React, { forwardRef } from "react";
import "./TextInput.scss";
import { TextInputProps } from "../TextInput.types";
import TextInputBase from "../TextInputBase";

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  return (
    <TextInputBase
      {...props}
      ref={ref}
      styles={{
        textBoxContainer: "textBoxContainer",
        textInput: "textInput",
        iconContainer: "iconContainer",
        togglePassword: "togglePassword",
        srOnly: "srOnly",
        primary: "primary",
        secondary: "secondary",
        disabled: "disabled",
      }}
    />
  );
});

TextInput.displayName = "TextInput";
export default TextInput;
