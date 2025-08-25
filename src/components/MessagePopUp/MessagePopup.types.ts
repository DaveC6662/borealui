import { RoundingType, ShadowType } from "@/types/types";
import { ButtonProps } from "../Button/Button.types";
import { IconButtonProps } from "../IconButton/IconButton.types";

/**
 * Props for the MessagePopup component.
 */
export interface MessagePopUpProps {
  /**
   * Message text to be displayed within the popup dialog.
   */
  message: string;

  /**
   * Callback function to execute when the popup is closed.
   */
  onClose: () => void;

  /**
   * Optional callback when the user confirms the message.
   */
  onConfirm?: () => void;

  /**
   * Optional callback when the user cancels the action.
   */
  onCancel?: () => void;

  /**
   * Optional rounding for controls in the message popup.
   * One of: "none" | "small" | "medium" | "large" | "full"
   */
  controlsRounding?: RoundingType;

  /**
   * Optional rounding for the message popup.
   * One of: "none" | "small" | "medium" | "large" | "full"
   */
  rounding?: RoundingType;

  /**
   * Optional shadow for the message popup.
   * One of: "none" | "light" | "medium" | "strong" | "intense"
   */
  shadow?: ShadowType;

  /**
   * Optional text for the confirm button (default: "Confirm").
   */
  confirmText?: string;

  /**
   * Optional text for the cancel button (default: "Cancel").
   */
  cancelText?: string;

  /**
   * Optional additional class names for custom styling.
   */
  className?: string;

  /**
   * Optional test ID for targeting the component during testing.
   */
  "data-testid"?: string;
}

export type ButtonRef = HTMLButtonElement;
export type IconButtonRef = HTMLButtonElement | HTMLAnchorElement;

export type ButtonComponent = React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<ButtonRef>
>;

export type IconButtonComponent = React.ForwardRefExoticComponent<
  IconButtonProps & React.RefAttributes<IconButtonRef>
>;

export interface BaseMessagePopupProps extends MessagePopUpProps {
  Button: ButtonComponent;
  IconButton: IconButtonComponent;
  classMap: Record<string, string>;
}
