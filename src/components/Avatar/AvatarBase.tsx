import React, { useMemo, useState, MouseEvent } from "react";
import { AvatarProps } from "./Avatar.types";
import { getInitials } from "../../utils/getInitials";
import { combineClassNames } from "../../utils/classNames";
import { FallbackUserIcon } from "../../Icons/index";
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
  href,
  status,
  statusIcon,
  statusPosition = "bottomRight",
  fallback,
  children,
  size = "medium",
  shape = "circle",
  outline = false,
  theme = "primary",
  className = "",
  priority = false,
  ImageComponent = "img",
  LinkComponent = "a",
  classMap,
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
        classMap[shape],
        classMap[size],
        outline && classMap.outline,
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
        data-testid="avatar-image"
        fill={true}
      />
    ) : (
      <span
        className={classMap.initials}
        data-testid="avatar-initials"
        role="img"
        aria-label={computedLabel}
        title={computedLabel}
      >
        {fallbackContent}
      </span>
    );

  const statusIndicator = (status || statusIcon) && (
    <span
      className={combineClassNames(
        classMap.status,
        status && classMap[status],
        statusIcon ? "icon-only" : undefined,
        classMap[statusPosition]
      )}
      aria-hidden="true"
      data-testid="avatar-status"
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
        data-testid="avatar"
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
      data-testid="avatar"
      {...ariaAttrs}
    >
      {content}
    </button>
  );
};

AvatarBase.displayName = "AvatarBase";
