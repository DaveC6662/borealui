"use client";

import React from "react";
import ChipBase from "../ChipBase";
import { CloseIcon } from "../ChipBase";
import { IconButton } from "@/index.next";
import styles from "./Chip.module.scss";
import { ChipProps } from "../Chip.types";

const Chip: React.FC<ChipProps> = (props) => (
  <ChipBase
    {...props}
    classMap={styles}
    IconButtonComponent={IconButton}
    closeIcon={CloseIcon}
  />
);

export default Chip;
