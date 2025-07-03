import React, { JSX } from "react";
import { FooterProps } from "./Footer.types";
import { combineClassNames } from "@/utils/classNames";
import { ThemeType } from "@/types/types";
import { defaultTheme } from "@/config/boreal-style-config";

export interface BaseFooterProps extends FooterProps {
  IconButton: React.ComponentType<any>;
  ThemeSelect: React.ComponentType<any>;
  classMap: Record<string, string>;
  LinkWrapper?: (props: {
    href: string;
    children: React.ReactNode;
  }) => JSX.Element;
}
//TODO add sticky or fixed and shadow props
const FooterBase: React.FC<BaseFooterProps> = ({
  theme = defaultTheme,
  className = "",
  "data-testid": testId = "footer",
  copyright,
  links = [],
  logo,
  socialLinks = [],
  showThemeSelect = false,
  IconButton,
  ThemeSelect,
  classMap,
  LinkWrapper = ({ href, children }) => <a href={href}>{children}</a>,
}) => {
  return (
    <footer
      className={combineClassNames(classMap.footer, classMap[theme], className)}
      role="contentinfo"
      aria-label="Footer"
      data-testid={testId}
    >
      <div className={classMap.content}>
        {logo && (
          <div
            className={classMap.logo}
            aria-label="Logo"
            role="img"
            data-testid={`${testId}-logo`}
          >
            {logo}
          </div>
        )}

        {copyright && (
          <div className={classMap.left} data-testid={`${testId}-copyright`}>
            <p>{copyright}</p>
          </div>
        )}

        {links.length > 0 && (
          <nav
            className={classMap.links}
            aria-label="Footer site links"
            data-testid={`${testId}-nav`}
          >
            <ul role="list">
              {links.map((link, i) => (
                <li key={i}>
                  <LinkWrapper
                    href={link.href}
                    children={
                      <span
                        className={classMap.link}
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
            className={classMap.themeToggle}
            data-testid={`${testId}-theme-select`}
            aria-label="Theme selector container"
          >
            <ThemeSelect theme={"clear"} />
          </div>
        )}

        {socialLinks.length > 0 && (
          <div
            className={classMap.social}
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

export default FooterBase;
