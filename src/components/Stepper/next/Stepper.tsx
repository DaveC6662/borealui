"use client";

import React from "react";
import styles from "./Stepper.module.scss";
import StepperBase from "../StepperBase";
import { StepperProps } from "../Stepper.types";
import { IconButton } from "@/index.next";

const Stepper: React.FC<StepperProps> = (props) => (
  <StepperBase {...props} styles={styles} IconButtonComponent={IconButton} />
);

export default Stepper;
