import React from "react";
import ChipBase from "../ChipBase";
import { CloseIcon } from "@/Icons";
import "./Chip.scss";
import IconButton from "../../IconButton/core/IconButton";
import { ChipProps } from "../Chip.types";

const classes = {
  chip: "chip",
  icon: "chip_icon",
  inner_icon: "chip_icon_inner",
  message: "chip_message",
  close: "chip_close",
  relative: "chip_relative",
  fixed: "chip_fixed",
  fadeout: "chip_fadeout",
  topCenter: "chip_top_center",
  bottomCenter: "chip_bottom_center",
  topLeft: "chip_top_left",
  topRight: "chip_top_right",
  bottomLeft: "chip_bottom_left",
  bottomRight: "chip_bottom_right",
  primary: "chip_primary",
  secondary: "chip_secondary",
  success: "chip_success",
  error: "chip_error",
  warning: "chip_warning",
  clear: "chip_clear",
  xs: "chip_xs",
  small: "chip_small",
  medium: "chip_medium",
  large: "chip_large",
  xl: "chip_xl",
};

const Chip: React.FC<ChipProps> = (props) => (
  <ChipBase
    {...props}
    classMap={classes}
    IconButtonComponent={IconButton}
    closeIcon={CloseIcon}
  />
);

export default Chip;
