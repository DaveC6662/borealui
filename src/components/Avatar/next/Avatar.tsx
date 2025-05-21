"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AvatarProps } from "../Avatar.types";
import { AvatarBase } from "../AvatarBase";
import styles from "./Avatar.module.scss";

const Avatar: React.FC<AvatarProps> = (props) => (
  <AvatarBase
    {...props}
    ImageComponent={Image}
    LinkComponent={Link}
    classMap={styles}
  />
);

export default Avatar;
