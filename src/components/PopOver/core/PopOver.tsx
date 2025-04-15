import React, { useState, useRef, useEffect } from "react";
import styles from "./Popover.module.scss";
import { PopoverProps } from "../PopOver.types";

/**
 * Popover is a lightweight UI component that displays additional
 * contextual information when triggered. It supports click-based toggling,
 * keyboard activation (using Enter to toggle and Escape to close), and
 * closes automatically when clicking outside of the component.
 *
 * @param {PopoverProps} props - The props for configuring the popover.
 * @returns {JSX.Element} A popover component with trigger and conditional content.
 */
const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  placement = "bottom",
  theme = "primary",
  className = "",
  "data-testid": testId = "popover",
}) => {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  /** Toggles the popover open state. */
  const toggleOpen = () => setOpen((prev) => !prev);

  /** Closes the popover. */
  const close = () => setOpen(false);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [open]);

  return (
    <div
      className={`${styles.popoverContainer} ${className}`}
      ref={popoverRef}
      data-testid={testId}
    >
      <div
        className={styles.trigger}
        onClick={toggleOpen}
        onKeyDown={(e) => e.key === "Enter" && toggleOpen()}
        tabIndex={0}
        role="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={`${testId}-content`}
        ref={triggerRef}
        data-testid={`${testId}-trigger`}
      >
        {trigger}
      </div>

      {open && (
        <div
          id={`${testId}-content`}
          role="dialog"
          aria-modal="false"
          className={[
            styles.popover,
            styles[placement],
            styles[theme],
          ].join(" ")}
          data-testid={`${testId}-content`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;
