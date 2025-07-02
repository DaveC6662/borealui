import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";
import { IconType } from "react-icons";
import { NotificationType, RoundingType, ShadowType } from "@/types/types";

/**
 * Represents an individual notification to be displayed in the NotificationCenter.
 */
export interface Notification {
  /** Unique identifier for the notification. */
  id: string;
  /** The message text of the notification. */
  message: string;
  /** The type of notification, used for styling and icon selection. */
  type?: NotificationType;
  /** Optional timestamp indicating when the notification was created. */
  timestamp?: Date;
  /** Optional duration (in milliseconds) after which the notification is automatically removed. */
  duration?: number;
}

/**
 * Props for the NotificationCenter component.
 */
export interface NotificationCenterProps {
  /** Array of notifications to display. */
  notifications: Notification[];
  /** Callback function to set the notifications array. */
  setNotifications?: React.Dispatch<React.SetStateAction<Notification[]>>;
  /** Callback function to remove a notification by its ID. */
  onRemove: (id: string) => void;
  /** Optional callback function to clear all notifications. */
  onClearAll?: () => void;
  /** Optional callback function to fetch more notifications. */
  fetchNotifications?: () => Promise<Notification[]>;
  /** Optional interval (in milliseconds) at which to fetch more notifications. */
  pollInterval?: number;
  /** Whether to show a "Clear All" button if notifications are present. */
  showClearAll?: boolean;
  /** Maximum number of notifications to display. */
  maxNotifications?: number;
  /** Clears old notifications is over max */
  clearOldOnOverflow?: boolean;
  /** Rounding for the notification control */
  controlRounding?: RoundingType;
  /** Shadow for the notification control */
  controlShadow?: ShadowType;
  /** Rounding of the notification */
  notificationRounding?: RoundingType;
  /** Shadow of the notification */
  notificationShadow?: ShadowType;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

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
