"use client";
import React from "react";
import BaseDropdown from "../DropdownBase";
import { DropdownProps } from "../Dropdown.types";
import { IconButton } from "@/index.next"; // Next version
import styles from "./Dropdown.module.scss";

const Dropdown: React.FC<DropdownProps> = (props) => {
  return (
    <BaseDropdown
      {...props}
      IconButton={IconButton}
      classNames={{
        wrapper: styles.dropdownWrapper,
        menu: styles.dropdownMenu,
        item: styles.dropdownItem,
        icon: styles.icon,
        alignRight: styles.right,
        alignLeft: styles.left,
      }}
    />
  );
};

export default Dropdown;
