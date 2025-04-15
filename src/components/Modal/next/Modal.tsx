"use client";

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
import { IconButton } from "@/index.next";
import { ModalProps } from "../Modal.types";

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

  // Set up the portal element and disable background scrolling when the modal mounts.
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

  // Once mounted, use animation frame to show modal (for fade-in effect).
  useEffect(() => {
    if (isMounted) {
      requestAnimationFrame(() => setIsVisible(true));
    }
  }, [isMounted]);

  /**
   * Handles keyboard interactions for accessibility.
   * Closes the modal on Escape key and traps focus on Tab key.
   *
   * @param {KeyboardEvent<HTMLDivElement>} e - The keyboard event.
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") onClose();
    if (e.key === "Tab") trapFocus(e);
  };

  /**
   * Traps focus inside the modal dialog by redirecting tab navigation.
   *
   * @param {KeyboardEvent} e - The keyboard event for Tab key.
   */
  const trapFocus = (e: KeyboardEvent) => {
    const focusableEls = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusableEls || focusableEls.length === 0) return;

    const first = focusableEls[0];
    const last = focusableEls[focusableEls.length - 1];

    if (e.shiftKey) {
      // Reverse tabbing: if on first focusable, wrap to last.
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      // Forward tabbing: if on last focusable, wrap to first.
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  /**
   * Handles closing of the modal with a fade-out transition.
   */
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 200);
  };

  // Do not render until the portal element is ready.
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
          onClick={(e) => {
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
