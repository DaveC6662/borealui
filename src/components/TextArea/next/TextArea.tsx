"use client";

import { forwardRef } from "react";
import TextAreaBase from "../TextAreaBase";
import type { TextAreaProps } from "../TextArea.types";
import styles from "./TextArea.module.scss";

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    return <TextAreaBase {...props} ref={ref} classMap={styles} />;
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
