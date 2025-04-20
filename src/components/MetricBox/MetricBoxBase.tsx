import React from "react";
import { MetricBoxProps } from "./MetricBox.types";
import { combineClassNames } from "@/utils/classNames";

export interface BaseMetricBoxProps extends MetricBoxProps {
  classNames: {
    wrapper: string;
    themeMap: Record<string, string>;
    sizeMap: Record<string, string>;
    alignMap: Record<string, string>;
    icon: string;
    content: string;
    title: string;
    value: string;
    subtext: string;
  };
}

const BaseMetricBox: React.FC<BaseMetricBoxProps> = ({
  title,
  value,
  icon: Icon,
  subtext,
  theme = "primary",
  align = "center",
  size = "medium",
  className = "",
  "data-testid": testId = "metric-box",
  classNames,
}) => {
  const titleId = `${testId}-title`;
  const valueId = `${testId}-value`;

  return (
    <div
      className={combineClassNames(
        classNames.wrapper,
        classNames.themeMap[theme],
        classNames.sizeMap[size],
        classNames.alignMap[align],
        className
      )}
      role="region"
      aria-labelledby={titleId}
      data-testid={testId}
    >
      {Icon && (
        <div className={classNames.icon} data-testid={`${testId}-icon`}>
          <Icon aria-hidden="true" focusable="false" />
        </div>
      )}
      <div className={classNames.content}>
        <div
          id={titleId}
          className={classNames.title}
          data-testid={`${testId}-title`}
        >
          {title}
        </div>
        <div
          id={valueId}
          className={classNames.value}
          data-testid={`${testId}-value`}
        >
          {value}
        </div>
        {subtext && (
          <div className={classNames.subtext} data-testid={`${testId}-subtext`}>
            {subtext}
          </div>
        )}
      </div>
    </div>
  );
};

export default BaseMetricBox;
