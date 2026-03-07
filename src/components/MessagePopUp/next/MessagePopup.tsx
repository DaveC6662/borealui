"use client";

import React from "react";
import BaseMessagePopUp from "../MessagePopupBase";
import { Button, IconButton } from "../../../index.next";
import styles from "./MessagePopup.module.scss";
import { MessagePopupProps } from "../MessagePopup.types";

const MessagePopup: React.FC<MessagePopupProps> = (props) => {
  return (
    <BaseMessagePopUp
      {...props}
      Button={Button}
      IconButton={IconButton}
      classMap={styles}
    />
  );
};
MessagePopup.displayName = "MessagePopup";
export default MessagePopup;
