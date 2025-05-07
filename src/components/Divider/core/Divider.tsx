import React from "react";
import DividerBase from "../DividerBase";
import "./Divider.scss";
import { DividerProps } from "../Divider.types";

const styles = {
  divider: "divider",
  horizontal: "divider_horizontal",
  vertical: "divider_vertical",
  dashed: "divider_dashed",
  primary: "divider_primary",
  secondary: "divider_secondary",
  success: "divider_success",
  warning: "divider_warning",
  error: "divider_error",
};

const Divider: React.FC<DividerProps> = (props) => (
  <DividerBase {...props} styles={styles} />
);

export default Divider;
