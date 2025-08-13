import React, {
  useEffect,
  useRef,
  useState,
  useId,
  KeyboardEvent,
} from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "../../Icons";
import { BaseMessagePopupProps } from "./MessagePopup.types";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
} from "../../config/boreal-style-config";

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
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const focusablesRef = useRef<HTMLElement[]>([]);
  const messageId = useId();

  useEffect(() => {
    setIsMounted(true);
    openerRef.current = (document.activeElement as HTMLElement) ?? null;

    let portal = document.getElementById("popup-portal");
    if (!portal) {
      portal = document.createElement("div");
      portal.id = "popup-portal";
      document.body.appendChild(portal);
    }
    setPortalElement(portal);
    document.body.classList.add("no-scroll");

    const roots = Array.from(document.body.children);
    const restored: Array<HTMLElement> = [];
    roots.forEach((el) => {
      if (el !== portal && !el.hasAttribute("aria-hidden")) {
        el.setAttribute("aria-hidden", "true");
        restored.push(el as HTMLElement);
      }
    });

    const handleEscape = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.classList.remove("no-scroll");
      document.removeEventListener("keydown", handleEscape);
      restored.forEach((el) => el.removeAttribute("aria-hidden"));
      openerRef.current?.focus?.();
    };
  }, [onClose]);

  useEffect(() => {
    if (!dialogRef.current) return;
    focusablesRef.current = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

    const target =
      firstButtonRef.current ||
      cancelButtonRef.current ||
      (closeBtnRef.current as HTMLElement | null) ||
      focusablesRef.current[0];
    target?.focus?.();
  }, [isMounted]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const list = focusablesRef.current;
    if (!list.length) return;

    const first = list[0];
    const last = list[list.length - 1];

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
          ref={closeBtnRef as any}
          className={classMap.close}
          onClick={onClose}
          aria-label="Close popup"
          icon={CloseIcon}
          state="error"
          size="small"
          type="button"
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
              ref={cancelButtonRef}
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

BaseMessagePopup.displayName = "BaseMessagePopup";
export default BaseMessagePopup;
