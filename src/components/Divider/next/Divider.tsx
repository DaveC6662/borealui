"use client";

import React from "react";
import DividerBase from "../DividerBase";
import styles from "./Divider.module.scss";
import { DividerProps } from "../Divider.types";

const Divider: React.FC<DividerProps> = (props) => (
  <DividerBase {...props} styles={styles} />
);

export default Divider;
