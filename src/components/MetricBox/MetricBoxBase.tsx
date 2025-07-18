import React, { useMemo } from "react";
import { MetricBoxProps } from "./MetricBox.types";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultSize,
  getDefaultTheme,
} from "../../config/boreal-style-config";

export interface BaseMetricBoxProps extends MetricBoxProps {
  classMap: Record<string, string>;
}

const BaseMetricBox: React.FC<BaseMetricBoxProps> = ({
  title,
  value,
  icon: Icon,
  subtext,
  theme = getDefaultTheme(),
  shadow = getDefaultShadow(),
  rounding = getDefaultRounding(),
  state = "",
  outline = false,
  align = "center",
  size = getDefaultSize(),
  className = "",
  "data-testid": testId = "metric-box",
  classMap,
}) => {
  const titleId = `${testId}-title`;
  const valueId = `${testId}-value`;
  const subtextId = subtext ? `${testId}-subtext` : undefined;

  const wrapperClass = useMemo(
    () =>
      combineClassNames(
        classMap.wrapper,
        outline && classMap.outline,
        classMap[theme],
        classMap[state],
        classMap[size],
        classMap[align],
        shadow && classMap[`shadow${capitalize(shadow)}`],
        rounding && classMap[`round${capitalize(rounding)}`],
        className
      ),
    [classMap, theme, state, size, align, outline, shadow, rounding, className]
  );

  return (
    <div
      className={wrapperClass}
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
