import React from "react";
import CheckboxBase from "../CheckboxBase";
import "./Checkbox.scss";
import { CheckboxProps } from "../Checkbox.types";

const classMap = {
  checkboxWrapper: "checkboxWrapper",
  checkboxInput: "checkboxInput",
  checkboxBox: "checkboxBox",
  checkboxLabel: "checkboxLabel",
  primary: "primary",
  secondary: "secondary",
  disabled: "disabled",
  left: "left",
  right: "right",
};

const Checkbox: React.FC<CheckboxProps> = (props) => {
  return <CheckboxBase {...props} classMap={classMap} />;
};

export default Checkbox;
