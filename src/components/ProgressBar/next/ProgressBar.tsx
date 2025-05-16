"use client";

import React from "react";
import BaseProgressBar from "../ProgressBarBase";
import styles from "./ProgressBar.module.scss";
import { ProgressBarProps } from "../ProgressBar.types";

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  return <BaseProgressBar {...props} classMap={styles} />;
};

export default ProgressBar;
