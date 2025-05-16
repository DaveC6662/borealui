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
  const [dynamicPlacement, setDynamicPlacement] = useState(placement);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setOpen((prev) => !prev);
  const close = () => {
    setOpen(false);
    setDynamicPlacement(placement);
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

    if (open && popoverRef.current && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverEl = popoverRef.current;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const spaceAbove = triggerRect.top;
      const spaceBelow = viewportHeight - triggerRect.bottom;
      const spaceLeft = triggerRect.left;
      const spaceRight = viewportWidth - triggerRect.right;

      popoverEl.style.transform = "";
      popoverEl.style.left = "";
      popoverEl.style.right = "";
      popoverEl.style.top = "";
      popoverEl.style.bottom = "";

      let newPlacement = placement;

      if (placement === "top" && popoverEl.offsetHeight > spaceAbove) {
        newPlacement = "bottom";
      } else if (
        placement === "bottom" &&
        popoverEl.offsetHeight > spaceBelow
      ) {
        newPlacement = "top";
      } else if (placement === "left" && popoverEl.offsetWidth > spaceLeft) {
        newPlacement = "right";
      } else if (placement === "right" && popoverEl.offsetWidth > spaceRight) {
        newPlacement = "left";
      }

      setDynamicPlacement(newPlacement);

      requestAnimationFrame(() => {
        const popoverRect = popoverEl.getBoundingClientRect();

        let dx = 0;
        let dy = 0;

        if (popoverRect.left < 8) {
          dx = 8 - popoverRect.left;
        } else if (popoverRect.right > viewportWidth - 8) {
          dx = viewportWidth - 8 - popoverRect.right;
        }

        if (popoverRect.top < 8) {
          dy = 8 - popoverRect.top;
        } else if (popoverRect.bottom > viewportHeight - 8) {
          dy = viewportHeight - 8 - popoverRect.bottom;
        }

        if (dx !== 0 || dy !== 0) {
          if (popoverRect.left < 8) {
            popoverEl.style.left = "8px";
            popoverEl.style.transform = "translateY(10px)";
          } else if (popoverRect.right > viewportWidth - 8) {
            popoverEl.style.right = "8px";
            popoverEl.style.left = "auto";
            popoverEl.style.transform = "translateY(10px)";
          }
        }
      });
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className={`${classMap.container} ${className}`} data-testid={testId}>
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
          ref={popoverRef}
          id={`${testId}-content`}
          role="dialog"
          aria-modal="false"
          aria-labelledby={`${testId}-trigger`}
          className={[
            classMap.popover,
            classMap[dynamicPlacement],
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
