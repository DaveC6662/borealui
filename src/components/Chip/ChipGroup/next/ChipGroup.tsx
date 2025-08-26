"use client";

import { forwardRef } from "react";
import ChipGroupBase from "../ChipGroupBase";
import { Chip } from "../../../../index.next";
import styles from "./ChipGroup.module.scss";
import { ChipGroupProps, ChipGroupRef } from "../ChipGroup.types";

const ChipGroup = forwardRef<ChipGroupRef, ChipGroupProps>((props, ref) => (
  <ChipGroupBase {...props} ref={ref} ChipComponent={Chip} classMap={styles} />
));

export default ChipGroup;
