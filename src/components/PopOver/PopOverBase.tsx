import React, { useState, useRef, useEffect, JSX } from "react";
import { PopoverProps } from "./PopOver.types";

export interface BasePopoverProps extends PopoverProps {
  classNames: {
    container: string;
    trigger: string;
    popover: string;
    placementMap: Record<string, string>;
    themeMap: Record<string, string>;
  };
}

const BasePopover: React.FC<BasePopoverProps> = ({
  trigger,
  content,
  placement = "bottom",
  theme = "primary",
  className = "",
  "data-testid": testId = "popover",
  classNames,
}: BasePopoverProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

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
      if (e.key === "Escape") close();
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div
      className={`${classNames.container} ${className}`}
      ref={popoverRef}
      data-testid={testId}
    >
      <div
        className={classNames.trigger}
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
            classNames.popover,
            classNames.placementMap[placement],
            classNames.themeMap[theme],
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
