"use client";

import { forwardRef } from "react";
import styles from "./TextInput.module.scss";
import { TextInputProps } from "../TextInput.types";
import TextInputBase from "../TextInputBase";

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  return (
    <TextInputBase
      {...props}
      ref={ref}
      styles={{
        textBoxContainer: styles.textBoxContainer,
        textInput: styles.textInput,
        iconContainer: styles.iconContainer,
        togglePassword: styles.togglePassword,
        srOnly: styles.srOnly,
        primary: styles.primary,
        secondary: styles.secondary,
        disabled: styles.disabled,
      }}
    />
  );
});

TextInput.displayName = "TextInput";
export default TextInput;
