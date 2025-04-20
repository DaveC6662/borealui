"use client";

import React from "react";
import BaseNotificationCenter from "../NotificationCenterBase";
import { Button, IconButton } from "@/index.next";
import styles from "./NotificationCenter.module.scss";
import { NotificationCenterProps } from "../NotificationCenter.types";

const NotificationCenter: React.FC<NotificationCenterProps> = (props) => {
  return (
    <BaseNotificationCenter
      {...props}
      Button={Button}
      IconButton={IconButton}
      classNames={{
        wrapper: styles.notificationCenter,
        header: styles.header,
        list: styles.list,
        notification: styles.notification,
        icon: styles.icon,
        content: styles.content,
        message: styles.message,
        timestamp: styles.timestamp,
        close: styles.close,
        clearAll: styles.clearAll,
        typeMap: {
          general: styles.general,
          success: styles.success,
          error: styles.error,
          warning: styles.warning,
          info: styles.info,
        },
      }}
    />
  );
};

export default NotificationCenter;
