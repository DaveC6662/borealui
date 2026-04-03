"use client";

///TODO: Fix: Popover has button descendant of button error when using trigger prop with button element. This is a known issue with popover implementations and may require restructuring the component to avoid nesting interactive elements.

import React from "react";
import BasePopover from "../PopOverBase";
import styles from "./PopOver.module.scss";
import { PopoverProps } from "../PopOver.types";

const Popover: React.FC<PopoverProps> = (props) => {
  return <BasePopover {...props} classMap={styles} />;
};
Popover.displayName = "Popover";
export default Popover;
