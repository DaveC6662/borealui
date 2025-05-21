import React from "react";
import { TimelineProps } from "./Timeline.types";

const TimelineBase: React.FC<
  TimelineProps & { classMap: Record<string, string> }
> = ({
  items,
  orientation = "vertical",
  theme = "primary",
  classMap,
  "data-testid": testId = "timeline",
}) => {
  return (
    <ul
      className={`${classMap.timeline} ${classMap[orientation]} ${classMap[theme]}`}
      data-testid={testId}
      aria-label="Timeline"
    >
      {items.map((item, index) => {
        const IconComponent = item.icon;
        const itemTestId = `${testId}-item-${index}`;
        const labelId = `${itemTestId}-title`;

        return (
          <li
            key={index}
            className={`${classMap.item} ${classMap[orientation]} ${classMap[theme]}`}
            data-testid={itemTestId}
            aria-labelledby={labelId}
          >
            <div
              className={`${classMap.marker} ${classMap[theme]} ${classMap[orientation]}`}
              data-testid={`${itemTestId}-marker`}
              aria-hidden={IconComponent ? "true" : undefined}
            >
              {IconComponent ? (
                <div
                  className={classMap.icon}
                  data-testid={`${itemTestId}-icon`}
                >
                  <IconComponent />
                </div>
              ) : (
                <div
                  className={classMap.dot}
                  data-testid={`${itemTestId}-dot`}
                  aria-hidden="true"
                />
              )}
            </div>

            <div
              className={`${classMap.content} ${classMap[orientation]}`}
              data-testid={`${itemTestId}-content`}
            >
              <h3 id={labelId} className={classMap.title}>
                {item.title}
              </h3>
              {item.date && (
                <p
                  className={classMap.date}
                  data-testid={`${itemTestId}-date`}
                  aria-label={`Date: ${item.date}`}
                >
                  {item.date}
                </p>
              )}
              {item.description && (
                <p
                  className={classMap.description}
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
