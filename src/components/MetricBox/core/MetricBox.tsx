import React from "react";
import BaseMetricBox from "../MetricBoxBase";
import "./MetricBox.scss";
import { MetricBoxProps } from "../MetricBox.types";

const classes = {
  wrapper: "metricBox",
  outline: "metricBox_outline",
  primary: "metricBox_primary",
  secondary: "metricBox_secondary",
  tertiary: "metricBox_tertiary",
  quaternary: "metricBox_quaternary",
  success: "metricBox_success",
  error: "metricBox_error",
  warning: "metricBox_warning",
  clear: "metricBox_clear",
  xs: "metricBox_xs",
  small: "metricBox_small",
  medium: "metricBox_medium",
  large: "metricBox_large",
  xl: "metricBox_xl",
  left: "metricBox_left",
  center: "metricBox_center",
  right: "metricBox_right",
  icon: "metricBox_icon",
  content: "metricBox_content",
  title: "metricBox_title",
  value: "metricBox_value",
  subtext: "metricBox_subtext",
};

const MetricBox: React.FC<MetricBoxProps> = (props) => {
  return <BaseMetricBox {...props} classMap={classes} />;
};

export default MetricBox;
