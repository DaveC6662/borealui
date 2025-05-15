import React from "react";
import BasePager from "../PagerBase";
import { Button, IconButton } from "@/index.core";
import "./Pager.scss";
import { PaginationProps } from "../Pager.types";

const classes = {
  wrapper: "pagination",
  controls: "pagination_controls",
  controlButton: "pagination_control_button",
  buttonWrapper: "pagination_button_wrapper",
  button: "pagination_button",
  active: "pagination_active",
};

const Pager: React.FC<PaginationProps> = (props) => {
  return (
    <BasePager
      {...props}
      Button={Button}
      IconButton={IconButton}
      classMap={classes}
    />
  );
};

export default Pager;
