import React from "react";
import ButtonBase from "../ButtonBase";
import "./Button.scss";
import { ButtonProps } from "../Button.types";

const classMap = {
  button: "button",
  icon: "icon",
  buttonIcon: "buttonIcon",
  buttonLabel: "buttonLabel",
  loader: "loader",
  link: "link",
  fullWidth: "fullWidth",
  disabled: "disabled",
  outline: "outline",
  primary: "primary",
  secondary: "secondary",
  success: "success",
  warning: "warning",
  error: "error",
  clear: "clear",
  xs: "xs",
  xl: "xl",
  small: "small",
  medium: "medium",
  large: "large",
};

const Button: React.FC<ButtonProps> = (props) => (
  <ButtonBase {...props} classMap={classMap} />
);

export default Button;
