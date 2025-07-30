"use client";

import React from "react";
import BaseMessagePopUp from "../MessagePopUpBase";
import { Button, IconButton } from "../../../index.next";
import styles from "./MessagePopup.module.scss";
import { MessagePopUpProps } from "../MessagePopUp.types";

const MessagePopUp: React.FC<MessagePopUpProps> = (props) => {
  return (
    <BaseMessagePopUp
      {...props}
      Button={Button}
      IconButton={IconButton}
      classMap={styles}
    />
  );
};

export default MessagePopUp;
