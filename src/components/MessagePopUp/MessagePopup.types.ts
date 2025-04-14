/**
 * Props for the MessagePopup component.
 */
export interface MessagePopupProps {
  /** Message text to be displayed within the popup dialog. */
  message: string;
  /** Callback function to execute when the popup is closed. */
  onClose: () => void;
  /** Optional callback when the user confirms the message. */
  onConfirm?: () => void;
  /** Optional callback when the user cancels the action. */
  onCancel?: () => void;
  /** Optional text for the confirm button (default: "Confirm"). */
  confirmText?: string;
  /** Optional text for the cancel button (default: "Cancel"). */
  cancelText?: string;
  /** Optional additional class names for custom styling. */
  className?: string;
  /** Optional test ID for targeting the component during testing. */
  "data-testid"?: string;
}