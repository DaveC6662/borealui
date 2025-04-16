import React, { JSX } from "react";
import "./MetricBox.scss";
import { MetricBoxProps } from "../MetricBox.types";
import { combineClassNames } from "../../../utils/classNames";

/**
 * MetricBox is a compact, accessible component for displaying key performance indicators,
 * numbers, or other metrics along with an optional icon and supporting text.
 *
 * @param {MetricBoxProps} props - The props for the MetricBox component.
 * @returns {JSX.Element} A region displaying a metric with a title, value, and optional subtext.
 */
const MetricBox: React.FC<MetricBoxProps> = ({
  title,
  value,
  icon: Icon,
  subtext,
  theme = "primary",
  align = "center",
  size = "medium",
  className = "",
  "data-testid": testId = "metric-box",
}: MetricBoxProps): JSX.Element => {
    
  const titleId = `${testId}-title`;
  const valueId = `${testId}-value`;

  return (
    <div
      className={combineClassNames("metricBox", theme, align, size, className)}
      role="region"
      aria-labelledby={titleId}
      data-testid={testId}
    >
      {Icon && (
        <div className={"icon"} data-testid={`${testId}-icon`}>
          <Icon aria-hidden="true" focusable="false" />
        </div>
      )}
      <div className={"content"}>
        <div id={titleId} className={"title"} data-testid={`${testId}-title`}>
          {title}
        </div>
        <div id={valueId} className={"value"} data-testid={`${testId}-value`}>
          {value}
        </div>
        {subtext && (
          <div className={"subtext"} data-testid={`${testId}-subtext`}>
            {subtext}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricBox;
