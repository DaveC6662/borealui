"use client";

import React from "react";
import ScrollToTopBase from "../ScrollToTopBase";
import { ArrowUpIcon } from "@/Icons";
import styles from "./STT.module.scss";

const classMap = {
  container: styles.scrollToTop,
  button: styles.scrollButton,
  icon: styles.scrollIcon,
};

const ScrollToTopButton: React.FC = () => (
  <ScrollToTopBase classMap={classMap} IconComponent={ArrowUpIcon} />
);

export default ScrollToTopButton;
