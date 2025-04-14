"use client";

import React, { JSX } from "react";
import Link from "next/link";
import { IconButton, ThemeSelect } from "@/index";
import styles from "./Footer.module.scss";
import { combineClassNames } from "@/utils/classNames";
import { FooterProps } from "./Footer.types";

/**
 * Footer component displays site-wide footer content including
 * navigation links, copyright, social icons, and theme selector.
 *
 * @param {FooterProps} props - Props to customize footer content and layout.
 * @returns {JSX.Element} A semantic footer element.
 */
const Footer: React.FC<FooterProps> = ({
  theme = "primary",
  className = "",
  "data-testid": testId = "footer",
  copyright,
  links = [],
  socialLinks = [],
  showThemeSelect = true,
}: FooterProps): JSX.Element => {
  return (
    <footer
      className={combineClassNames(styles.footerContainer, styles[theme], className)}
      role="contentinfo"
      aria-label="Footer"
      data-testid={testId}
    >
      <div className={styles.footerContent}>
        {copyright && (
          <div className={styles.footerLeft} data-testid={`${testId}-copyright`}>
            <p>{copyright}</p>
          </div>
        )}

        {links.length > 0 && (
          <nav
            className={styles.footerLinks}
            aria-label="Footer Navigation"
            data-testid={`${testId}-nav`}
          >
            {links.map((link, i) => (
              <Link key={i} href={link.href} passHref legacyBehavior>
                <a data-testid={`${testId}-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}>
                  {link.label}
                </a>
              </Link>
            ))}
          </nav>
        )}

        {showThemeSelect && (
          <div className={styles.themeToggleContainer} data-testid={`${testId}-theme-select`}>
            <ThemeSelect />
          </div>
        )}

        {socialLinks.length > 0 && (
          <div
            className={styles.footerSocial}
            aria-label="Social media links"
            data-testid={`${testId}-social`}
          >
            {socialLinks.map((social, index) => (
              <IconButton
                key={index}
                icon={social.icon}
                href={social.href}
                isExternal
                ariaLabel={social.title}
                title={social.title}
                theme={theme}
                data-testid={`${testId}-social-${social.title.toLowerCase().replace(/\s+/g, "-")}`}
              />
            ))}
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
