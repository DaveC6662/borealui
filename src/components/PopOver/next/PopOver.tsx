"use client";

import React from "react";
import BasePopover from "../PopOverBase";
import styles from "./PopOver.module.scss";
import { PopoverProps } from "../PopOver.types";

const Popover: React.FC<PopoverProps> = (props) => {
  return (
    <BasePopover
      {...props}
      classNames={{
        container: styles.popoverContainer,
        trigger: styles.trigger,
        popover: styles.popover,
        placementMap: {
          top: styles.top,
          bottom: styles.bottom,
          left: styles.left,
          right: styles.right,
        },
        themeMap: {
          primary: styles.primary,
          secondary: styles.secondary,
          success: styles.success,
          error: styles.error,
          warning: styles.warning,
          info: styles.info,
        },
      }}
    />
  );
};

export default Popover;
