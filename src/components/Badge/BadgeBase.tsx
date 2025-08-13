import React, { useMemo, MouseEvent } from "react";
import { BadgeBaseProps, BadgeProps } from "./Badge.types";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultSize,
  getDefaultTheme,
} from "../../config/boreal-style-config";

export const BadgeBase: React.FC<BadgeBaseProps> = ({
  text,
  children,
  theme = getDefaultTheme(),
  state = "",
  disabled = false,
  rounding = getDefaultRounding(),
  shadow = getDefaultShadow(),
  title,
  size = getDefaultSize(),
  outline = false,
  icon: Icon,
  className = "",
  classMap,
  "data-testid": testId = "badge",
  onClick,
  href,
  ...rest
}: BadgeBaseProps) => {
  if (!text && !children) return null;

  const content = children ?? text;
  const label = typeof content === "string" ? content : text;

  const combinedClassName = useMemo(
    () =>
      combineClassNames(
        classMap.badge,
        classMap[size],
        classMap[theme],
        classMap[state],
        shadow && classMap[`shadow${capitalize(shadow)}`],
        rounding && classMap[`round${capitalize(rounding)}`],
        disabled && classMap.disabled,
        outline && classMap.outline,
        onClick && classMap.clickable,
        className
      ),
    [
      size,
      theme,
      state,
      shadow,
      rounding,
      disabled,
      outline,
      onClick,
      href,
      className,
      classMap,
    ]
  );

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onClick?.(e as MouseEvent<HTMLButtonElement | HTMLAnchorElement>);
  };

  const needsAriaLabel = typeof content !== "string";

  const inner = (
    <>
      {Icon && (
        <Icon
          className={classMap.badge_icon}
          aria-hidden="true"
          focusable="false"
          data-testid={testId ? `${testId}-icon` : undefined}
        />
      )}
      {content}
    </>
  );

  if (href) {
    const isHttp = /^https?:\/\//i.test(href);
    return (
      <a
        href={disabled ? undefined : href}
        className={combinedClassName}
        onClick={handleClick}
        data-testid={testId ? `${testId}-main` : undefined}
        title={title ?? (typeof label === "string" ? label : undefined)}
        {...(needsAriaLabel ? { "aria-label": label } : {})}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        target={isHttp && !disabled ? "_blank" : undefined}
        rel={isHttp && !disabled ? "noopener noreferrer" : undefined}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {inner}
      </a>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        className={combinedClassName}
        onClick={handleClick}
        disabled={disabled}
        data-testid={testId ? `${testId}-main` : undefined}
        title={title ?? (typeof label === "string" ? label : undefined)}
        {...(needsAriaLabel ? { "aria-label": label } : {})}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {inner}
      </button>
    );
  }

  return (
    <span
      className={combinedClassName}
      data-testid={testId ? `${testId}-main` : undefined}
      title={title ?? (typeof label === "string" ? label : undefined)}
      {...(needsAriaLabel ? { "aria-label": label } : {})}
    >
      {inner}
    </span>
  );
};
