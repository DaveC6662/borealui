"use client";

import React from "react";
import styles from "./Timeline.module.scss";
import TimelineBase from "../TimelineBase";
import { TimelineProps } from "../Timeline.types";

const Timeline: React.FC<TimelineProps> = (props) => {
  return <TimelineBase {...props} styles={styles} />;
};

export default Timeline;
