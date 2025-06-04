import React from "react";
import { MetricBoxProps } from "./MetricBox.types";
import { combineClassNames } from "@/utils/classNames";

export interface BaseMetricBoxProps extends MetricBoxProps {
  classMap: Record<string, string>;
}

const BaseMetricBox: React.FC<BaseMetricBoxProps> = ({
  title,
  value,
  icon: Icon,
  subtext,
  theme = "primary",
  state = "",
  outline = false,
  align = "center",
  size = "medium",
  className = "",
  "data-testid": testId = "metric-box",
  classMap,
}) => {
  const titleId = `${testId}-title`;
  const valueId = `${testId}-value`;
  const subtextId = subtext ? `${testId}-subtext` : undefined;

  return (
    <div
      className={combineClassNames(
        classMap.wrapper,
        outline && classMap.outline,
        classMap[theme],
        classMap[state],
        classMap[size],
        classMap[align],
        className
      )}
      role="region"
      aria-labelledby={titleId}
      aria-describedby={subtextId}
      data-testid={testId}
    >
      {Icon && (
        <div className={classMap.icon} data-testid={`${testId}-icon`}>
          <Icon aria-hidden="true" focusable="false" />
        </div>
      )}

      <div className={classMap.content}>
        <h3
          id={titleId}
          className={classMap.title}
          data-testid={`${testId}-title`}
        >
          {title}
        </h3>

        <div
          id={valueId}
          className={classMap.value}
          data-testid={`${testId}-value`}
          aria-label={`${value} ${title}`}
        >
          {value}
        </div>

        {subtext && (
          <div
            id={subtextId}
            className={classMap.subtext}
            data-testid={`${testId}-subtext`}
          >
            {subtext}
          </div>
        )}
      </div>
    </div>
  );
};

export default BaseMetricBox;
