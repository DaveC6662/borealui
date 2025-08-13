import React, {
  useMemo,
  useState,
  MouseEvent,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  forwardRef,
} from "react";
import { AvatarBaseProps } from "./Avatar.types";
import { getInitials } from "../../utils/getInitials";
import { combineClassNames } from "../../utils/classNames";
import { FallbackUserIcon } from "../../Icons/index";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultShadow,
  getDefaultSize,
  getDefaultTheme,
} from "../../config/boreal-style-config";

export const AvatarBase = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  AvatarBaseProps
>(function AvatarBase(
  {
    src,
    alt,
    name = "",
    label,
    onClick,
    disabled = false,
    href,
    status,
    statusIcon,
    statusPosition = "bottomRight",
    fallback,
    children,
    size = getDefaultSize(),
    shadow = getDefaultShadow(),
    shape = "circle",
    outline = false,
    theme = getDefaultTheme(),
    state = "",
    className = "",
    priority = false,
    ImageComponent = "img",
    LinkComponent = "a",
    classMap,
    "data-testid": testId = "avatar",
    ...rest
  },
  ref
) {
  const [imgError, setImgError] = useState(false);

  const computedLabel = label || alt || name || "User avatar";

  const linkAria = {
    "aria-label": computedLabel,
    "aria-disabled": disabled || undefined,
  } as const;
  const buttonAria = { "aria-label": computedLabel } as const;

  const fallbackContent =
    fallback ??
    (name ? (
      getInitials(name)
    ) : (
      <FallbackUserIcon className={classMap.fallback_icon} />
    ));

  const combinedClassName = useMemo(
    () =>
      combineClassNames(
        classMap.avatar,
        classMap[theme],
        classMap[state],
        classMap[shape],
        classMap[size],
        shadow && classMap[`shadow${capitalize(shadow)}`],
        disabled && classMap.disabled,
        outline && classMap.outline,
        onClick && classMap.clickable,
        className
      ),
    [
      theme,
      state,
      shape,
      size,
      shadow,
      disabled,
      outline,
      onClick,
      className,
      classMap,
    ]
  );

  const isNextImage = typeof ImageComponent !== "string";

  const avatarContent =
    !imgError && src ? (
      <ImageComponent
        src={src}
        alt={computedLabel}
        className={classMap.image}
        onError={() => setImgError(true)}
        {...(priority
          ? { loading: "eager" as const }
          : { loading: "lazy" as const })}
        {...(isNextImage ? { fill: true } : {})}
        data-testid={testId ? `${testId}-image` : undefined}
      />
    ) : (
      <span
        className={classMap.initials}
        role="img"
        aria-label={computedLabel}
        title={computedLabel}
        data-testid={testId ? `${testId}-initials` : undefined}
      >
        {fallbackContent}
      </span>
    );

  const statusIndicator = (status || statusIcon) && (
    <span
      className={combineClassNames(
        classMap.status,
        status && classMap[status],
        statusIcon ? classMap.icon_only : undefined,
        classMap[statusPosition]
      )}
      aria-hidden="true"
      data-testid={testId ? `${testId}-status` : undefined}
    >
      {statusIcon || <span className={classMap.dot} />}
    </span>
  );

  const content = (
    <>
      {children ?? avatarContent}
      {statusIndicator}
    </>
  );

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onClick?.(e as MouseEvent<HTMLButtonElement | HTMLAnchorElement>);
  };

  if (href) {
    const isHttp = /^https?:\/\//i.test(href);
    return LinkComponent === "a" ? (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={disabled ? undefined : href}
        className={combinedClassName}
        onClick={handleClick}
        data-testid={testId ? `${testId}-main` : undefined}
        target={isHttp && !disabled ? "_blank" : undefined}
        rel={isHttp && !disabled ? "noopener noreferrer" : undefined}
        tabIndex={disabled ? -1 : 0}
        {...linkAria}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    ) : (
      <LinkComponent
        ref={ref}
        href={href}
        className={combinedClassName}
        onClick={handleClick}
        data-testid={testId ? `${testId}-main` : undefined}
        tabIndex={disabled ? -1 : 0}
        {...linkAria}
        {...(rest as Record<string, unknown>)}
      >
        {content}
      </LinkComponent>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      className={combinedClassName}
      onClick={handleClick}
      disabled={disabled}
      data-testid={testId ? `${testId}-main` : undefined}
      {...buttonAria}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
});

AvatarBase.displayName = "AvatarBase";
