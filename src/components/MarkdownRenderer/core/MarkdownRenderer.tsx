import React from "react";
import BaseMarkdownRenderer from "../MarkdownRendererBase";
import "./MarkdownRenderer.scss";
import { MarkdownRendererProps } from "../MarkdownRenderer.types";

const MarkdownRenderer: React.FC<MarkdownRendererProps> = (props) => {
  return (
    <BaseMarkdownRenderer
      {...props}
      classNames={{
        wrapper: "markdown",
        loading: "loading",
      }}
    />
  );
};

export default MarkdownRenderer;
