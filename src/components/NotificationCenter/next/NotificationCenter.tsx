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
      classMap={styles}
    />
  );
};

export default NotificationCenter;
