import React, { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import {
  NotificationCenterProps,
  themeIcons,
} from "./NotificationCenter.types";

export interface BaseNotificationCenterProps extends NotificationCenterProps {
  Button: React.ComponentType<any>;
  IconButton: React.ComponentType<any>;
  classNames: {
    wrapper: string;
    header: string;
    list: string;
    notification: string;
    icon: string;
    content: string;
    message: string;
    timestamp: string;
    close: string;
    clearAll: string;
    typeMap: Record<string, string>; // e.g., { success: styles.success, error: styles.error }
  };
}

const BaseNotificationCenter: React.FC<BaseNotificationCenterProps> = ({
  notifications,
  onRemove,
  onClearAll,
  showClearAll = true,
  Button,
  IconButton,
  classNames,
  "data-testid": testId = "notification-center",
}) => {
  const timeouts = useRef<Record<string, NodeJS.Timeout>>({});

  useEffect(() => {
    notifications.forEach((note) => {
      if (note.duration && !timeouts.current[note.id]) {
        timeouts.current[note.id] = setTimeout(() => {
          onRemove(note.id);
          delete timeouts.current[note.id];
        }, note.duration);
      }
    });

    return () => {
      Object.values(timeouts.current).forEach(clearTimeout);
    };
  }, [notifications, onRemove]);

  return (
    <div
      className={classNames.wrapper}
      role="region"
      aria-label="Notifications"
      data-testid={testId}
    >
      <div className={classNames.header} data-testid={`${testId}-header`}>
        <h3 id={`${testId}-title`}>Notifications</h3>
        {showClearAll && notifications.length > 0 && onClearAll && (
          <Button
            theme="error"
            size="small"
            className={classNames.clearAll}
            onClick={onClearAll}
            aria-label="Clear all notifications"
            data-testid={`${testId}-clear-all`}
          >
            Clear All
          </Button>
        )}
      </div>
      <div role="status" aria-live="polite">
        <ul className={classNames.list} aria-labelledby={`${testId}-title`}>
          {notifications.map((note, index) => {
            const Icon = themeIcons[note.type || "info"];
            const noteTestId = `${testId}-item-${note.id}`;

            return (
              <li
                key={note.id}
                className={`${classNames.notification} ${classNames.typeMap[note.type || "info"]}`}
                data-testid={noteTestId}
              >
                <Icon className={classNames.icon} aria-hidden="true" />
                <div className={classNames.content}>
                  <span
                    className={classNames.message}
                    data-testid={`${noteTestId}-message`}
                  >
                    {note.message}
                  </span>
                  {note.timestamp && (
                    <span
                      className={classNames.timestamp}
                      data-testid={`${noteTestId}-timestamp`}
                    >
                      {note.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                </div>
                <IconButton
                  className={classNames.close}
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

export default BaseNotificationCenter;
