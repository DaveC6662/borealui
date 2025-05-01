import { useCallback, useEffect, useState, KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { ChipProps } from "./Chip.types";
import { combineClassNames } from "@/utils/classNames";

export interface ChipBaseProps extends ChipProps {
  classMap: Record<string, string>;
  IconButtonComponent: React.ElementType;
  closeIcon?: React.ElementType;
}

export const CloseIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24">
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
);

const ChipBase: React.FC<ChipBaseProps> = ({
  id,
  message,
  visible,
  onClose,
  icon: Icon,
  size = "medium",
  theme = "primary",
  position = "topCenter",
  usePortal = true,
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
    usePortal && classMap.chip_fixed,
    className
  );

  const portalEl =
    typeof window !== "undefined"
      ? document.getElementById("widget-portal")
      : null;

  const chipElement = (
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
        size={size}
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
    </div>
  );

  if (usePortal && portalEl) {
    return createPortal(chipElement, portalEl);
  }

  return chipElement;
};

export default ChipBase;
