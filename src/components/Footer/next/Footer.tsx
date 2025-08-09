"use client";

import React from "react";
import FooterBase from "../FooterBase";
import { FooterProps } from "../Footer.types";
import { IconButton, ThemeSelect } from "@/index.next";
import Link from "next/link";
import styles from "./Footer.module.scss";
import Image from "next/image";

const Footer: React.FC<FooterProps> = (props) => {
  return (
    <FooterBase
      {...props}
      IconButton={IconButton}
      ImageComponent={Image}
      ThemeSelect={ThemeSelect}
      LinkWrapper={({ href, children, className, ...rest }) => (
        <Link href={href} className={className} {...rest}>
          {children}
        </Link>
      )}
      classMap={styles}
    />
  );
};

export default Footer;
