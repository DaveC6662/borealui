import React from "react";
import DividerBase from "../DividerBase";
import "./Divider.scss";
import { DividerProps } from "../Divider.types";

const styles = {
  divider: "divider",
  horizontal: "horizontal",
  vertical: "vertical",
  dashed: "dashed",
  primary: "primary",
  secondary: "secondary",
  success: "success",
  warning: "warning",
  error: "error",
};

const Divider: React.FC<DividerProps> = (props) => (
  <DividerBase {...props} styles={styles} />
);

export default Divider;
