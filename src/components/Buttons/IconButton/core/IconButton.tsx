import React from "react";
import IconButtonBase from "../IconButtonBase";
import "./IconButton.scss";
import { IconButtonProps } from "../IconButton.types";

const classes = {
  iconButton: "icon_button",
  buttonLabel: "icon_button_button_label",
  loader: "icon_button_loader",
  disabled: "icon_button_disabled",
  outline: "icon_button_outline",
  primary: "icon_button_primary",
  secondary: "icon_button_secondary",
  success: "icon_button_success",
  warning: "icon_button_warning",
  error: "icon_button_error",
  clear: "icon_button_clear",
  xs: "icon_button_xs",
  small: "icon_button_small",
  medium: "icon_button_medium",
  large: "icon_button_large",
  xl: "icon_button_xl",
};

const IconButton: React.FC<IconButtonProps> = (props) => (
  <IconButtonBase {...props} classMap={classes} />
);

export default IconButton;
