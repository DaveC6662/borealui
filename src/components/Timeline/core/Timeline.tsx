import React from "react";
import "./Timeline.scss";
import TimelineBase from "../TimelineBase";
import { TimelineProps } from "../Timeline.types";

const styles: Record<string, string> = {
  timeline: "timeline",
  timelineItem: "timelineItem",
  marker: "marker",
  icon: "icon",
  dot: "dot",
  content: "content",
  title: "title",
  date: "date",
  description: "description",

  vertical: "vertical",
  horizontal: "horizontal",

  primary: "primary",
  secondary: "secondary",
  success: "success",
  error: "error",
  warning: "warning",
};

const Timeline: React.FC<TimelineProps> = (props) => {
  return <TimelineBase {...props} styles={styles} />;
};

export default Timeline;
