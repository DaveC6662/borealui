"use client";

import React from "react";
import styles from "./Spinner.module.scss";
import SpinnerBase from "../SpinnerBase";
import { SpinnerProps } from "../Spinner.types";

const Spinner: React.FC<SpinnerProps> = (props) => {
  return <SpinnerBase {...props} styles={styles} />;
};

export default Spinner;
