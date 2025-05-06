"use client";

import React from "react";
import BaseMessagePopup from "../MessagePopupBase";
import { Button, IconButton } from "../../../index.next";
import styles from "./MessagePopup.module.scss";
import { MessagePopupProps } from "../MessagePopup.types";

const MessagePopup: React.FC<MessagePopupProps> = (props) => {
  return (
    <BaseMessagePopup
      {...props}
      Button={Button}
      IconButton={IconButton}
      classNames={{
        wrapper: styles.messagePopup,
        content: styles.popupContent,
        close: styles.closeButton,
        message: styles.popupMessage,
        actions: styles.popupActions,
        confirm: styles.confirmBtn,
        cancel: styles.cancelBtn,
      }}
    />
  );
};

export default MessagePopup;
