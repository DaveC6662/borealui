import React, { useState, useRef, useEffect, JSX, useMemo, useId } from "react";
import { BasePopoverProps } from "./PopOver.types";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultTheme,
} from "../../config/boreal-style-config";

const BasePopover: React.FC<BasePopoverProps> = ({
  trigger,
  content,
  placement = "bottom",
  theme = getDefaultTheme(),
  rounding = getDefaultRounding(),
  shadow = getDefaultShadow(),
  state = "",
  className = "",
  role = "dialog",
  "data-testid": testId = "popover",
  classMap,
}): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [dynamicPlacement, setDynamicPlacement] = useState(placement);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const uid = useId();
  const contentId = `${uid}-content`;
  const labelId = `${uid}-label`;

  type PopupRole = "dialog" | "menu" | "tooltip";
  const VALID_ROLES: PopupRole[] = ["dialog", "menu", "tooltip"];

  function asValidRole(r?: string): PopupRole | undefined {
    return (VALID_ROLES as readonly string[]).includes(r ?? "")
      ? (r as PopupRole)
      : undefined;
  }

  const popupRole = asValidRole(role);

  const ariaHasPopup: React.AriaAttributes["aria-haspopup"] =
    role === "dialog" ? "dialog" : role === "menu" ? "menu" : undefined;

  const triggerAria =
    role === "tooltip"
      ? { "aria-describedby": contentId }
      : {
          ...(ariaHasPopup ? { "aria-haspopup": ariaHasPopup } : {}),
          "aria-expanded": open,
          "aria-controls": contentId,
        };

  const toggleOpen = () => setOpen((prev) => !prev);
  const close = () => {
    setOpen(false);
    setDynamicPlacement(placement);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      const t = event.target as Node;
      if (popoverRef.current?.contains(t)) return;
      if (triggerRef.current?.contains(t as Node)) return;
      close();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, placement]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onReflow = () => setDynamicPlacement((p) => p);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onReflow, { passive: true });
    window.addEventListener("scroll", onReflow, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onReflow);
      window.removeEventListener("scroll", onReflow);
    };
  }, [open]);

  useEffect(() => {
    if (!open || !popoverRef.current || !triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverEl = popoverRef.current;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const spaceAbove = triggerRect.top;
    const spaceBelow = vh - triggerRect.bottom;
    const spaceLeft = triggerRect.left;
    const spaceRight = vw - triggerRect.right;

    popoverEl.style.transform = "";
    popoverEl.style.left = "";
    popoverEl.style.right = "";
    popoverEl.style.top = "";
    popoverEl.style.bottom = "";

    let newPlacement = placement;
    if (placement === "top" && popoverEl.offsetHeight > spaceAbove)
      newPlacement = "bottom";
    else if (placement === "bottom" && popoverEl.offsetHeight > spaceBelow)
      newPlacement = "top";
    else if (placement === "left" && popoverEl.offsetWidth > spaceLeft)
      newPlacement = "right";
    else if (placement === "right" && popoverEl.offsetWidth > spaceRight)
      newPlacement = "left";

    setDynamicPlacement(newPlacement);

    requestAnimationFrame(() => {
      const rect = popoverEl.getBoundingClientRect();
      let dx = 0;
      let dy = 0;
      const pad = 8;

      if (rect.left < pad) dx = pad - rect.left;
      else if (rect.right > vw - pad) dx = vw - pad - rect.right;

      if (rect.top < pad) dy = pad - rect.top;
      else if (rect.bottom > vh - pad) dy = vh - pad - rect.bottom;

      if (dx !== 0 || dy !== 0) {
        const tx = dx !== 0 ? `translateX(${dx}px)` : "";
        const ty = dy !== 0 ? `translateY(${dy}px)` : "";
        popoverEl.style.transform = `${tx} ${ty}`.trim();
      }
    });
  }, [open, placement, dynamicPlacement]);

  const popoverContentClass = useMemo(
    () =>
      combineClassNames(
        classMap.popover,
        classMap[dynamicPlacement],
        classMap[theme],
        classMap[state],
        shadow && classMap[`shadow${capitalize(shadow)}`],
        rounding && classMap[`round${capitalize(rounding)}`],
        className
      ),
    [classMap, dynamicPlacement, rounding, shadow, theme, state, className]
  );

  useEffect(() => {
    if (!open) return;
    const el = popoverRef.current;
    if (!el) return;
    const focusable = el.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    (focusable ?? el).focus();
  }, [open]);

  return (
    <div
      className={combineClassNames(classMap.container, className)}
      data-testid={testId}
    >
      <button
        type="button"
        className={classMap.trigger}
        onClick={toggleOpen}
        aria-label="Toggle popover"
        ref={triggerRef}
        data-testid={`${testId}-trigger`}
        {...triggerAria}
      >
        {trigger}
      </button>

      {open && (
        <div
          ref={popoverRef}
          id={contentId}
          role={popupRole}
          aria-labelledby={labelId}
          className={popoverContentClass}
          data-testid={`${testId}-content`}
          tabIndex={popupRole === "tooltip" ? undefined : -1}
        >
          <span id={labelId} className={classMap.srOnly ?? "sr_only"}>
            Popover Content
          </span>
          {content}
        </div>
      )}
    </div>
  );
};

BasePopover.displayName = "BasePopover";
export default BasePopover;
