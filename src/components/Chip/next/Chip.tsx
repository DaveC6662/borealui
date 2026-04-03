"use client";

import React from "react";
import ChipBase from "../ChipBase";
import { CloseIcon } from "@/Icons";
import IconButton from "../../IconButton/next/IconButton";
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
Chip.displayName = "Chip";
export default Chip;
