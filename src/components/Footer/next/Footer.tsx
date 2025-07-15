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
      LinkWrapper={({ href, children }) => (
        <Link href={href} passHref legacyBehavior>
          <a>{children}</a>
        </Link>
      )}
      classMap={styles}
    />
  );
};

export default Footer;
