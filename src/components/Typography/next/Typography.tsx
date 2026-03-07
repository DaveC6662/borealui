"use client";

import { JSX } from "react";
import TypographyBase from "../TypographyBase";
import { TypographyOwnProps } from "../Typography.types";
import { combineClassNames } from "@/utils/classNames";
import styles from "./Typography.module.scss";

export type TypographyProps = TypographyOwnProps;

export default function Typography(props: TypographyProps): JSX.Element {
  return (
    <TypographyBase
      {...props}
      classMap={styles}
      combineClassNames={combineClassNames}
    />
  );
}
