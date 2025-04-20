"use client";

import React from "react";
import BaseProgressBar from "../ProgressBarBase";
import styles from "./ProgressBar.module.scss";
import { ProgressBarProps } from "../ProgressBar.types";

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  return (
    <BaseProgressBar
      {...props}
      classNames={{
        container: styles.progressContainer,
        bar: styles.progressBar,
        themeMap: {
          primary: styles.primary,
          secondary: styles.secondary,
          success: styles.success,
          error: styles.error,
          warning: styles.warning,
          info: styles.info,
        },
        sizeMap: {
          small: styles.small,
          medium: styles.medium,
          large: styles.large,
        },
        animated: styles.animated,
        indeterminate: styles.indeterminate,
      }}
    />
  );
};

export default ProgressBar;
