import React, { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import Button from "../../Buttons/Button/core/Button";
import IconButton from "../../Buttons/IconButton/core/IconButton";
import "./NotificationCenter.scss";
import { NotificationCenterProps, themeIcons } from "../NotificationCenter.types";

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
  const timeouts = useRef<Record<string, NodeJS.Timeout>>({});

  useEffect(() => {
    const currentTimeouts = timeouts.current;

    notifications.forEach((note) => {
      if (note.duration && !currentTimeouts[note.id]) {
        currentTimeouts[note.id] = setTimeout(() => {
          onRemove(note.id);
          delete currentTimeouts[note.id];
        }, note.duration);
      }
    });

    return () => {
      Object.values(currentTimeouts).forEach(clearTimeout);
    };
  }, [notifications, onRemove]);

  return (
    <div
      className={"notificationCenter"}
      role="region"
      aria-label="Notifications"
      data-testid={testId}
    >
      <div className={"header"} data-testid={`${testId}-header`}>
        <h3 id={`${testId}-title`}>Notifications</h3>
        {showClearAll && notifications.length > 0 && (
          <Button
            theme="error"
            size="small"
            className={"clearAll"}
            onClick={onClearAll}
            aria-label="Clear all notifications"
            data-testid={`${testId}-clear-all`}
          >
            Clear All
          </Button>
        )}
      </div>

      <div role="status" aria-live="polite">
        <ul className={"list"} aria-labelledby={`${testId}-title`}>
          {notifications.map((note, index) => {
            const Icon = themeIcons[note.type || "info"];
            const noteTestId = `${testId}-item-${note.id}`;

            return (
              <li
                key={note.id}
                className={`${"notification"} ${note.type || "info"}`}
                data-testid={noteTestId}
              >
                <Icon className={"icon"} aria-hidden="true" />
                <div className={"content"}>
                  <span className={"message"} data-testid={`${noteTestId}-message`}>
                    {note.message}
                  </span>
                  {note.timestamp && (
                    <span className={"timestamp"} data-testid={`${noteTestId}-timestamp`}>
                      {note.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                </div>
                <IconButton
                  className={"close"}
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
