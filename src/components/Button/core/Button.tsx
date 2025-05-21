import React from "react";
import ButtonBase from "../ButtonBase";
import "./Button.scss";
import { ButtonProps } from "../Button.types";

const classes = {
  button: "button",
  icon: "button_icon",
  buttonIcon: "button_button-icon",
  buttonLabel: "button_label",
  loader: "button_loader",
  link: "button_link",
  fullWidth: "button_full-width",
  disabled: "button_disabled",
  outline: "button_outline",
  primary: "button_primary",
  secondary: "button_secondary",
  success: "button_success",
  warning: "button_warning",
  error: "button_error",
  clear: "button_clear",
  xs: "button_xs",
  xl: "button_xl",
  small: "button_small",
  medium: "button_medium",
  large: "button_large",
};

const Button: React.FC<ButtonProps> = (props) => (
  <ButtonBase {...props} classMap={classes} />
);

export default Button;
