import React, {
    useEffect,
    useId,
    useRef,
    useState,
    KeyboardEvent,
    JSX,
  } from "react";
  import { FaTimes } from "react-icons/fa";
  import ReactDOM from "react-dom";
  import styles from "./Modal.module.scss";
  import { IconButton } from "@/index";
import { ModalProps } from "./Modal.types";
  
  /**
   * Modal is a generic and accessible modal dialog rendered via a React portal.
   * It includes built-in focus trapping, keyboard support (e.g. closing with Escape), 
   * and disables page scrolling when visible.
   *
   * @param {ModalProps} props - The props for configuring the modal.
   * @returns {JSX.Element | null} The modal element rendered into a portal, or null if not mounted.
   */
  const Modal: React.FC<ModalProps> = ({
    className = "",
    children,
    onClose,
    "data-testid": testId = "modal",
  }: ModalProps): JSX.Element | null => {
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
      let portal = document.getElementById("widget-portal");
      if (!portal) {
        portal = document.createElement("div");
        portal.id = "widget-portal";
        document.body.appendChild(portal);
      }
      setPortalElement(portal);
      document.body.classList.add("noScroll");
  
      return () => {
        document.body.classList.remove("noScroll");
      };
    }, []);
  
    useEffect(() => {
      if (isMounted) {
        requestAnimationFrame(() => setIsVisible(true));
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
  
    return ReactDOM.createPortal(
      <div
        className={`${styles.modalOverlay} ${isVisible ? styles.visible : styles.hidden}`}
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
          className={`${styles.modalContent} ${className}`}
          onClick={(e) => e.stopPropagation()}
          id={descId}
          data-testid={`${testId}-content`}
        >
          <div id={labelId} className="sr-only">
            Modal Dialog
          </div>
          <IconButton
            ref={firstFocusable}
            className={styles.closeButton}
            theme="error"
            size="small"
            icon={FaTimes}
            ariaLabel="Close modal"
            onClick={(e: { stopPropagation: () => void; }) => {
              e.stopPropagation();
              handleClose();
            }}
            data-testid={`${testId}-close`}
          />
          {children}
        </div>
      </div>,
      portalElement
    );
  };
  
  export default Modal;
  