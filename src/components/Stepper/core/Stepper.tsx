import React from "react";
import "./Stepper.scss";
import StepperBase from "../StepperBase";
import { StepperProps } from "../Stepper.types";

const Stepper: React.FC<StepperProps> = (props) => {
  const styles = {
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

  return <StepperBase {...props} styles={styles} />;
};

export default Stepper;
