import React, { JSX } from "react";
import { FooterProps } from "./Footer.types";
import { combineClassNames } from "@/utils/classNames";

export interface BaseFooterProps extends FooterProps {
  IconButton: React.ComponentType<any>;
  ThemeSelect: React.ComponentType<any>;
  classNames: {
    wrapper: string;
    theme: Record<string, string>;
    content: string;
    left: string;
    links: string;
    link: string;
    social: string;
    themeToggle: string;
  };
  LinkWrapper?: (props: {
    href: string;
    children: React.ReactNode;
  }) => JSX.Element;
}

const BaseFooter: React.FC<BaseFooterProps> = ({
  theme = "primary",
  className = "",
  "data-testid": testId = "footer",
  copyright,
  links = [],
  socialLinks = [],
  showThemeSelect = true,
  IconButton,
  ThemeSelect,
  classNames,
  LinkWrapper = ({ href, children }) => <a href={href}>{children}</a>,
}) => {
  return (
    <footer
      className={combineClassNames(
        classNames.wrapper,
        classNames.theme[theme],
        className
      )}
      role="contentinfo"
      aria-label="Footer"
      data-testid={testId}
    >
      <div className={classNames.content}>
        {copyright && (
          <div className={classNames.left} data-testid={`${testId}-copyright`}>
            <p>{copyright}</p>
          </div>
        )}

        {links.length > 0 && (
          <nav
            className={classNames.links}
            aria-label="Footer site links"
            data-testid={`${testId}-nav`}
          >
            <ul>
              {links.map((link, i) => (
                <li key={i}>
                  <LinkWrapper
                    href={link.href}
                    children={
                      <span
                        className={classNames.link}
                        data-testid={`${testId}-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {link.label}
                      </span>
                    }
                  />
                </li>
              ))}
            </ul>
          </nav>
        )}

        {showThemeSelect && (
          <div
            className={classNames.themeToggle}
            data-testid={`${testId}-theme-select`}
            aria-label="Theme selector container"
          >
            <ThemeSelect />
          </div>
        )}

        {socialLinks.length > 0 && (
          <div
            className={classNames.social}
            aria-label="Social media"
            role="navigation"
            data-testid={`${testId}-social`}
          >
            {socialLinks.map((social, index) => (
              <IconButton
                key={index}
                icon={social.icon}
                href={social.href}
                isExternal
                target="_blank"
                rel="noopener noreferrer"
                ariaLabel={social.title}
                title={social.title}
                theme="clear"
                data-testid={`${testId}-social-${social.title
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              />
            ))}
          </div>
        )}
      </div>
    </footer>
  );
};

export default BaseFooter;
