"use client";

import React from "react";
import BaseFooter from "../FooterBase";
import { FooterProps } from "../Footer.types";
import { IconButton, ThemeSelect } from "@/index.next";
import Link from "next/link";
import styles from "./Footer.module.scss";

const Footer: React.FC<FooterProps> = (props) => {
  return (
    <BaseFooter
      {...props}
      IconButton={IconButton}
      ThemeSelect={ThemeSelect}
      LinkWrapper={({ href, children }) => (
        <Link href={href} passHref legacyBehavior>
          <a>{children}</a>
        </Link>
      )}
      classNames={{
        wrapper: styles.footerContainer,
        theme: {
          primary: styles.primary,
          secondary: styles.secondary,
        },
        content: styles.footerContent,
        left: styles.footerLeft,
        links: styles.footerLinks,
        link: styles.footerLink,
        social: styles.footerSocial,
        themeToggle: styles.themeToggleContainer,
      }}
    />
  );
};

export default Footer;
