import React, { useCallback, useEffect, useState, KeyboardEvent } from "react";
import ReactDOM from "react-dom";
import { ChipProps } from "./Chip.types";
import { combineClassNames } from "@/utils/classNames";

export interface ChipBaseProps extends ChipProps {
  classMap: Record<string, string>;
  IconButtonComponent: React.ElementType;
  closeIcon?: React.ElementType;
}

const ChipBase: React.FC<ChipBaseProps> = ({
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
  closeIcon: CloseIcon,
  IconButtonComponent,
  classMap,
  "data-testid": testId = "chip",
}) => {
  const [closing, setClosing] = useState(false);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => onClose?.(), 300);
  }, [onClose]);

  useEffect(() => {
    if (autoClose && visible) {
      const timer = setTimeout(() => handleClose(), duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, visible, handleClose]);

  if (!visible && !closing) return null;

  const chipClassName = combineClassNames(
    classMap.chip,
    classMap[`chip_${theme}`],
    classMap[`chip_${size}`],
    classMap[`chip_${position}`],
    closing && classMap.chip_fadeout,
    className
  );

  const portalEl =
    typeof window !== "undefined"
      ? document.getElementById("widget-portal")
      : null;

  if (!portalEl) return null;

  return ReactDOM.createPortal(
    <div
      key={id}
      className={chipClassName}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      data-testid={testId}
    >
      {Icon && (
        <span
          className={classMap.chip_icon}
          aria-hidden="true"
          data-testid="icon"
        >
          <Icon className={classMap.icon} />
        </span>
      )}
      <span className={classMap.chip_message} id={`${testId}-message`}>
        {message}
      </span>

      <IconButtonComponent
        icon={CloseIcon}
        size="small"
        theme="clear"
        ariaLabel="Close notification"
        aria-controls={`${testId}-message`}
        className={classMap.chip_close}
        onClick={handleClose}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClose();
          }
        }}
        role="button"
        tabIndex={0}
        data-testid="chip-close"
      />
    </div>,
    portalEl
  );
};

export default ChipBase;
