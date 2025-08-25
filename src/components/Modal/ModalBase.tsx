import React, {
  useEffect,
  useRef,
  useState,
  useId,
  KeyboardEvent,
} from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "../../Icons";
import { BaseModalProps } from "./Modal.types";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
} from "../../config/boreal-style-config";

const BaseModal: React.FC<BaseModalProps> = ({
  className = "",
  children,
  rounding = getDefaultRounding(),
  shadow = getDefaultShadow(),
  onClose,
  "data-testid": testId = "modal",
  IconButton,
  classMap,
  portalId = "widget-portal",
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const focusablesRef = useRef<HTMLElement[]>([]);

  const uid = useId();
  const labelId = `${uid}-label`;

  useEffect(() => {
    setIsMounted(true);
    openerRef.current = (document.activeElement as HTMLElement) ?? null;

    let portal = document.getElementById(portalId);
    if (!portal) {
      portal = document.createElement("div");
      portal.id = portalId;
      document.body.appendChild(portal);
    }
    setPortalElement(portal);
    document.body.classList.add("noScroll");

    const siblings = Array.from(document.body.children) as HTMLElement[];
    const hidden: HTMLElement[] = [];
    siblings.forEach((el) => {
      if (el !== portal && !el.hasAttribute("aria-hidden")) {
        el.setAttribute("aria-hidden", "true");
        hidden.push(el);
      }
    });

    const handleEsc = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.body.classList.remove("noScroll");
      document.removeEventListener("keydown", handleEsc);
      hidden.forEach((el) => el.removeAttribute("aria-hidden"));
      openerRef.current?.focus?.();
    };
  }, [portalId, onClose]);

  useEffect(() => {
    if (!isMounted) return;
    requestAnimationFrame(() => {
      setIsVisible(true);

      if (dialogRef.current) {
        focusablesRef.current = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);
      }

      (
        focusablesRef.current[0] ??
        closeBtnRef.current ??
        dialogRef.current
      )?.focus?.();
    });
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

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 200);
  };

  if (!isMounted || !portalElement) return null;

  const contentClassName = combineClassNames(
    classMap.content,
    className,
    shadow && classMap[`shadow${capitalize(shadow)}`],
    rounding && classMap[`round${capitalize(rounding)}`]
  );

  return ReactDOM.createPortal(
    <div
      ref={overlayRef}
      className={combineClassNames(
        classMap.overlay,
        isVisible ? classMap.visible : classMap.hidden
      )}
      onClick={handleClose}
      role="presentation"
      data-testid={testId}
    >
      <div
        ref={dialogRef}
        className={contentClassName}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        data-testid={`${testId}-content`}
      >
        <h2 id={labelId} className={classMap.srOnly ?? "sr_only"}>
          Modal Dialog
        </h2>

        <IconButton
          ref={closeBtnRef}
          className={classMap.closeButton}
          state="error"
          size="small"
          icon={CloseIcon}
          ariaLabel="Close modal"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            handleClose();
          }}
          title="Close"
          data-testid={`${testId}-close`}
          type="button"
        />

        {children}
      </div>
    </div>,
    portalElement
  );
};

BaseModal.displayName = "BaseModal";
export default BaseModal;
