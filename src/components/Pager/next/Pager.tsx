"use client";

import React from "react";
import BasePager from "../PagerBase";
import { Button, IconButton } from "@/index.next";
import styles from "./Pager.module.scss";
import { PaginationProps } from "../Pager.types";

const Pager: React.FC<PaginationProps> = (props) => {
  return (
    <BasePager
      {...props}
      Button={Button}
      IconButton={IconButton}
      classMap={styles}
    />
  );
};

export default Pager;
