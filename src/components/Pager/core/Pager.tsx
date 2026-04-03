import React from "react";
import BasePager from "../PagerBase";
import Button from "../../Button/core/Button";
import IconButton from "../../IconButton/core/IconButton";
import "./Pager.scss";
import { PagerProps } from "../Pager.types";

const classes = {
  wrapper: "pagination",
  controls: "pagination_controls",
  controlButton: "pagination_control_button",
  buttonWrapper: "pagination_button_wrapper",
  button: "pagination_button",
  active: "pagination_active",
};

const Pager: React.FC<PagerProps> = (props) => {
  return (
    <BasePager
      {...props}
      Button={Button}
      IconButton={IconButton}
      classMap={classes}
    />
  );
};
Pager.displayName = "Pager";
export default Pager;
