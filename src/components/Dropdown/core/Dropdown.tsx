import React from "react";
import BaseDropdown from "../DropdownBase";
import { DropdownProps } from "../Dropdown.types";
import IconButton from "../../Buttons/IconButton/core/IconButton";
import "./Dropdown.scss";

const Dropdown: React.FC<DropdownProps> = (props) => {
  return (
    <BaseDropdown
      {...props}
      IconButton={IconButton}
      classNames={{
        wrapper: "dropdownWrapper",
        menu: "dropdownMenu",
        item: "dropdownItem",
        icon: "icon",
        alignRight: "right",
        alignLeft: "left",
      }}
    />
  );
};

export default Dropdown;
