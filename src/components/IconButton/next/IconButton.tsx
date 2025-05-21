"use client";

import React from "react";
import Link from "next/link";
import styles from "./IconButton.module.scss";
import IconButtonBase from "../IconButtonBase";
import { IconButtonProps } from "../IconButton.types";

const IconButton: React.FC<IconButtonProps> = (props) => (
  <IconButtonBase {...props} classMap={styles} LinkComponent={Link} />
);

export default IconButton;
