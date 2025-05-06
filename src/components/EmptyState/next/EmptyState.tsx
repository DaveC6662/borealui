"use client";

import React from "react";
import BaseEmptyState from "../EmptyStateBase";
import { EmptyStateProps } from "../EmptyState.types";
import { Button } from "../../../index.next";
import styles from "./EmptyState.module.scss";

const EmptyState: React.FC<EmptyStateProps> = (props) => {
  return (
    <BaseEmptyState
      {...props}
      Button={Button}
      classNames={{
        wrapper: styles.emptyState,
        title: styles.title,
        message: styles.message,
        icon: styles.icon,
        outline: styles.outline,
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
      }}
    />
  );
};

export default EmptyState;
