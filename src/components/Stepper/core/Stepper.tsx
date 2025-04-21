import React from "react";
import "./Stepper.scss";
import StepperBase from "../StepperBase";
import { StepperProps } from "../Stepper.types";
import { IconButton } from "@/index.core";

const classMap = {
  stepper: "stepper",
  horizontal: "horizontal",
  vertical: "vertical",
  primary: "primary",
  secondary: "secondary",
  medium: "medium",
  small: "small",
  large: "large",
  step: "step",
  active: "active",
  clickable: "clickable",
  stepLabel: "stepLabel",
  connector: "connector",
};

const Stepper: React.FC<StepperProps> = (props) => (
  <StepperBase {...props} styles={classMap} IconButtonComponent={IconButton} />
);

export default Stepper;
