"use client";

import React, { useEffect, useRef } from "react";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from "react-icons/fa";
import { IconType } from "react-icons";
import { Button, IconButton } from "@/index";
import styles from "./NotificationCenter.module.scss";
import { NotificationType } from "@/types/types";

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
interface NotificationCenterProps {
  /** Array of notifications to display. */
  notifications: Notification[];
  /** Callback function to remove a notification by its ID. */
  onRemove: (id: string) => void;
  /** Optional callback function to clear all notifications. */
  onClearAll?: () => void;
  /** Whether to show a "Clear All" button if notifications are present. */
  showClearAll?: boolean;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

/**
 * A mapping from notification types to their associated icon components.
 */
const themeIcons: Record<NotificationType, IconType> = {
  general: FaInfoCircle,
  success: FaCheckCircle,
  error: FaExclamationCircle,
  warning: FaExclamationCircle,
  info: FaInfoCircle,
};

/**
 * NotificationCenter displays a list of notifications with support for auto-dismissal,
 * manual dismissal, and a "clear all" action. It uses ARIA roles and live regions
 * to improve accessibility, ensuring users are notified of updates.
 *
 * @param {NotificationCenterProps} props - Props for configuring the NotificationCenter.
 * @returns {JSX.Element} A region displaying notifications.
 */
const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onRemove,
  onClearAll,
  showClearAll = true,
  "data-testid": testId = "notification-center",
}) => {
  // Store timeout IDs for each notification to support auto-dismissal.
  const timeouts = useRef<Record<string, NodeJS.Timeout>>({});

  // Set up or clear timeouts when notifications change.
  useEffect(() => {
    const currentTimeouts = timeouts.current;

    notifications.forEach((note) => {
      // If the notification has a duration and no timeout is set yet,
      // create a timeout to remove it after the specified duration.
      if (note.duration && !currentTimeouts[note.id]) {
        currentTimeouts[note.id] = setTimeout(() => {
          onRemove(note.id);
          delete currentTimeouts[note.id];
        }, note.duration);
      }
    });

    // Clean up all pending timeouts on component unmount.
    return () => {
      Object.values(currentTimeouts).forEach(clearTimeout);
    };
  }, [notifications, onRemove]);

  return (
    <div
      className={styles.notificationCenter}
      role="region"
      aria-label="Notifications"
      data-testid={testId}
    >
      <div className={styles.header} data-testid={`${testId}-header`}>
        <h3 id={`${testId}-title`}>Notifications</h3>
  
        {showClearAll && notifications.length > 0 && (
          <Button
            theme="error"
            size="small"
            className={styles.clearAll}
            onClick={onClearAll}
            aria-label="Clear all notifications"
            data-testid={`${testId}-clear-all`}
          >
            Clear All
          </Button>
        )}
      </div>
      <div role="status" aria-live="polite">
        <ul className={styles.list} aria-labelledby={`${testId}-title`}>
          {notifications.map((note, index) => {
            // Determine the icon for the current notification. If no type is provided,
            // default to the "info" icon.
            const Icon = themeIcons[note.type || "info"];
            const noteTestId = `${testId}-item-${note.id}`;
  
            return (
              <li
                key={note.id}
                className={`${styles.notification} ${styles[note.type || "info"]}`}
                data-testid={noteTestId}
              >
                <Icon className={styles.icon} aria-hidden="true" />
                <div className={styles.content}>
                  <span className={styles.message} data-testid={`${noteTestId}-message`}>
                    {note.message}
                  </span>
                  {note.timestamp && (
                    <span className={styles.timestamp} data-testid={`${noteTestId}-timestamp`}>
                      {note.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  )}
                </div>
                <IconButton
                  className={styles.close}
                  theme="error"
                  size="small"
                  outline
                  icon={FaTimes}
                  onClick={() => onRemove(note.id)}
                  aria-label={`Dismiss notification ${index + 1}`}
                  title="Dismiss"
                  data-testid={`${noteTestId}-dismiss`}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default NotificationCenter;
