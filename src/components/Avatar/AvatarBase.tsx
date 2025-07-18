import React, { useMemo, useState, MouseEvent } from "react";
import { AvatarProps } from "./Avatar.types";
import { getInitials } from "../../utils/getInitials";
import { combineClassNames } from "../../utils/classNames";
import { FallbackUserIcon } from "../../Icons/index";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultShadow,
  getDefaultSize,
  getDefaultTheme,
} from "../../config/boreal-style-config";
export interface AvatarBaseProps extends AvatarProps {
  ImageComponent?: React.ElementType;
  LinkComponent?: React.ElementType;
  classMap: Record<string, string>;
}

export const AvatarBase: React.FC<AvatarBaseProps> = ({
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
  "data-testid": testId,
}) => {
  const [imgError, setImgError] = useState(false);
  const computedLabel = label || alt || name || "User avatar";
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
    [theme, shape, size, outline, className]
  );

  const avatarContent =
    !imgError && src ? (
      <ImageComponent
        src={src}
        alt={computedLabel}
        className={classMap.image}
        onError={() => setImgError(true)}
        loading={priority ? "eager" : "lazy"}
        aria-hidden="false"
        role="img"
        data-testid={testId ? `${testId}-image` : undefined}
        fill={true}
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
        statusIcon ? "icon_only" : undefined,
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
    onClick?.(e as MouseEvent<HTMLButtonElement | HTMLAnchorElement>);
    if (!href) e.preventDefault();
  };

  const ariaAttrs = {
    "aria-label": computedLabel,
    "aria-disabled": false,
  };

  if (href) {
    if (LinkComponent === "a") {
      return (
        <a
          href={href}
          className={combinedClassName}
          onClick={handleClick}
          data-testid="avatar"
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          {...ariaAttrs}
        >
          {content}
        </a>
      );
    }

    return (
      <LinkComponent
        href={href}
        className={combinedClassName}
        onClick={handleClick}
        data-testid={testId ? `${testId}-main` : undefined}
        {...ariaAttrs}
      >
        {content}
      </LinkComponent>
    );
  }

  return (
    <button
      type="button"
      className={combinedClassName}
      onClick={handleClick}
      data-testid={testId ? `${testId}-main` : undefined}
      {...ariaAttrs}
    >
      {content}
    </button>
  );
};

AvatarBase.displayName = "AvatarBase";
