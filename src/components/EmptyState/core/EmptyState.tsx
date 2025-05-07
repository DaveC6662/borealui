import React from "react";
import BaseEmptyState from "../EmptyStateBase";
import { EmptyStateProps } from "../EmptyState.types";
import { Button } from "../../../index.core";
import "./EmptyState.scss";

const styles = {
  empty_state: "empty-state",
  title: "empty-state_title",
  message: "empty-state_message",
  icon: "empty-state_icon",
  outline: "empty-state_outline",
  disabled: "empty-state_disabled",
  primary: "empty-state_primary",
  secondary: "empty-state_secondary",
  success: "empty-state_success",
  error: "empty-state_error",
  warning: "empty-state_warning",
  clear: "empty-state_clear",
  small: "empty-state_small",
  medium: "empty-state_medium",
  large: "empty-state_large",
  xs: "empty-state_xs",
  xl: "empty-state_xl",
};

const EmptyState: React.FC<EmptyStateProps> = (props) => {
  return <BaseEmptyState {...props} Button={Button} classNames={styles} />;
};

export default EmptyState;
