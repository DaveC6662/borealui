import React, { JSX } from "react";
import styles from "./Timeline.module.scss";
import { TimelineProps } from "../Timeline.types";

/**
 * Timeline component displays a series of events in a list-based timeline format.
 * Each event can include a title, description, date, and an optional icon.
 * The timeline supports different orientations (vertical or horizontal) and themes.
 *
 * @component
 * @param {TimelineProps} props - The props for the Timeline component.
 * @returns {JSX.Element} A list-based timeline of events.
 *
 * @example
 * const events = [
 *   { title: "Event 1", description: "Description for event 1", date: "2025-01-01", icon: MyIcon },
 *   { title: "Event 2", description: "Description for event 2", date: "2025-02-01" },
 *   // ... more events
 * ];
 *
 * <Timeline items={events} orientation="vertical" theme="primary" data-testid="timeline" />
 */
const Timeline: React.FC<TimelineProps> = ({
  items,
  orientation = "vertical",
  theme = "primary",
  "data-testid": testId = "timeline",
}: TimelineProps): JSX.Element => {
  return (
    <ul
      className={`${styles.timeline} ${styles[orientation]} ${styles[theme]}`}
      data-testid={testId}
      role="list"
      aria-label="Timeline of events"
    >
      {items.map((item, index) => {
        const IconComponent = item.icon;
        const itemTestId = `${testId}-item-${index}`;

        return (
          <li
            key={index}
            className={`${styles.timelineItem} ${styles[orientation]}`}
            data-testid={itemTestId}
            role="listitem"
            aria-labelledby={`${itemTestId}-title`}
          >
            <div
              className={`${styles.marker} ${styles[orientation]}`}
              aria-hidden={!IconComponent}
              data-testid={`${itemTestId}-marker`}
            >
              {IconComponent ? (
                <div className={styles.icon} data-testid={`${itemTestId}-icon`}>
                  <IconComponent />
                </div>
              ) : (
                <div
                  className={styles.dot}
                  role="presentation"
                  data-testid={`${itemTestId}-dot`}
                />
              )}
            </div>

            <div
              className={`${styles.content} ${styles[orientation]}`}
              aria-label="Timeline event"
              data-testid={`${itemTestId}-content`}
            >
              <h3 id={`${itemTestId}-title`} className={styles.title}>
                {item.title}
              </h3>
              {item.date && (
                <p
                  className={styles.date}
                  data-testid={`${itemTestId}-date`}
                >
                  {item.date}
                </p>
              )}
              {item.description && (
                <p
                  className={styles.description}
                  data-testid={`${itemTestId}-description`}
                >
                  {item.description}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Timeline;
