import {
  useCallback,
  useEffect,
  useState,
  KeyboardEvent,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import { ChipProps } from "./Chip.types";
import { combineClassNames } from "@/utils/classNames";
import { capitalize } from "@/utils/capitalize";

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
  rounding = "medium",
  shadow = "light",
  state = "",
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
    classMap[theme],
    classMap[state],
    classMap[size],
    classMap[position],
    shadow && classMap[`shadow${capitalize(shadow)}`],
    rounding && classMap[`round${capitalize(rounding)}`],
    closing && classMap.fadeout,
    usePortal && classMap.fixed,
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
        <span className={classMap.icon} aria-hidden="true" data-testid="icon">
          <Icon className={classMap.inner_icon} />
        </span>
      )}
      <span className={classMap.message} id={`${testId}-message`}>
        {message}
      </span>

      <IconButtonComponent
        icon={CloseIcon}
        size={size}
        theme="clear"
        ariaLabel="Close notification"
        aria-controls={`${testId}-message`}
        className={classMap.close}
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
