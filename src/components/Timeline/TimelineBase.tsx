import React, { useMemo } from "react";
import { TimelineProps } from "./Timeline.types";
import { combineClassNames } from "@/utils/classNames";
import { capitalize } from "@/utils/capitalize";

const TimelineBase: React.FC<
  TimelineProps & { classMap: Record<string, string> }
> = ({
  items,
  orientation = "vertical",
  theme = "primary",
  rounding = "medium",
  shadow = "light",
  classMap,
  "data-testid": testId = "timeline",
}) => {
  const outerWrapper = useMemo(
    () =>
      combineClassNames(
        classMap.timeline,
        classMap[orientation],
        classMap[theme]
      ),
    [classMap, orientation, theme, shadow, rounding]
  );

  const itemClassName = useMemo(
    () =>
      combineClassNames(classMap.item, classMap[orientation], classMap[theme]),
    [classMap, orientation, theme]
  );

  const markerClassName = useMemo(
    () =>
      combineClassNames(
        classMap.marker,
        classMap[theme],
        classMap[orientation],
        shadow && classMap[`shadow${capitalize(shadow)}`]
      ),
    [classMap, orientation, theme, shadow]
  );

  const contentClassName = useMemo(
    () =>
      combineClassNames(
        classMap.content,
        classMap[orientation],
        shadow && classMap[`shadow${capitalize(shadow)}`],
        rounding && classMap[`round${capitalize(rounding)}`]
      ),
    [classMap, orientation, shadow, rounding]
  );

  return (
    <ul className={outerWrapper} data-testid={testId} aria-label="Timeline">
      {items.map((item, index) => {
        const IconComponent = item.icon;
        const itemTestId = `${testId}-item-${index}`;
        const labelId = `${itemTestId}-title`;

        return (
          <li
            key={index}
            className={itemClassName}
            data-testid={itemTestId}
            aria-labelledby={labelId}
          >
            <div
              className={markerClassName}
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
              className={contentClassName}
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
