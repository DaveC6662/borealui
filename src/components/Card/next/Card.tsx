"use client";

import React from "react";
import Image from "next/image";
import { Button, IconButton, Skeleton } from "@/index.next";
import styles from "./Card.module.scss";
import CardBase from "../CardBase";
import { CardProps } from "../Card.types";

const NextImageWrapper: React.FC<React.ComponentProps<typeof Image>> = (
  props
) => {
  return <Image {...props} />;
};

const Card: React.FC<CardProps> = (props) => {
  const wrappedButtons = (props.actionButtons ?? []).map((b) => ({
    ...b,
    buttonComponent: Button,
    iconButtonComponent: IconButton,
  }));

  return (
    <CardBase
      {...props}
      actionButtons={wrappedButtons}
      classMap={styles}
      SkeletonComponent={Skeleton}
      ImageComponent={NextImageWrapper}
    />
  );
};

export default Card;
