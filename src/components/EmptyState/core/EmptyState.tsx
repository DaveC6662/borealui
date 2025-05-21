import React from "react";
import BaseEmptyState from "../EmptyStateBase";
import { EmptyStateProps } from "../EmptyState.types";
import { Button } from "../../../index.core";
import "./EmptyState.scss";

const classes = {
  empty_state: "empty_state",
  title: "empty_state_title",
  message: "empty_state_message",
  icon: "empty_state_icon",
  outline: "empty_state_outline",
  disabled: "empty_state_disabled",
  primary: "empty_state_primary",
  secondary: "empty_state_secondary",
  success: "empty_state_success",
  error: "empty_state_error",
  warning: "empty_state_warning",
  clear: "empty_state_clear",
  small: "empty_state_small",
  medium: "empty_state_medium",
  large: "empty_state_large",
  xs: "empty_state_xs",
  xl: "empty_state_xl",
};

const EmptyState: React.FC<EmptyStateProps> = (props) => {
  return <BaseEmptyState {...props} Button={Button} classMap={classes} />;
};

export default EmptyState;
