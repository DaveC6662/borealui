import React from "react";
import BasePager from "../PagerBase";
import { Button, IconButton } from "@/index.core";
import "./Pager.scss";
import { PaginationProps } from "../Pager.types";

const Pager: React.FC<PaginationProps> = (props) => {
  return (
    <BasePager
      {...props}
      Button={Button}
      IconButton={IconButton}
      classNames={{
        wrapper: "pagination",
        controls: "paginationControls",
        controlButton: "paginationControlButton",
        buttonWrapper: "paginationButtonWrapper",
        button: "paginationButton",
        active: "active",
      }}
    />
  );
};

export default Pager;
