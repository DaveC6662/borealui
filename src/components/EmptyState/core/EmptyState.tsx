import React from "react";
import BaseEmptyState from "../EmptyStateBase";
import { EmptyStateProps } from "../EmptyState.types";
import Button from "../../Buttons/Button/core/Button";
import "./EmptyState.scss";

const EmptyState: React.FC<EmptyStateProps> = (props) => {
  return (
    <BaseEmptyState
      {...props}
      Button={Button}
      classNames={{
        wrapper: "emptyState",
        title: "title",
        message: "message",
        icon: "icon",
        outline: "outline",
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
      }}
    />
  );
};

export default EmptyState;
