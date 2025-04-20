"use client";

import React from "react";
import ChipBase from "../ChipBase";
import { IconButton } from "@/index.next";
import { FaTimes } from "react-icons/fa";
import styles from "./Chip.module.scss";
import { ChipProps } from "../Chip.types";

const Chip: React.FC<ChipProps> = (props) => (
  <ChipBase
    {...props}
    classMap={styles}
    IconButtonComponent={IconButton}
    closeIcon={FaTimes}
  />
);

export default Chip;
