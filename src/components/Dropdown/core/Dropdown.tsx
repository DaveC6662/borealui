import React from "react";
import BaseDropdown from "../DropdownBase";
import { DropdownProps } from "../Dropdown.types";
import { IconButton } from "@/index.core";
import "./Dropdown.scss";

const styles = {
  wrapper: "dropdown",
  menu: "dropdown_menu",
  item: "dropdown_item",
  icon: "dropdown_icon",
  alignRight: "dropdown_menu_right",
  alignLeft: "dropdown_menu_left",
};

const Dropdown: React.FC<DropdownProps> = (props) => {
  return (
    <BaseDropdown {...props} IconButton={IconButton} classNames={styles} />
  );
};

export default Dropdown;
