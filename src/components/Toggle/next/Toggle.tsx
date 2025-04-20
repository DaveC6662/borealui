"use client";

import React from "react";
import styles from "./Toggle.module.scss";
import ToggleBase from "../ToggleBase";
import { ToggleProps } from "../Toggle.types";

const Toggle: React.FC<ToggleProps> = (props) => {
  return <ToggleBase {...props} styles={styles} />;
};

export default Toggle;
