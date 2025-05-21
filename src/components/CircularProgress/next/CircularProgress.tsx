"use client";

import React from "react";
import CircularProgressBase from "../CircularProgressBase";
import styles from "./CircularProgress.module.scss";
import { CircularProgressProps } from "../CircularProgress.types";

const CircularProgress: React.FC<CircularProgressProps> = (props) => (
  <CircularProgressBase {...props} classMap={styles} />
);

export default CircularProgress;
