"use client";

import React from "react";
import ChipGroupBase from "../ChipGroupBase";
import { Chip } from "../../../../index.next";
import styles from "./ChipGroup.module.scss";
import { ChipGroupProps, ChipGroupRef } from "../ChipGroup.types";

const classMap = {
  container: styles.chip_group,
  chip: styles.group_chip,
  list: styles.chip_group_list,
};

const positionMap = {
  topCenter: styles.chip_group_topCenter,
  topLeft: styles.chip_group_topLeft,
  topRight: styles.chip_group_topRight,
  bottomCenter: styles.chip_group_bottomCenter,
  bottomLeft: styles.chip_group_bottomLeft,
  bottomRight: styles.chip_group_bottomRight,
};

const ChipGroup = React.forwardRef<ChipGroupRef, ChipGroupProps>(
  (props, ref) => (
    <ChipGroupBase
      {...props}
      ref={ref}
      ChipComponent={Chip}
      classMap={classMap}
      positionMap={positionMap}
    />
  )
);

export default ChipGroup;
