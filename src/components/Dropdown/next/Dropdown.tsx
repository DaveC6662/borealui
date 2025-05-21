"use client";
import React from "react";
import BaseDropdown from "../DropdownBase";
import { DropdownProps } from "../Dropdown.types";
import { IconButton } from "@/index.next";
import styles from "./Dropdown.module.scss";

const Dropdown: React.FC<DropdownProps> = (props) => {
  return <BaseDropdown {...props} IconButton={IconButton} classMap={styles} />;
};

export default Dropdown;
