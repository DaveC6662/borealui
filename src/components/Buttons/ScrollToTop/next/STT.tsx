"use client";

import React from "react";
import ScrollToTopBase from "../ScrollToTopBase";
import { FaArrowCircleUp } from "react-icons/fa";
import styles from "./STT.module.scss";

const classMap = {
  container: styles.scrollToTop,
  button: styles.scrollButton,
  icon: styles.scrollIcon,
};

const ScrollToTopButton: React.FC = () => (
  <ScrollToTopBase classMap={classMap} IconComponent={FaArrowCircleUp} />
);

export default ScrollToTopButton;
