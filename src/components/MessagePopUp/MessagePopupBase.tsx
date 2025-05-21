import React, {
  useEffect,
  useRef,
  useState,
  useId,
  KeyboardEvent,
} from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@/Icons";
import { MessagePopupProps } from "./MessagePopup.types";

export interface BaseMessagePopupProps extends MessagePopupProps {
  Button: React.ComponentType<any>;
  IconButton: React.ComponentType<any>;
  classNames: Record<string, string>;
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
  const firstButtonRef = useRef<HTMLButtonElement>(null);
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

    const handleEscape = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.classList.remove("no-scroll");
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  useEffect(() => {
    setTimeout(() => {
      firstButtonRef.current?.focus();
    }, 10);
  }, [isMounted]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;

    const focusableEls = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusableEls || focusableEls.length === 0) return;

    const first = focusableEls[0];
    const last = focusableEls[focusableEls.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

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
        onKeyDown={handleKeyDown}
        data-testid={`${testId}-dialog`}
      >
        <IconButton
          className={classNames.close}
          onClick={onClose}
          aria-label="Close popup"
          icon={CloseIcon}
          theme="error"
          size="small"
          data-testid={`${testId}-close`}
        />
        <h2
          id={messageId}
          className={classNames.message}
          data-testid={`${testId}-message`}
        >
          {message}
        </h2>
        <div className={classNames.actions} data-testid={`${testId}-actions`}>
          {onConfirm && (
            <Button
              className={classNames.confirm}
              theme="error"
              onClick={onConfirm}
              ref={firstButtonRef}
              type="button"
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
              type="button"
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
