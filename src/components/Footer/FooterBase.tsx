import React, { useMemo } from "react";
import { BaseFooterProps } from "./Footer.types";
import { combineClassNames } from "../../utils/classNames";
import { getDefaultTheme } from "../../config/boreal-style-config";
import { capitalize } from "@/utils/capitalize";

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
  LinkWrapper = ({ href, children, ...rest }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}) => {
  const footerClass = useMemo(
    () =>
      combineClassNames(
        classMap.footer,
        classMap[theme],
        shadow !== "none" && classMap[`shadow${capitalize(shadow)}`],
        rounding !== "none" && classMap[`round${capitalize(rounding)}`],
        classMap[`attachment${capitalize(attachment)}`],
        className
      ),
    [classMap, theme, shadow, rounding, attachment, className]
  );

  const isImgLike =
    typeof logo === "string" ||
    (typeof logo === "object" && logo && "src" in logo);
  const logoSrc = isImgLike
    ? typeof logo === "string"
      ? logo
      : (logo as any).src
    : undefined;
  const logoW = isImgLike ? ((logo as any)?.width ?? 20) : undefined;
  const logoH = isImgLike ? ((logo as any)?.height ?? 20) : undefined;

  return (
    <footer className={footerClass} data-testid={testId}>
      <div className={classMap.content}>
        <div className={classMap.left} data-testid={`${testId}-left`}>
          {isImgLike ? (
            <ImageComponent
              className={classMap.logo}
              data-testid={`${testId}-logo`}
              loading="lazy"
              src={logoSrc}
              alt="Logo"
              height={logoH}
              width={logoW}
            />
          ) : (
            <span
              className={classMap.logo}
              role="img"
              aria-label="Logo"
              data-testid={`${testId}-logo`}
            >
              {logo}
            </span>
          )}

          {copyright && (
            <div
              className={classMap.copyright ?? classMap.left}
              data-testid={`${testId}-copyright`}
            >
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
            <ul>
              {links.map((link, i) => {
                const slug = (link.label || link.href || `link-${i}`)
                  .toLowerCase()
                  .replace(/\s+/g, "-");
                return (
                  <li key={`${link.href ?? slug}-${i}`}>
                    <LinkWrapper
                      href={link.href}
                      className={classMap.link}
                      data-testid={`${testId}-link-${slug}`}
                    >
                      {link.label}
                    </LinkWrapper>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        {showThemeSelect && (
          <div
            className={classMap.themeToggle}
            data-testid={`${testId}-theme-select`}
          >
            <ThemeSelect theme="clear" shadow="none" aria-label="Theme" />
          </div>
        )}

        {socialLinks.length > 0 && (
          <nav
            className={classMap.social}
            aria-label="Social media"
            data-testid={`${testId}-social`}
          >
            {socialLinks.map((social, index) => (
              <IconButton
                key={`${social.href ?? social.title}-${index}`}
                icon={social.icon}
                href={social.href}
                isExternal
                shadow="none"
                ariaLabel={social.title}
                title={social.title}
                theme="clear"
                data-testid={`${testId}-social-${social.title.toLowerCase().replace(/\s+/g, "-")}`}
              />
            ))}
          </nav>
        )}
      </div>
    </footer>
  );
};

FooterBase.displayName = "FooterBase";
export default FooterBase;
