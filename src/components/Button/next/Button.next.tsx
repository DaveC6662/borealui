"use client";
import React from "react";
import { ButtonBase } from "../shared/ButtonBase";
import styles from "./Button.module.scss";

const ButtonNext: React.FC<any> = (props) => {
  return <ButtonBase {...props} className={styles.component} />;
};

export default ButtonNext;
