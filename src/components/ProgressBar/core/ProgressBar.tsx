import React from "react";
import BaseProgressBar from "../ProgressBarBase";
import "./Progressbar.scss";
import { ProgressBarProps } from "../ProgressBar.types";

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  return (
    <BaseProgressBar
      {...props}
      classNames={{
        container: "progressContainer",
        bar: "progressBar",
        themeMap: {
          primary: "primary",
          secondary: "secondary",
          success: "success",
          error: "error",
          warning: "warning",
          info: "info",
        },
        sizeMap: {
          small: "small",
          medium: "medium",
          large: "large",
        },
        animated: "animated",
        indeterminate: "indeterminate",
      }}
    />
  );
};

export default ProgressBar;
