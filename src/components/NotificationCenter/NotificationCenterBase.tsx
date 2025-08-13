import React, { useEffect, useMemo, useRef } from "react";
import { CloseIcon } from "../../Icons";
import {
  BaseNotificationCenterProps,
  themeIcons,
} from "./NotificationCenter.types";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
} from "../../config/boreal-style-config";

const BaseNotificationCenter: React.FC<BaseNotificationCenterProps> = ({
  notifications,
  onRemove,
  onClearAll,
  fetchNotifications,
  setNotifications,
  maxNotifications = 10,
  clearOldOnOverflow = true,
  pollInterval = 5000,
  showClearAll = true,
  controlRounding = getDefaultRounding(),
  controlShadow = getDefaultShadow(),
  notificationRounding = getDefaultRounding(),
  notificationShadow = getDefaultShadow(),
  Button,
  IconButton,
  classMap,
  "data-testid": testId = "notification-center",
}) => {
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const prevIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (
      maxNotifications &&
      notifications.length > maxNotifications &&
      clearOldOnOverflow &&
      setNotifications
    ) {
      const overflow = notifications.length - maxNotifications;
      setNotifications((prev) => prev.slice(overflow));
    }
  }, [notifications, maxNotifications, clearOldOnOverflow, setNotifications]);

  useEffect(() => {
    if (!fetchNotifications) return;
    let alive = true;

    const load = () => {
      fetchNotifications().catch((err) => {
        console.error("Failed to fetch notifications:", err);
      });
    };

    load();
    const id = setInterval(() => alive && load(), pollInterval);
    return () => {
      clearInterval(id);
      alive = false;
    };
  }, [fetchNotifications, pollInterval]);

  useEffect(() => {
    const currentIds = new Set<string>(notifications.map((n) => n.id));

    for (const n of notifications) {
      if (n.duration && !timers.current[n.id]) {
        timers.current[n.id] = setTimeout(() => {
          onRemove(n.id);
          delete timers.current[n.id];
        }, n.duration);
      }
    }

    for (const oldId of prevIds.current) {
      if (!currentIds.has(oldId) && timers.current[oldId]) {
        clearTimeout(timers.current[oldId]);
        delete timers.current[oldId];
      }
    }

    prevIds.current = currentIds;

    return () => {
      if (prevIds.current === currentIds) {
        Object.values(timers.current).forEach(clearTimeout);
        timers.current = {};
      }
    };
  }, [notifications, onRemove]);

  const notificationClass = useMemo(
    () =>
      combineClassNames(
        classMap.notification,
        notificationShadow &&
          classMap[`shadow${capitalize(notificationShadow)}`],
        notificationRounding &&
          classMap[`round${capitalize(notificationRounding)}`]
      ),
    [classMap, notificationShadow, notificationRounding]
  );

  return (
    <div
      className={classMap.wrapper}
      role="region"
      aria-label="Notification center"
      data-testid={testId}
    >
      <div className={classMap.header} data-testid={`${testId}-header`}>
        <h3 id={`${testId}-title`}>Notifications</h3>

        {showClearAll && notifications.length > 0 && onClearAll && (
          <Button
            state="error"
            size="small"
            rounding={controlRounding}
            shadow={controlShadow}
            className={classMap.clearAll}
            onClick={onClearAll}
            aria-label="Clear all notifications"
            data-testid={`${testId}-clear-all`}
            type="button"
          >
            Clear All
          </Button>
        )}
      </div>

      <div role="status" aria-live="polite" aria-relevant="additions text">
        <ul className={classMap.list} aria-labelledby={`${testId}-title`}>
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
                className={combineClassNames(
                  notificationClass,
                  classMap[note.type || "info"]
                )}
                data-testid={noteTestId}
              >
                <Icon
                  className={classMap.icon}
                  aria-hidden="true"
                  focusable={false}
                />
                <div className={classMap.content}>
                  <span
                    className={classMap.message}
                    data-testid={`${noteTestId}-message`}
                  >
                    {note.message}
                  </span>
                  {note.timestamp && (
                    <span
                      className={classMap.timestamp}
                      data-testid={`${noteTestId}-timestamp`}
                    >
                      {timestampStr}
                    </span>
                  )}
                </div>
                <IconButton
                  className={classMap.close}
                  state="error"
                  size="small"
                  outline
                  icon={CloseIcon}
                  onClick={() => onRemove(note.id)}
                  ariaLabel={`Dismiss notification ${index + 1}`}
                  title="Dismiss"
                  data-testid={`${noteTestId}-dismiss`}
                  type="button"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

BaseNotificationCenter.displayName = "BaseNotificationCenter";
export default BaseNotificationCenter;
