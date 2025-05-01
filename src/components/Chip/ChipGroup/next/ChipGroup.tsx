"use client";

import React from "react";
import ChipGroupBase from "../ChipGroupBase";
import { Chip } from "../../../../index.next";
import styles from "./ChipGroup.module.scss";
import { ChipGroupProps, ChipGroupRef } from "../ChipGroup.types";

const classMap = {
  container: styles.chip_group,
  list: styles.chip_group_list,
};

const ChipGroup = React.forwardRef<ChipGroupRef, ChipGroupProps>(
  (props, ref) => (
    <ChipGroupBase
      {...props}
      ref={ref}
      ChipComponent={Chip}
      classMap={classMap}
      positionMap={styles}
    />
  )
);

export default ChipGroup;
