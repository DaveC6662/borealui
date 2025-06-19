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
      classMap={styles}
    />
  );
};

export default MessagePopup;
