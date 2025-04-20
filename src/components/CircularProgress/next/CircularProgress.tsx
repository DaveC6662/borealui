"use client";

import React from "react";
import CircularProgressBase from "../CircularProgressBase";
import styles from "./CircularProgress.module.scss";
import { CircularProgressProps } from "../CircularProgress.types";

const classMap = {
  circularProgress: styles.circularProgress,
  circleBorder: styles.circleBorder,
  innerCircle: styles.innerCircle,
  ratingText: styles.ratingText,
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
};

const CircularProgress: React.FC<CircularProgressProps> = (props) => (
  <CircularProgressBase {...props} classMap={classMap} />
);

export default CircularProgress;
