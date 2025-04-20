import React from "react";
import IconButtonBase from "../IconButtonBase";
import "./IconButton.scss";
import { IconButtonProps } from "../IconButton.types";

const classMap = {
  iconButton: "iconButton",
  buttonLabel: "buttonLabel",
  loader: "loader",
  disabled: "disabled",
  outline: "outline",
  primary: "primary",
  secondary: "secondary",
  success: "success",
  warning: "warning",
  error: "error",
  small: "small",
  medium: "medium",
  large: "large",
};

const IconButton: React.FC<IconButtonProps> = (props) => (
  <IconButtonBase {...props} classMap={classMap} />
);

export default IconButton;
