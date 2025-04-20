"use client";

import React from "react";
import BaseModal from "../ModalBase";
import styles from "./Modal.module.scss";
import { IconButton } from "@/index.next";
import { ModalProps } from "../Modal.types";

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <BaseModal
      {...props}
      IconButton={IconButton}
      classNames={{
        overlay: styles.modalOverlay,
        visible: styles.visible,
        hidden: styles.hidden,
        content: styles.modalContent,
        closeButton: styles.closeButton,
      }}
    />
  );
};

export default Modal;
