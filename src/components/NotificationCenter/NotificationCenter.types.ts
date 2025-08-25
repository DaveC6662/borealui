import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";
import { IconType } from "react-icons";
import { NotificationType, RoundingType, ShadowType } from "@/types/types";
import { ButtonProps } from "../Button/Button.types";
import { IconButtonProps } from "../IconButton/IconButton.types";

/**
 * Represents an individual notification to be displayed in the NotificationCenter.
 */
export interface Notification {
  /** Unique identifier for the notification. */
  id: string;
  /** The message text of the notification. */
  message: string;
  /**
   * The type of notification, used for styling and icon selection.
   * One of: "general" | "success" | "error" | "warning" | "info"
   */
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
  /** If true, clears the oldest notifications when over the maximum. */
  clearOldOnOverflow?: boolean;
  /**
   * Rounding for the notification control.
   * One of: "none" | "small" | "medium" | "large" | "full"
   */
  controlRounding?: RoundingType;
  /**
   * Shadow for the notification control.
   * One of: "none" | "light" | "medium" | "strong" | "intense"
   */
  controlShadow?: ShadowType;
  /**
   * Rounding of the notification.
   * One of: "none" | "small" | "medium" | "large" | "full"
   */
  notificationRounding?: RoundingType;
  /**
   * Shadow of the notification.
   * One of: "none" | "light" | "medium" | "strong" | "intense"
   */
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

export interface BaseNotificationCenterProps extends NotificationCenterProps {
  Button: React.ComponentType<ButtonProps>;
  IconButton: React.ComponentType<IconButtonProps>;
  classMap: Record<string, string>;
}
