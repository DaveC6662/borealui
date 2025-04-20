"use client";

import React from "react";
import Link from "next/link";
import styles from "./Button.module.scss";
import ButtonBase from "../ButtonBase";
import { ButtonProps } from "../Button.types";

const Button: React.FC<ButtonProps> = (props) => (
  <ButtonBase {...props} classMap={styles} LinkComponent={Link} />
);

export default Button;
