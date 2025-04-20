"use client";

import React from "react";
import BaseMetricBox from "../MetricBoxBase";
import styles from "./MetricBox.module.scss";
import { MetricBoxProps } from "../MetricBox.types";

const MetricBox: React.FC<MetricBoxProps> = (props) => {
  return (
    <BaseMetricBox
      {...props}
      classNames={{
        wrapper: styles.metricBox,
        themeMap: {
          primary: styles.primary,
          secondary: styles.secondary,
          success: styles.success,
          error: styles.error,
          warning: styles.warning,
        },
        sizeMap: {
          small: styles.small,
          medium: styles.medium,
          large: styles.large,
        },
        alignMap: {
          left: styles.left,
          center: styles.center,
          right: styles.right,
        },
        icon: styles.icon,
        content: styles.content,
        title: styles.title,
        value: styles.value,
        subtext: styles.subtext,
      }}
    />
  );
};

export default MetricBox;
