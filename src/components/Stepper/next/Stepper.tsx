"use client";

import React from "react";
import styles from "./Stepper.module.scss";
import StepperBase from "../StepperBase";
import { StepperProps } from "../Stepper.types";

const Stepper: React.FC<StepperProps> = (props) => {
  return <StepperBase {...props} styles={styles} />;
};

export default Stepper;
