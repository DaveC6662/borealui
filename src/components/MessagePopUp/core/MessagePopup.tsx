import React from "react";
import BaseMessagePopup from "../MessagePopupBase";
import Button from "../../Buttons/Button/core/Button";
import IconButton from "../../Buttons/IconButton/core/IconButton";
import "./MessagePopup.scss";
import { MessagePopupProps } from "../MessagePopup.types";

const MessagePopup: React.FC<MessagePopupProps> = (props) => {
  return (
    <BaseMessagePopup
      {...props}
      Button={Button}
      IconButton={IconButton}
      classNames={{
        wrapper: "messagePopup",
        content: "popupContent",
        close: "closeButton",
        message: "popupMessage",
        actions: "popupActions",
        confirm: "confirmBtn",
        cancel: "cancelBtn",
      }}
    />
  );
};

export default MessagePopup;
