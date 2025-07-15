import { RoundingType, ShadowType } from "@/types/types";
import { ReactElement } from "react";

/**
 * Props for the Modal component.
 */
export interface ModalProps {
  /** Additional class names for custom styling the modal content. */
  className?: string;
  /** The content to be rendered inside the modal. Expected to be a single React element. */
  children?: ReactElement;
  /**
   * Rounding of the modal corners.
   * One of: "none" | "small" | "medium" | "large" | "full"
   */
  rounding?: RoundingType;
  /**
   * Shadow of the modal.
   * One of: "none" | "light" | "medium" | "strong" | "intense"
   */
  shadow?: ShadowType;
  /** Callback function fired when the modal is closed. */
  onClose: () => void;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}
