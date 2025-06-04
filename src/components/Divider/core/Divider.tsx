import React from "react";
import DividerBase from "../DividerBase";
import "./Divider.scss";
import { DividerProps } from "../Divider.types";

const classes = {
  divider: "divider",
  horizontal: "divider_horizontal",
  vertical: "divider_vertical",
  dashed: "divider_dashed",
  primary: "divider_primary",
  secondary: "divider_secondary",
  tertiary: "divider_tertiary",
  quaternary: "divider_quaternary",
  clear: "divider_clear",
  success: "divider_success",
  warning: "divider_warning",
  error: "divider_error",
};

const Divider: React.FC<DividerProps> = (props) => (
  <DividerBase {...props} classMap={classes} />
);

export default Divider;
