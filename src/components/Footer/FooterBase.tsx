import React, { JSX, useMemo } from "react";
import { FooterProps } from "./Footer.types";
import { combineClassNames } from "../../utils/classNames";
import { getDefaultTheme } from "../../config/boreal-style-config";
import { capitalize } from "@/utils/capitalize";

export interface BaseFooterProps extends FooterProps {
  IconButton: React.ComponentType<any>;
  ThemeSelect: React.ComponentType<any>;
  ImageComponent?: React.ElementType;
  classMap: Record<string, string>;
  LinkWrapper?: (props: {
    href: string;
    children: React.ReactNode;
  }) => JSX.Element;
}

const FooterBase: React.FC<BaseFooterProps> = ({
  theme = getDefaultTheme(),
  attachment = "static",
  shadow = "none",
  rounding = "none",
  className = "",
  "data-testid": testId = "footer",
  copyright,
  links = [],
  logo,
  socialLinks = [],
  showThemeSelect = false,
  IconButton,
  ImageComponent = "img",
  ThemeSelect,
  classMap,
  LinkWrapper = ({ href, children }) => <a href={href}>{children}</a>,
}) => {
  const footerClass = useMemo(
    () =>
      combineClassNames(
        classMap.footer,
        classMap[theme],
        classMap[`shadow${capitalize(shadow)}`],
        classMap[`round${capitalize(rounding)}`],
        classMap[`attachment${capitalize(attachment)}`],
        className
      ),
    [classMap, theme, className]
  );
  return (
    <footer
      className={footerClass}
      role="contentinfo"
      aria-label="Footer"
      data-testid={testId}
    >
      <div className={classMap.content}>
        <div className={classMap.left} data-testid={`${testId}-left`}>
          {logo &&
          (typeof logo === "string" ||
            (typeof logo === "object" && "src" in logo)) ? (
            <ImageComponent
              className={classMap.logo}
              aria-label="Logo"
              role="img"
              data-testid={`${testId}-logo`}
              loading="lazy"
              src={logo}
              alt="Logo"
              height={20}
              width={20}
            />
          ) : (
            <span
              className={classMap.logo}
              aria-label="Logo"
              role="img"
              data-testid={`${testId}-logo`}
            >
              {logo}
            </span>
          )}

          {copyright && (
            <div className={classMap.left} data-testid={`${testId}-copyright`}>
              <p>{copyright}</p>
            </div>
          )}
        </div>

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
            <ThemeSelect theme={"clear"} shadow={"none"} />
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
                shadow="none"
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
