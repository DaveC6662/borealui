import React, {
  useEffect,
  useRef,
  useState,
  useId,
  KeyboardEvent,
} from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@/Icons";
import { ModalProps } from "./Modal.types";
import { combineClassNames } from "@/utils/classNames";
import { capitalize } from "@/utils/capitalize";
import { defaultRounding, defaultShadow } from "@/config/boreal-style-config";

export interface BaseModalProps extends ModalProps {
  IconButton: React.ComponentType<any>;
  classMap: Record<string, string>;
  portalId?: string;
}

const BaseModal: React.FC<BaseModalProps> = ({
  className = "",
  children,
  rounding = defaultRounding,
  shadow = defaultShadow,
  onClose,
  "data-testid": testId = "modal",
  IconButton,
  classMap,
  portalId = "widget-portal",
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusable = useRef<HTMLButtonElement>(null);

  const id = useId();
  const labelId = `${id}-label`;
  const descId = `${id}-desc`;

  useEffect(() => {
    setIsMounted(true);
    let portal = document.getElementById(portalId);
    if (!portal) {
      portal = document.createElement("div");
      portal.id = portalId;
      document.body.appendChild(portal);
    }
    setPortalElement(portal);
    document.body.classList.add("noScroll");

    return () => {
      document.body.classList.remove("noScroll");
    };
  }, [portalId]);

  useEffect(() => {
    if (isMounted) {
      requestAnimationFrame(() => {
        setIsVisible(true);
        setTimeout(() => {
          modalRef.current?.focus();
        }, 10);
      });
    }
  }, [isMounted]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") onClose();
    if (e.key === "Tab") trapFocus(e);
  };

  const trapFocus = (e: KeyboardEvent) => {
    const focusableEls = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusableEls || focusableEls.length === 0) return;

    const first = focusableEls[0];
    const last = focusableEls[focusableEls.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
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
      className={combineClassNames(
        classMap.overlay,
        isVisible ? classMap.visible : classMap.hidden
      )}
      onClick={handleClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelId}
      aria-describedby={descId}
      tabIndex={-1}
      ref={modalRef}
      data-testid={testId}
    >
      <div
        className={contentClassName}
        onClick={(e) => e.stopPropagation()}
        data-testid={`${testId}-content`}
        id={descId}
      >
        <h2 id={labelId} className="sr-only">
          Modal Dialog
        </h2>

        <IconButton
          ref={firstFocusable}
          className={classMap.closeButton}
          state="error"
          size="small"
          icon={CloseIcon}
          aria-label="Close modal"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            handleClose();
          }}
          title="Close"
          data-testid={`${testId}-close`}
        />

        {children}
      </div>
    </div>,
    portalElement
  );
};

export default BaseModal;
