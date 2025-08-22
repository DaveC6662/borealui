import React, { useMemo } from "react";
import { TimelineProps } from "./Timeline.types";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultTheme,
} from "../../config/boreal-style-config";

const TimelineBase: React.FC<
  TimelineProps & { classMap: Record<string, string> }
> = ({
  items,
  orientation = "vertical",
  theme = getDefaultTheme(),
  rounding = getDefaultRounding(),
  shadow = getDefaultShadow(),
  classMap,
  className,
  "data-testid": testId = "timeline",
}) => {
  const outerWrapper = useMemo(
    () =>
      combineClassNames(
        classMap.timeline,
        classMap[orientation],
        classMap[theme],
        className
      ),
    [classMap, orientation, theme, className]
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
    [classMap, theme, orientation, shadow]
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

  const setSize = items.length;

  return (
    <ul className={outerWrapper} data-testid={testId} aria-label="Timeline">
      {items.map((item, index) => {
        const IconComponent = item.icon;
        const itemTestId = `${testId}-item-${index}`;
        const labelId = `${itemTestId}-title`;
        const hasTitle = Boolean(item.title);

        let dateTimeAttr: string | undefined;
        if (item.date) {
          const dateObj = new Date(item.date);
          if (!isNaN(dateObj.getTime())) {
            dateTimeAttr = dateObj.toISOString();
          }
        }

        return (
          <li
            key={index}
            className={itemClassName}
            data-testid={itemTestId}
            aria-labelledby={hasTitle ? labelId : undefined}
            aria-label={!hasTitle ? `Timeline item ${index + 1}` : undefined}
            aria-posinset={index + 1}
            aria-setsize={setSize}
          >
            <div
              className={markerClassName}
              data-testid={`${itemTestId}-marker`}
              aria-hidden={true}
            >
              {IconComponent ? (
                <div
                  className={classMap.icon}
                  data-testid={`${itemTestId}-icon`}
                  aria-hidden={true}
                >
                  <IconComponent aria-hidden="true" />
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
              {hasTitle && (
                <h3 id={labelId} className={classMap.title}>
                  {item.title}
                </h3>
              )}

              {item.date && (
                <p className={classMap.date} data-testid={`${itemTestId}-date`}>
                  <time dateTime={dateTimeAttr}>{item.date}</time>
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

TimelineBase.displayName = "TimelineBase";
export default TimelineBase;
