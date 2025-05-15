"use client";

import React from "react";
import BaseMetricBox from "../MetricBoxBase";
import styles from "./MetricBox.module.scss";
import { MetricBoxProps } from "../MetricBox.types";

const MetricBox: React.FC<MetricBoxProps> = (props) => {
  return <BaseMetricBox {...props} classMap={styles} />;
};

export default MetricBox;
