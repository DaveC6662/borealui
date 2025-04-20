import React from "react";
import BaseModal from "../ModalBase";
import "./Modal.scss";
import IconButton from "../../Buttons/IconButton/core/IconButton";
import { ModalProps } from "../Modal.types";

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <BaseModal
      {...props}
      IconButton={IconButton}
      classNames={{
        overlay: "modalOverlay",
        visible: "visible",
        hidden: "hidden",
        content: "modalContent",
        closeButton: "closeButton",
      }}
    />
  );
};

export default Modal;
