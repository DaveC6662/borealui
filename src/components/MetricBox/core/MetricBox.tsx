import React from "react";
import BaseMetricBox from "../MetricBoxBase";
import "./MetricBox.scss";
import { MetricBoxProps } from "../MetricBox.types";

const MetricBox: React.FC<MetricBoxProps> = (props) => {
  return (
    <BaseMetricBox
      {...props}
      classNames={{
        wrapper: "metricBox",
        themeMap: {
          primary: "primary",
          secondary: "secondary",
          success: "success",
          error: "error",
          warning: "warning",
        },
        sizeMap: {
          small: "small",
          medium: "medium",
          large: "large",
        },
        alignMap: {
          left: "left",
          center: "center",
          right: "right",
        },
        icon: "icon",
        content: "content",
        title: "title",
        value: "value",
        subtext: "subtext",
      }}
    />
  );
};

export default MetricBox;
