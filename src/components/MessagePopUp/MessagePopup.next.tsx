"use client";

import React, { JSX, useEffect, useId, useRef, useState } from "react";
import { FaTimes } from "react-icons/fa";
import ReactDOM from "react-dom";
import styles from "./MessagePopup.module.scss";
import { Button, IconButton } from "@/index";
import { MessagePopupProps } from "./MessagePopup.types";

/**
 * MessagePopup is a modal dialog that displays a message along with optional confirm
 * and cancel actions. It renders via a React portal and includes keyboard support
 * (e.g., Escape key to close) as well as focus management for accessibility.
 *
 * @param {MessagePopupProps} props - Props to configure the MessagePopup.
 * @returns {JSX.Element | null} The rendered MessagePopup component via a portal, or null if not mounted.
 */
const MessagePopup: React.FC<MessagePopupProps> = ({
  message,
  onClose,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  className = "",
  "data-testid": testId = "message-popup",
}: MessagePopupProps): JSX.Element | null => {
  const [isMounted, setIsMounted] = useState(false);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const messageId = useId();

  // Setup portal element and event listeners when component mounts.
  useEffect(() => {
    setIsMounted(true);
    let portal = document.getElementById("popup-portal");

    if (!portal) {
      portal = document.createElement("div");
      portal.id = "popup-portal";
      document.body.appendChild(portal);
    }

    setPortalElement(portal);
    document.body.classList.add("no-scroll");

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.classList.remove("no-scroll");
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  // Focus management: once mounted, focus the dialog container.
  useEffect(() => {
    dialogRef.current?.focus();
  }, [isMounted]);

  if (!isMounted || !portalElement) return null;

  return ReactDOM.createPortal(
    <div
      className={`${styles.messagePopup} ${className}`}
      onClick={onClose}
      role="presentation"
      data-testid={testId}
    >
      <div
        className={styles.popupContent}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={messageId}
        tabIndex={-1}
        ref={dialogRef}
        data-testid={`${testId}-dialog`}
      >
        <IconButton
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close popup"
          icon={FaTimes}
          theme="error"
          size="xs"
          data-testid={`${testId}-close`}
        />
        <p id={messageId} className={styles.popupMessage} data-testid={`${testId}-message`}>
          {message}
        </p>
        <div className={styles.popupActions} data-testid={`${testId}-actions`}>
          {onConfirm && (
            <Button
              className={styles.confirmBtn}
              theme="error"
              onClick={onConfirm}
              data-testid={`${testId}-confirm`}
            >
              {confirmText}
            </Button>
          )}
          {onCancel && (
            <Button
              className={styles.cancelBtn}
              theme="warning"
              onClick={onCancel}
              data-testid={`${testId}-cancel`}
            >
              {cancelText}
            </Button>
          )}
        </div>
      </div>
    </div>,
    portalElement
  );
};

export default MessagePopup;
