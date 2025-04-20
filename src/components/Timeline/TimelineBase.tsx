import React from "react";
import { TimelineProps } from "./Timeline.types";

/**
 * TimelineBase provides a reusable structure for rendering a themed, accessible timeline.
 * Styling should be passed via the `styles` prop to allow framework-specific implementations.
 */
const TimelineBase: React.FC<
  TimelineProps & { styles: Record<string, string> }
> = ({
  items,
  orientation = "vertical",
  theme = "primary",
  styles,
  "data-testid": testId = "timeline",
}) => {
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
                <p className={styles.date} data-testid={`${itemTestId}-date`}>
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

export default TimelineBase;
