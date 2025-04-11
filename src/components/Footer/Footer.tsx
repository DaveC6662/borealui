"use client";

import React from "react";
import Link from "next/link";
import { IconButton, ThemeSelect } from "@/index";
import styles from "./Footer.module.scss";
import { ThemeType } from "@/types/types";
import { combineClassNames } from "@/utils/classNames";

/**
 * Represents a navigational link in the footer.
 */
interface FooterLink {
  /** Text label of the link. */
  label: string;
  /** URL the link navigates to. */
  href: string;
}

/**
 * Represents a social media link with an icon and tracking metadata.
 */
interface SocialLink {
  /** Platform name (used for analytics and accessibility). */
  title: string;
  /** Icon to display (React component). */
  icon: React.ComponentType;
  /** URL to open when clicked. */
  href: string;
}

/**
 * Props for the Footer component.
 */
interface FooterProps {
  /** Theme used for styling (e.g., "primary", "secondary"). */
  theme?: ThemeType;
  /** Optional class name for custom styles. */
  className?: string;
  /** Test ID for testing frameworks. */
  "data-testid"?: string;
  /** Optional copyright text. */
  copyright?: string;
  /** Array of footer navigation links. */
  links?: FooterLink[];
  /** Array of social links with icons. */
  socialLinks?: SocialLink[];
  /** Whether to show the theme selector dropdown. */
  showThemeSelect?: boolean;
}

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
}) => {
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
                href={social}
                external
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
