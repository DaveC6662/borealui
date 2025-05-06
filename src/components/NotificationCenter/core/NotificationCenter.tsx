import React from "react";
import BaseNotificationCenter from "../NotificationCenterBase";
import { Button, IconButton } from "@/index.core";
import "./NotificationCenter.scss";
import { NotificationCenterProps } from "../NotificationCenter.types";

const NotificationCenter: React.FC<NotificationCenterProps> = (props) => {
  return (
    <BaseNotificationCenter
      {...props}
      Button={Button}
      IconButton={IconButton}
      classNames={{
        wrapper: "notificationCenter",
        header: "header",
        list: "list",
        notification: "notification",
        icon: "icon",
        content: "content",
        message: "message",
        timestamp: "timestamp",
        close: "close",
        clearAll: "clearAll",
        typeMap: {
          general: "general",
          success: "success",
          error: "error",
          warning: "warning",
          info: "info",
        },
      }}
    />
  );
};

export default NotificationCenter;
