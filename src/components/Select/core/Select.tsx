import React from "react";
import BaseSelect from "../SelectBase";
import "./Select.scss";
import { SelectProps } from "../Select.types";

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    return (
      <BaseSelect
        {...props}
        ref={ref}
        classNames={{
          main: "selectMain",
          select: "select",
          icon: "selectIcon",
          disabled: "disabled",
          themeClass: (theme) => theme,
        }}
      />
    );
  }
);

Select.displayName = "Select";
export default Select;
