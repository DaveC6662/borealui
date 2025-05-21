import React from "react";
import "./Timeline.scss";
import TimelineBase from "../TimelineBase";
import { TimelineProps } from "../Timeline.types";

const classes = {
  timeline: "timeline",
  item: "timeline_item",
  marker: "timeline_marker",
  icon: "timeline_icon",
  dot: "timeline_dot",
  content: "timeline_content",
  title: "timeline_title",
  date: "timeline_date",
  description: "timeline_description",
  vertical: "timeline_vertical",
  horizontal: "timeline_horizontal",
  primary: "timeline_primary",
  secondary: "timeline_secondary",
  success: "timeline_success",
  error: "timeline_error",
  warning: "timeline_warning",
  clear: "timeline_clear",
};

const Timeline: React.FC<TimelineProps> = (props) => {
  return <TimelineBase {...props} classMap={classes} />;
};

export default Timeline;
