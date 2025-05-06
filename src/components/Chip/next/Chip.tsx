"use client";

import React from "react";
import ChipBase from "../ChipBase";
import { CloseIcon } from "@/Icons";
import { IconButton } from "@/index.next";
import styles from "./Chip.module.scss";
import { ChipProps } from "../Chip.types";

const positionMap = {
  topCenter: styles.chip_top_center,
  topLeft: styles.chip_top_left,
  topRight: styles.chip_top_right,
  bottomCenter: styles.chip_bottom_center,
  bottomLeft: styles.chip_bottom_left,
  bottomRight: styles.chip_bottom_right,
};

const Chip: React.FC<ChipProps> = (props) => (
  <ChipBase
    {...props}
    classMap={styles}
    positionMap={positionMap}
    IconButtonComponent={IconButton}
    closeIcon={CloseIcon}
  />
);

export default Chip;
