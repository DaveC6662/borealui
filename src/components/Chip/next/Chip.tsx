"use client";

import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Chip.module.scss";
import { IconButton } from "@/index.next";
import { FaTimes } from "react-icons/fa";
import { combineClassNames } from "@/utils/classNames";
import { ChipProps } from "../Chip.types";

/**
 * A floating chip/toast component for showing temporary messages.
 * Supports icons, theming, animations, auto-dismiss, and portal-based rendering.
 *
 * @param {ChipProps} props - Props to configure the chip.
 * @returns {JSX.Element | null} The rendered chip or null if not visible.
 */
const Chip: React.FC<ChipProps> = ({
  id,
  message,
  visible,
  onClose,
  icon: Icon,
  size = "medium",
  theme = "primary",
  position = "topCenter",
  className = "",
  autoClose = true,
  duration = 3000,
  "data-testid": testId = "chip",
}) => {
  const [closing, setClosing] = useState(false);

  /**
   * Handles chip close with a brief fade-out transition.
   */
  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      onClose?.();
    }, 300); // match with CSS fadeOut duration
  }, [onClose]);

  /**
   * Sets up auto-close timer when visible and autoClose is enabled.
   */
  useEffect(() => {
    if (autoClose && visible) {
      const timer = setTimeout(() => handleClose(), duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, visible, handleClose]);

  // Don't render at all if chip isn't visible or animating out
  if (!visible && !closing) return null;

  // Combine styles based on props and state
  const classNames = combineClassNames(
    styles.chip,
    styles[theme],
    styles[size],
    styles[position],
    closing && styles.fadeOut,
    className
  );

  // Get portal target (typically a div with id="widget-portal")
  const portalEl = typeof window !== "undefined"
    ? document.getElementById("widget-portal")
    : null;

  if (!portalEl) return null;

  // Render chip inside the portal
  return ReactDOM.createPortal(
    <div
      key={id}
      className={classNames}
      role="status"
      aria-live="polite"
      data-testid={testId}
    >
      {Icon && (
        <span className={styles.chipIcon} aria-hidden="true" data-testid="icon">
          <Icon className={styles.icon} />
        </span>
      )}
      <span className={styles.chipMessage}>{message}</span>
      <IconButton
        icon={FaTimes}
        size="small"
        theme="clear"
        ariaLabel="Close chip"
        className={styles.chipClose}
        onClick={handleClose}
        data-testid="chip-close"
      />
    </div>,
    portalEl
  );
};

export default Chip;
