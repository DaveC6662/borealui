import React from "react";
import ChipBase from "../ChipBase";
import "./Chip.scss";
import IconButton from "../../Buttons/IconButton/core/IconButton";
import { FaTimes } from "react-icons/fa";
import { ChipProps } from "../Chip.types";

const classMap = {
  chip: "chip",
  chipIcon: "chipIcon",
  chipMessage: "chipMessage",
  chipClose: "chipClose",
  icon: "icon",
  primary: "primary",
  success: "success",
  error: "error",
  warning: "warning",
  info: "info",
  small: "small",
  medium: "medium",
  large: "large",
  topCenter: "topCenter",
  bottomCenter: "bottomCenter",
  fadeOut: "fadeOut",
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
