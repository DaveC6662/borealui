"use client";

import React from "react";
import ChipGroupBase from "../ChipGroupBase";
import { Chip } from "@/index.next";
import styles from "./ChipGroup.module.scss";
import { ChipGroupProps, ChipGroupRef } from "../ChipGroup.types";

const classMap = {
  container: styles.chipGroupContainer,
  positionMap: {
    topCenter: styles.topCenter,
    topRight: styles.topRight,
    topLeft: styles.topLeft,
    bottomCenter: styles.bottomCenter,
    bottomRight: styles.bottomRight,
    bottomLeft: styles.bottomLeft,
  },
  stackClassPrefix: styles.chipStack, // SCSS should use .chipStack0, .chipStack1, etc.
};

const ChipGroup = React.forwardRef<ChipGroupRef, ChipGroupProps>(
  (props, ref) => (
    <ChipGroupBase
      {...props}
      ref={ref}
      ChipComponent={Chip}
      classMap={classMap}
    />
  )
);

export default ChipGroup;
