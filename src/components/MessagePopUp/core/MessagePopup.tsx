import React from "react";
import BaseMessagePopup from "../MessagePopupBase";
import { Button, IconButton } from "../../../index.core";
import "./MessagePopup.scss";
import { MessagePopupProps } from "../MessagePopup.types";

const classes = {
  wrapper: "messagePopup",
  content: "messagePopup_popupContent",
  close: "messagePopup_closeButton",
  message: "messagePopup_popupMessage",
  actions: "messagePopup_popupActions",
  confirm: "messagePopup_confirmBtn",
  cancel: "messagePopup_cancelBtn",
};

const MessagePopup: React.FC<MessagePopupProps> = (props) => {
  return (
    <BaseMessagePopup
      {...props}
      Button={Button}
      IconButton={IconButton}
      classNames={classes}
    />
  );
};

export default MessagePopup;
