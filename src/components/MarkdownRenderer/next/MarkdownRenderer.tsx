"use client";

import React from "react";
import BaseMarkdownRenderer from "../MarkdownRendererBase";
import styles from "./MarkdownRenderer.module.scss";
import { MarkdownRendererProps } from "../MarkdownRenderer.types";

const MarkdownRenderer: React.FC<MarkdownRendererProps> = (props) => {
  return (
    <BaseMarkdownRenderer
      {...props}
      classNames={{
        wrapper: styles.markdown,
        loading: styles.loading,
      }}
    />
  );
};

export default MarkdownRenderer;
