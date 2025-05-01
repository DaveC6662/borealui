import React from "react";
import ChipGroupBase from "../ChipGroupBase";
import Chip from "../../core/Chip";
import "./ChipGroup.scss";
import { ChipGroupProps, ChipGroupRef } from "../ChipGroup.types";

const classMap = {
  container: "chip_group",
};

const positionMap = {
  topCenter: "chip_group_top_center",
  bottomCenter: "chip_group_bottom_center",
  topLeft: "chip_group_top_left",
  topRight: "chip_group_top_right",
  bottomLeft: "chip_group_bottom_left",
  bottomRight: "chip_group_bottom_right",
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
