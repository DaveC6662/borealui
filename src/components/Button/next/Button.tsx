"use client";

import { forwardRef } from "react";
import Link from "next/link";
import styles from "./Button.module.scss";
import ButtonBase from "../ButtonBase";
import { ButtonProps } from "../Button.types";

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <ButtonBase {...props} classMap={styles} LinkComponent={Link} ref={ref} />
));

export default Button;
