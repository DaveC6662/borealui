import React, { useState, useRef, useEffect, JSX } from "react";
import { PopoverProps } from "./PopOver.types";

export interface BasePopoverProps extends PopoverProps {
  classMap: Record<string, string>;
}

const BasePopover: React.FC<BasePopoverProps> = ({
  trigger,
  content,
  placement = "bottom",
  theme = "primary",
  className = "",
  "data-testid": testId = "popover",
  classMap,
}: BasePopoverProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setOpen((prev) => !prev);
  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        close();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div
      className={`${classMap.container} ${className}`}
      ref={popoverRef}
      data-testid={testId}
    >
      <div
        className={classMap.trigger}
        onClick={toggleOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleOpen();
          }
        }}
        tabIndex={0}
        role="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={`${testId}-content`}
        aria-label="Toggle popover"
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
          aria-labelledby={`${testId}-trigger`}
          className={[
            classMap.popover,
            classMap[placement],
            classMap[theme],
          ].join(" ")}
          data-testid={`${testId}-content`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default BasePopover;
