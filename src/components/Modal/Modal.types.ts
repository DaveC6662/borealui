import { ReactElement } from "react";

/**
 * Props for the Modal component.
 */
export interface ModalProps {
  /** Additional class names for custom styling the modal content. */
  className?: string;
  /** The content to be rendered inside the modal. Expected to be a single React element. */
  children?: ReactElement;
  /** Callback function fired when the modal is closed. */
  onClose: () => void;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}
