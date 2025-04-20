import React from "react";
import CircularProgressBase from "../CircularProgressBase";
import "./CircularProgress.scss";
import { CircularProgressProps } from "../CircularProgress.types";

const classMap = {
  circularProgress: "circularProgress",
  circleBorder: "circleBorder",
  innerCircle: "innerCircle",
  ratingText: "ratingText",
  small: "small",
  medium: "medium",
  large: "large",
};

const CircularProgress: React.FC<CircularProgressProps> = (props) => (
  <CircularProgressBase {...props} classMap={classMap} />
);

export default CircularProgress;
