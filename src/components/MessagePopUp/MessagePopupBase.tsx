import React, {
  useEffect,
  useRef,
  useState,
  useId,
  KeyboardEvent,
} from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "../../Icons";
import { MessagePopupProps } from "./MessagePopup.types";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
} from "../../config/boreal-style-config";

export interface BaseMessagePopupProps extends MessagePopupProps {
  Button: React.ComponentType<any>;
  IconButton: React.ComponentType<any>;
  classMap: Record<string, string>;
}

const BaseMessagePopup: React.FC<BaseMessagePopupProps> = ({
  message,
  onClose,
  onConfirm,
  onCancel,
  controlsRounding = getDefaultRounding(),
  rounding = getDefaultRounding(),
  shadow = getDefaultShadow(),
  confirmText = "Confirm",
  cancelText = "Cancel",
  className = "",
  "data-testid": testId = "message-popup",
  Button,
  IconButton,
  classMap,
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

  const wrapperClass = combineClassNames(
    classMap.wrapper,
    shadow && classMap[`shadow${capitalize(shadow)}`],
    rounding && classMap[`round${capitalize(rounding)}`],
    className
  );

  return ReactDOM.createPortal(
    <div
      className={wrapperClass}
      onClick={onClose}
      role="presentation"
      data-testid={testId}
    >
      <div
        className={classMap.content}
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
          className={classMap.close}
          onClick={onClose}
          aria-label="Close popup"
          icon={CloseIcon}
          state="error"
          size="small"
          data-testid={`${testId}-close`}
        />
        <h2
          id={messageId}
          className={classMap.message}
          data-testid={`${testId}-message`}
        >
          {message}
        </h2>
        <div className={classMap.actions} data-testid={`${testId}-actions`}>
          {onConfirm && (
            <Button
              className={classMap.confirm}
              state="success"
              onClick={onConfirm}
              ref={firstButtonRef}
              rounding={controlsRounding}
              type="button"
              data-testid={`${testId}-confirm`}
            >
              {confirmText}
            </Button>
          )}
          {onCancel && (
            <Button
              className={classMap.cancel}
              state="warning"
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
