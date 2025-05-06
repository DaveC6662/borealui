import React, { useEffect, useRef } from "react";
import { CloseIcon } from "@/Icons";
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
    typeMap: Record<string, string>;
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
      aria-label="Notification center"
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

      {/* Live region for screen readers */}
      <div role="status" aria-live="polite" aria-relevant="additions text">
        <ul className={classNames.list} aria-labelledby={`${testId}-title`}>
          {notifications.map((note, index) => {
            const Icon = themeIcons[note.type || "info"];
            const noteTestId = `${testId}-item-${note.id}`;
            const timestampStr = note.timestamp?.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <li
                key={note.id}
                className={`${classNames.notification} ${classNames.typeMap[note.type || "info"]}`}
                data-testid={noteTestId}
                aria-label={`Notification ${index + 1}: ${note.message}${timestampStr ? ` at ${timestampStr}` : ""}`}
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
                      {timestampStr}
                    </span>
                  )}
                </div>
                <IconButton
                  className={classNames.close}
                  theme="error"
                  size="small"
                  outline
                  icon={CloseIcon}
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
