import React from "react";
import ChipGroupBase from "../ChipGroupBase";
import Chip from "../../core/Chip";
import "./ChipGroup.scss";
import { ChipGroupProps, ChipGroupRef } from "../ChipGroup.types";

const classMap = {
  container: "chipGroupContainer",
  positionMap: {
    topCenter: "topCenter",
    topRight: "topRight",
    topLeft: "topLeft",
    bottomCenter: "bottomCenter",
    bottomRight: "bottomRight",
    bottomLeft: "bottomLeft",
  },
  stackClassPrefix: "chipStack",
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
