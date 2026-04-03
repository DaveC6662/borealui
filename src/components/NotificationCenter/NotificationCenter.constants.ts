import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";
import { IconType } from "react-icons";
import { NotificationType } from "@/types/types";

/**
 * A mapping from notification types to their associated icon components.
 */
export const themeIcons: Record<NotificationType, IconType> = {
  general: FaInfoCircle,
  success: FaCheckCircle,
  error: FaExclamationCircle,
  warning: FaExclamationCircle,
  info: FaInfoCircle,
};
