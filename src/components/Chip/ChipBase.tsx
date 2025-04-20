import React, { useCallback, useEffect, useState } from "react";
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
    setTimeout(() => onClose?.(), 300); // CSS fade duration
  }, [onClose]);

  useEffect(() => {
    if (autoClose && visible) {
      const timer = setTimeout(() => handleClose(), duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, visible, handleClose]);

  if (!visible && !closing) return null;

  const classNames = combineClassNames(
    classMap.chip,
    classMap[theme],
    classMap[size],
    classMap[position],
    closing && classMap.fadeOut,
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
      className={classNames}
      role="status"
      aria-live="polite"
      data-testid={testId}
    >
      {Icon && (
        <span
          className={classMap.chipIcon}
          aria-hidden="true"
          data-testid="icon"
        >
          <Icon className={classMap.icon} />
        </span>
      )}
      <span className={classMap.chipMessage}>{message}</span>
      <IconButtonComponent
        icon={CloseIcon}
        size="small"
        theme="clear"
        ariaLabel="Close chip"
        className={classMap.chipClose}
        onClick={handleClose}
        data-testid="chip-close"
      />
    </div>,
    portalEl
  );
};

export default ChipBase;
