import React, { useEffect, useRef, useState, useId } from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";
import { MessagePopupProps } from "./MessagePopup.types";

export interface BaseMessagePopupProps extends MessagePopupProps {
  Button: React.ComponentType<any>;
  IconButton: React.ComponentType<any>;
  classNames: {
    wrapper: string;
    content: string;
    close: string;
    message: string;
    actions: string;
    confirm: string;
    cancel: string;
  };
}

const BaseMessagePopup: React.FC<BaseMessagePopupProps> = ({
  message,
  onClose,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  className = "",
  "data-testid": testId = "message-popup",
  Button,
  IconButton,
  classNames,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const messageId = useId();

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

  useEffect(() => {
    dialogRef.current?.focus();
  }, [isMounted]);

  if (!isMounted || !portalElement) return null;

  return ReactDOM.createPortal(
    <div
      className={`${classNames.wrapper} ${className}`}
      onClick={onClose}
      role="presentation"
      data-testid={testId}
    >
      <div
        className={classNames.content}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={messageId}
        tabIndex={-1}
        ref={dialogRef}
        data-testid={`${testId}-dialog`}
      >
        <IconButton
          className={classNames.close}
          onClick={onClose}
          aria-label="Close popup"
          icon={FaTimes}
          theme="error"
          size="xs"
          data-testid={`${testId}-close`}
        />
        <p
          id={messageId}
          className={classNames.message}
          data-testid={`${testId}-message`}
        >
          {message}
        </p>
        <div className={classNames.actions} data-testid={`${testId}-actions`}>
          {onConfirm && (
            <Button
              className={classNames.confirm}
              theme="error"
              onClick={onConfirm}
              data-testid={`${testId}-confirm`}
            >
              {confirmText}
            </Button>
          )}
          {onCancel && (
            <Button
              className={classNames.cancel}
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

export default BaseMessagePopup;
