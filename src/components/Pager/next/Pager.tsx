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
      classNames={{
        wrapper: styles.pagination,
        controls: styles.paginationControls,
        controlButton: styles.paginationControlButton,
        buttonWrapper: styles.paginationButtonWrapper,
        button: styles.paginationButton,
        active: styles.active,
      }}
    />
  );
};

export default Pager;
