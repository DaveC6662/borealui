"use client";

import React from "react";
import BaseSelect from "../SelectBase";
import styles from "./Select.module.scss";
import { SelectProps } from "../Select.types";

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    return (
      <BaseSelect
        {...props}
        ref={ref}
        classNames={{
          main: styles.selectMain,
          select: styles.select,
          icon: styles.selectIcon,
          disabled: styles.disabled,
          themeClass: (theme) => styles[theme] || "",
        }}
      />
    );
  }
);

Select.displayName = "Select";
export default Select;
