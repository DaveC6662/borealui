"use client";

import React from "react";
import ScrollToTopBase from "../ScrollToTopBase";
import { ArrowUpIcon } from "@/Icons";
import styles from "./STT.module.scss";

const ScrollToTopButton: React.FC = () => (
  <ScrollToTopBase classMap={styles} IconComponent={ArrowUpIcon} />
);

export default ScrollToTopButton;
