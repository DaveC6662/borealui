"use client";

import { forwardRef } from "react";
import styles from "./TextInput.module.scss";
import { TextInputProps } from "../TextInput.types";
import TextInputBase from "../TextInputBase";
import { IconButton } from "@/index.next";

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  return (
    <TextInputBase
      {...props}
      IconButton={IconButton}
      ref={ref}
      classMap={styles}
    />
  );
});

TextInput.displayName = "TextInput";
export default TextInput;
