import React from "react";
import BaseModal from "../ModalBase";
import "./Modal.scss";
import IconButton from "../../Buttons/IconButton/core/IconButton";
import { ModalProps } from "../Modal.types";

const classes = {
  overlay: "modal_overlay",
  visible: "modal_visible",
  hidden: "modal_hidden",
  content: "modal_content",
  closeButton: "modal_close_button",
};

const Modal: React.FC<ModalProps> = (props) => {
  return <BaseModal {...props} IconButton={IconButton} classMap={classes} />;
};

export default Modal;
