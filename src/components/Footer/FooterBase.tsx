import React, { useMemo } from "react";
import { BaseFooterProps, LogoSource } from "./Footer.types";
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
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  navAriaLabel = "Footer site links",
  socialNavAriaLabel = "Social media",
  themeSelectAriaLabel = "Theme selector",
  logoAriaLabel = "Logo",
  logoDecorative = false,
  labelId,
  ...rest
}) => {
  const footerClass = useMemo(
    () =>
      combineClassNames(
        classMap.footer,
        classMap[theme],
        shadow !== "none" && classMap[`shadow${capitalize(shadow)}`],
        rounding !== "none" && classMap[`round${capitalize(rounding)}`],
        classMap[`attachment${capitalize(attachment)}`],
        className,
      ),
    [classMap, theme, shadow, rounding, attachment, className],
  );

  const isLogoImage = (
    value: unknown,
  ): value is { src: string; width?: number; height?: number } =>
    typeof value === "object" &&
    value !== null &&
    "src" in (value as Record<string, unknown>);

  const isImgLike = typeof logo === "string" || isLogoImage(logo);

  const imgLogo = isImgLike
    ? typeof logo === "string"
      ? { src: logo }
      : logo
    : undefined;

  const logoSrc = imgLogo?.src;
  const logoW = imgLogo?.width ?? 20;
  const logoH = imgLogo?.height ?? 20;

  return (
    <footer
      className={footerClass}
      data-testid={testId}
      role="contentinfo"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy ?? labelId}
      aria-describedby={ariaDescribedBy}
      {...rest}
    >
      <div className={classMap.content}>
        <div className={classMap.left} data-testid={`${testId}-left`}>
          {isImgLike && logoSrc ? (
            typeof ImageComponent === "string" ? (
              <img
                className={classMap.logo}
                data-testid={`${testId}-logo`}
                loading="lazy"
                src={logoSrc}
                alt={logoDecorative ? "" : logoAriaLabel}
                aria-hidden={logoDecorative ? true : undefined}
                height={logoH}
                width={logoW}
              />
            ) : (
              <ImageComponent
                className={classMap.logo}
                data-testid={`${testId}-logo`}
                src={logoSrc}
                alt={logoDecorative ? "" : logoAriaLabel}
                aria-hidden={logoDecorative ? true : undefined}
                height={logoH}
                width={logoW}
              />
            )
          ) : logo ? (
            <span
              className={classMap.logo}
              role={logoDecorative ? undefined : "img"}
              aria-label={logoDecorative ? undefined : logoAriaLabel}
              aria-hidden={logoDecorative ? true : undefined}
              data-testid={`${testId}-logo`}
            >
              {
                logo as Exclude<
                  LogoSource,
                  string | { src: string; width?: number; height?: number }
                >
              }
            </span>
          ) : null}

          {copyright && (
            <div
              className={classMap.copyright ?? classMap.left}
              data-testid={`${testId}-copyright`}
            >
              <p id={labelId}>{copyright}</p>
            </div>
          )}
        </div>

        {links.length > 0 && (
          <nav
            className={classMap.links}
            aria-label={navAriaLabel}
            data-testid={`${testId}-nav`}
          >
            <ul>
              {links.map((link, i) => {
                const slug = (link.label || link.href || `link-${i}`)
                  .toLowerCase()
                  .replace(/\s+/g, "-");

                if (link.disabled) {
                  return (
                    <li key={`${link.href ?? slug}-${i}`}>
                      <span
                        className={classMap.link}
                        data-testid={`${testId}-link-${slug}`}
                        aria-disabled="true"
                        title={link.title}
                      >
                        {link.label}
                      </span>
                    </li>
                  );
                }

                return (
                  <li key={`${link.href ?? slug}-${i}`}>
                    <LinkWrapper
                      href={link.href}
                      className={classMap.link}
                      data-testid={`${testId}-link-${slug}`}
                      aria-label={link["aria-label"]}
                      aria-current={link["aria-current"]}
                      title={link.title}
                      rel={link.rel}
                      target={link.target}
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
            aria-label={themeSelectAriaLabel}
          >
            <ThemeSelect
              theme="clear"
              shadow="none"
              aria-label={themeSelectAriaLabel}
            />
          </div>
        )}

        {socialLinks.length > 0 && (
          <nav
            className={classMap.social}
            aria-label={socialNavAriaLabel}
            data-testid={`${testId}-social`}
          >
            {socialLinks.map((social, index) => (
              <IconButton
                key={`${social.href ?? social.title}-${index}`}
                icon={social.icon}
                href={social.href}
                isExternal={social.isExternal ?? true}
                shadow="none"
                aria-label={social["aria-label"] ?? social.title}
                title={social.tooltip ?? social.title}
                theme="clear"
                disabled={social.disabled}
                rel={social.rel}
                target={social.target}
                data-testid={`${testId}-social-${social.title
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
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
