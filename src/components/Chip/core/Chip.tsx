import React from "react";
import ChipBase from "../ChipBase";
import "./Chip.scss";
import IconButton from "../../Buttons/IconButton/core/IconButton";
import { FaTimes } from "react-icons/fa";
import { ChipProps } from "../Chip.types";

const classMap = {
  chip: "chip",
  chip_icon: "chip_icon",
  chip_message: "chip_message",
  chip_close: "chip_close",
  chip_fadeout: "chip_fadeout",
  chip_topCenter: "chip_topCenter",
  chip_bottomCenter: "chip_bottomCenter",
  chip_topLeft: "chip_topLeft",
  chip_topRight: "chip_topRight",
  chip_bottomLeft: "chip_bottomLeft",
  chip_bottomRight: "chip_bottomRight",
  chip_primary: "chip_primary",
  chip_success: "chip_success",
  chip_error: "chip_error",
  chip_warning: "chip_warning",
  chip_info: "chip_info",
  chip_xs: "chip_xs",
  chip_small: "chip_small",
  chip_medium: "chip_medium",
  chip_large: "chip_large",
  chip_xl: "chip_xl",
  icon: "chip_icon_inner",
};

const Chip: React.FC<ChipProps> = (props) => (
  <ChipBase
    {...props}
    classMap={classMap}
    IconButtonComponent={IconButton}
    closeIcon={FaTimes}
  />
);

export default Chip;
