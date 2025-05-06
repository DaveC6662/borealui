import React from "react";
import ScrollToTopBase from "../ScrollToTopBase";
import "./STT.scss";
import { ArrowUpIcon } from "@/Icons";

const classMap = {
  container: "scrollToTop",
  button: "scrollButton",
  icon: "scrollIcon",
};

const ScrollToTopButton: React.FC = () => (
  <ScrollToTopBase classMap={classMap} IconComponent={ArrowUpIcon} />
);

export default ScrollToTopButton;
