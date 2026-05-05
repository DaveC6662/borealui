import React, { useMemo } from "react";
import {
  BaseFooterProps,
  FooterLink,
  FooterSection,
  LogoSource,
} from "./Footer.types";
import { combineClassNames } from "../../utils/classNames";
import { getDefaultTheme } from "../../config/boreal-style-config";
import { capitalize } from "@/utils/capitalize";

const slugify = (value: string) =>
  value.toLowerCase().trim().replace(/\s+/g, "-");

const FooterBase: React.FC<BaseFooterProps> = ({
  theme = getDefaultTheme(),
  attachment = "static",
  shadow = "none",
  rounding = "none",
  layout = "inline",
  className = "",
  "data-testid": testId = "footer",

  copyright,
  copyrightInBottom,
  links = [],
  sections,
  logo,
  brandTitle,
  brandDescription,
  brandHref,

  socialLinks = [],
  showThemeSelect = false,
  bottomEnd,

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
        layout !== "inline" && classMap[`layout${capitalize(layout)}`],
        shadow !== "none" && classMap[`shadow${capitalize(shadow)}`],
        rounding !== "none" && classMap[`round${capitalize(rounding)}`],
        classMap[`attachment${capitalize(attachment)}`],
        className,
      ),
    [classMap, theme, layout, shadow, rounding, attachment, className],
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

  const normalizedSections: FooterSection[] =
    sections && sections.length > 0
      ? sections
      : links.length > 0
        ? [
            {
              title: "Links",
              links,
              "aria-label": navAriaLabel,
              testId: "links",
            },
          ]
        : [];

  const shouldRenderCopyrightInBottom =
    copyrightInBottom ?? layout === "columns";

  const renderLogo = () => {
    if (isImgLike && logoSrc) {
      if (typeof ImageComponent === "string") {
        return (
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
        );
      }

      return (
        <ImageComponent
          className={classMap.logo}
          data-testid={`${testId}-logo`}
          src={logoSrc}
          alt={logoDecorative ? "" : logoAriaLabel}
          aria-hidden={logoDecorative ? true : undefined}
          height={logoH}
          width={logoW}
        />
      );
    }

    if (!logo) {
      return null;
    }

    return (
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
    );
  };

  const renderFooterLink = (link: FooterLink, index: number) => {
    const slug = slugify(link.label || link.href || `link-${index}`);
    const key = `${link.href ?? slug}-${index}`;

    if (link.disabled) {
      return (
        <li key={key}>
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
      <li key={key}>
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
  };

  const renderSocialLinks = () => {
    if (socialLinks.length === 0) {
      return null;
    }

    return (
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
            data-testid={`${testId}-social-${slugify(social.title)}`}
          />
        ))}
      </nav>
    );
  };

  const renderThemeSelect = () => {
    if (!showThemeSelect) {
      return null;
    }

    return (
      <div
        className={classMap.themeToggle}
        data-testid={`${testId}-theme-select`}
        aria-label={themeSelectAriaLabel}
      >
        <ThemeSelect
          theme="clear"
          label={brandDescription}
          shadow="none"
          aria-label={themeSelectAriaLabel}
        />
      </div>
    );
  };

  const renderBrand = () => {
    const brandContent = (
      <>
        {renderLogo()}

        {brandTitle && (
          <span
            className={classMap.brandTitle}
            data-testid={`${testId}-brand-title`}
          >
            {brandTitle}
          </span>
        )}
      </>
    );

    return (
      <div className={classMap.brand} data-testid={`${testId}-brand`}>
        {brandHref ? (
          <LinkWrapper
            href={brandHref}
            className={classMap.brandLink}
            aria-label={
              typeof brandTitle === "string" ? brandTitle : logoAriaLabel
            }
          >
            {brandContent}
          </LinkWrapper>
        ) : (
          <div className={classMap.brandLink}>{brandContent}</div>
        )}

        {brandDescription && (
          <p
            className={classMap.brandDescription}
            data-testid={`${testId}-brand-description`}
          >
            {brandDescription}
          </p>
        )}

        {copyright && !shouldRenderCopyrightInBottom && (
          <div
            className={classMap.copyright}
            data-testid={`${testId}-copyright`}
          >
            <p id={labelId}>{copyright}</p>
          </div>
        )}
      </div>
    );
  };

  const renderSections = () => {
    if (normalizedSections.length === 0) {
      return null;
    }

    return (
      <div className={classMap.sections} data-testid={`${testId}-sections`}>
        {normalizedSections.map((section, sectionIndex) => {
          const titleText =
            typeof section.title === "string"
              ? section.title
              : `section-${sectionIndex + 1}`;

          const sectionSlug = section.testId ?? slugify(titleText);

          return (
            <nav
              key={sectionSlug}
              className={classMap.section}
              aria-label={section["aria-label"] ?? `${titleText} links`}
              data-testid={`${testId}-section-${sectionSlug}`}
            >
              <h2 className={classMap.sectionTitle}>{section.title}</h2>

              <ul className={classMap.sectionList}>
                {section.links.map(renderFooterLink)}
              </ul>
            </nav>
          );
        })}
      </div>
    );
  };

  if (layout === "columns") {
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
          {renderBrand()}

          {renderSections()}

          {(socialLinks.length > 0 || showThemeSelect) && (
            <div className={classMap.actions} data-testid={`${testId}-actions`}>
              {socialLinks.length > 0 && (
                <div className={classMap.actionGroup}>
                  <h2 className={classMap.sectionTitle}>Connect</h2>
                  {renderSocialLinks()}
                </div>
              )}

              {renderThemeSelect()}
            </div>
          )}
        </div>

        {(copyright || bottomEnd) && (
          <div className={classMap.bottom} data-testid={`${testId}-bottom`}>
            {copyright && shouldRenderCopyrightInBottom && (
              <p
                id={labelId}
                className={classMap.bottomCopyright}
                data-testid={`${testId}-copyright`}
              >
                {copyright}
              </p>
            )}

            {bottomEnd && (
              <div
                className={classMap.bottomEnd}
                data-testid={`${testId}-bottom-end`}
              >
                {bottomEnd}
              </div>
            )}
          </div>
        )}
      </footer>
    );
  }

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
          {renderLogo()}

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
            <ul>{links.map(renderFooterLink)}</ul>
          </nav>
        )}

        {renderThemeSelect()}
        {renderSocialLinks()}
      </div>
    </footer>
  );
};

FooterBase.displayName = "FooterBase";
export default FooterBase;
