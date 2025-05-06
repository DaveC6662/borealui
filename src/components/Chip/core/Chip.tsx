import React from "react";
import ChipBase from "../ChipBase";
import { CloseIcon } from "@/Icons";
import "./Chip.scss";
import IconButton from "../../Buttons/IconButton/core/IconButton";
import { ChipProps } from "../Chip.types";

const classMap = {
  chip: "chip",
  chip_icon: "chip_icon",
  chip_message: "chip_message",
  chip_close: "chip_close",
  chip_relative: "chip_relative",
  chip_fixed: "chip_fixed",
  chip_fadeout: "chip_fadeout",
  chip_topCenter: "chip_top_center",
  chip_bottomCenter: "chip_bottom_center",
  chip_topLeft: "chip_top_left",
  chip_topRight: "chip_top_right",
  chip_bottomLeft: "chip_bottom_left",
  chip_bottomRight: "chip_bottom_right",
  chip_primary: "chip_primary",
  chip_secondary: "chip_secondary",
  chip_success: "chip_success",
  chip_error: "chip_error",
  chip_warning: "chip_warning",
  chip_clear: "chip_clear",
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
    closeIcon={CloseIcon}
  />
);

export default Chip;
