import React from "react";
import ScrollToTopBase from "../ScrollToTopBase";
import "./STT.scss";
import { ArrowUpIcon } from "@/Icons";

const classes = {
  wrapper: "scrollToTop",
  button: "scrollToTop_button",
  icon: "scrollToTop_icon",
};

const ScrollToTopButton: React.FC = () => (
  <ScrollToTopBase classMap={classes} IconComponent={ArrowUpIcon} />
);

export default ScrollToTopButton;
