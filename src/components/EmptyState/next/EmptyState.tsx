"use client";

import React from "react";
import BaseEmptyState from "../EmptyStateBase";
import { EmptyStateProps } from "../EmptyState.types";
import { Button } from "../../../index.next";
import styles from "./EmptyState.module.scss";

const EmptyState: React.FC<EmptyStateProps> = (props) => {
  return <BaseEmptyState {...props} Button={Button} classNames={styles} />;
};

export default EmptyState;
