import { useCallback, useEffect, useState, KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { ChipBaseProps } from "./Chip.types";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultSize,
  getDefaultTheme,
} from "../../config/boreal-style-config";

const ChipBase: React.FC<ChipBaseProps> = ({
  id,
  message,
  visible,
  onClose,
  icon: Icon,
  size = getDefaultSize(),
  theme = getDefaultTheme(),
  rounding = getDefaultRounding(),
  shadow = getDefaultShadow(),
  state = "",
  position = "topCenter",
  usePortal = true,
  className = "",
  autoClose = true,
  duration = 3000,
  closeIcon: CloseIcon,
  IconButtonComponent,
  classMap,
  stackIndex,
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

  useEffect(() => {
    if (visible) setClosing(false);
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, handleClose]);

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

  const isAssertive = state === "error" || state === "warning";

  const portalEl =
    typeof window !== "undefined"
      ? document.getElementById("widget-portal")
      : null;

  const chipElement = (
    <div
      key={id}
      className={chipClassName}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-testid={testId}
      style={stackIndex != null ? { zIndex: stackIndex } : undefined}
    >
      {Icon && (
        <span
          className={classMap.icon}
          aria-hidden="true"
          data-testid={`${testId}-icon`}
        >
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
        shadow="none"
        data-testid={`${testId}-chip-close`}
      />
    </div>
  );

  if (usePortal && portalEl) {
    return createPortal(chipElement, portalEl);
  }

  return chipElement;
};

ChipBase.displayName = "ChipBase";
export default ChipBase;
