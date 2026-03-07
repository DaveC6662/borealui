"use client";

import React from "react";
import styles from "./Stepper.module.scss";
import StepperBase from "../StepperBase";
import { StepperProps } from "../Stepper.types";
import { IconButton } from "@/index.next";

const Stepper: React.FC<StepperProps> = (props) => (
  <StepperBase {...props} classMap={styles} IconButtonComponent={IconButton} />
);
Stepper.displayName = "Stepper";
export default Stepper;
