"use client";

import { forwardRef } from "react";
import DividerBase from "../DividerBase";
import styles from "./Divider.module.scss";
import { DividerProps } from "../Divider.types";

const Divider = forwardRef<HTMLDivElement, DividerProps>((props, ref) => (
  <DividerBase {...props} classMap={styles} ref={ref} />
));

export default Divider;
