import React from "react";
import BaseMarkdownRenderer from "../MarkdownRendererBase";
import "./MarkdownRenderer.scss";
import { MarkdownRendererProps } from "../MarkdownRenderer.types";

const classes = {
  wrapper: "markdown",
  loading: "markdown_loading",
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = (props) => {
  return <BaseMarkdownRenderer {...props} classMap={classes} />;
};

export default MarkdownRenderer;
