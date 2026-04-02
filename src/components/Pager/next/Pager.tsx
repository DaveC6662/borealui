"use client";

import React from "react";
import BasePager from "../PagerBase";
import { Button, IconButton } from "@/index.next";
import styles from "./Pager.module.scss";
import { PagerProps } from "../Pager.types";

const Pager: React.FC<PagerProps> = (props) => {
  return (
    <BasePager
      {...props}
      Button={Button}
      IconButton={IconButton}
      classMap={styles}
    />
  );
};
Pager.displayName = "Pager";
export default Pager;
