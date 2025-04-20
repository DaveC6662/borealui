import React from "react";
import BasePopover from "../PopOverBase";
import "./Popover.scss";
import { PopoverProps } from "../PopOver.types";

const Popover: React.FC<PopoverProps> = (props) => {
  return (
    <BasePopover
      {...props}
      classNames={{
        container: "popoverContainer",
        trigger: "trigger",
        popover: "popover",
        placementMap: {
          top: "top",
          bottom: "bottom",
          left: "left",
          right: "right",
        },
        themeMap: {
          primary: "primary",
          secondary: "secondary",
          success: "success",
          error: "error",
          warning: "warning",
          info: "info",
        },
      }}
    />
  );
};

export default Popover;
