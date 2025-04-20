import React from "react";
import ScrollToTopBase from "../ScrollToTopBase";
import { FaArrowCircleUp } from "react-icons/fa";
import "./STT.scss";

const classMap = {
  container: "scrollToTop",
  button: "scrollButton",
  icon: "scrollIcon",
};

const ScrollToTopButton: React.FC = () => (
  <ScrollToTopBase classMap={classMap} IconComponent={FaArrowCircleUp} />
);

export default ScrollToTopButton;
