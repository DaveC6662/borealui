"use client";

import { forwardRef } from "react";
import BaseSelect from "../SelectBase";
import styles from "./Select.module.scss";
import { SelectProps } from "../Select.types";

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  return <BaseSelect {...props} ref={ref} classMap={styles} />;
});

Select.displayName = "Select";
export default Select;
