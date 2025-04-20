import React from "react";
import BasePager from "../PagerBase";
import Button from "../../Buttons/Button/core/Button";
import IconButton from "../../Buttons/IconButton/core/IconButton";
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
