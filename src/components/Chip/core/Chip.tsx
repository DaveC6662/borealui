import React, {
  JSX,
  useCallback,
  useEffect,
  useState,
} from "react";
import ReactDOM from "react-dom";
import "./Chip.scss";
import IconButton  from "../../Buttons/IconButton/core/IconButton";
import { FaTimes } from "react-icons/fa";
import { combineClassNames } from "../../../utils/classNames";
import { ChipProps } from "../Chip.types";

/**
 * A floating chip/toast component for showing temporary messages.
 * Supports icons, theming, animations, auto-dismiss, and portal-based rendering.
 *
 * @param {ChipProps} props - Props to configure the chip.
 * @returns {JSX.Element | null} The rendered chip or null if not visible.
 */
const Chip: React.FC<ChipProps> = ({
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
  "data-testid": testId = "chip",
}: ChipProps): JSX.Element | null => {
  const [closing, setClosing] = useState(false);

  /**
   * Handles chip close with a brief fade-out transition.
   */
  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      onClose?.();
    }, 300); // matches CSS fade duration
  }, [onClose]);

  /**
   * Sets up auto-close timer when visible and autoClose is enabled.
   */
  useEffect(() => {
    if (autoClose && visible) {
      const timer = setTimeout(() => handleClose(), duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, visible, handleClose]);

  // Do not render if invisible and not in fade-out transition
  if (!visible && !closing) return null;

  // Combine styles based on props and animation state
  const classNames = combineClassNames(
    "chip",
    theme,
    size,
    position,
    closing && "fadeOut",
    className
  );

  // Portal target (should exist in root DOM with id="widget-portal")
  const portalEl =
    typeof window !== "undefined"
      ? document.getElementById("widget-portal")
      : null;

  if (!portalEl) return null;

  // Render the chip in a portal
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
          className={"chipIcon"}
          aria-hidden="true"
          data-testid="icon"
        >
          <Icon className={"icon"} />
        </span>
      )}
      <span className={"chipMessage"}>{message}</span>
      <IconButton
        icon={FaTimes}
        size="small"
        theme="clear"
        ariaLabel="Close chip"
        className={"chipClose"}
        onClick={handleClose}
        data-testid="chip-close"
      />
    </div>,
    portalEl
  );
};

export default Chip;
