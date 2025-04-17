import React, { MouseEvent, useMemo, useState } from "react";
import "./Avatar.scss";
import { AvatarProps } from "../Avatar.types";
import { combineClassNames } from "../../../utils/classNames";
import { getInitials } from "../../../utils/getInitials";


/**
 * Avatar component for displaying user profile photos or initials.
 * Supports sizes, shapes, fallback, status indicators, themes, links, and outline style.
 *
 * @example
 * <Avatar name="Alex Doe" status="online" />
 */
const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "User Avatar",
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
}) => {
  const [imgError, setImgError] = useState(false);

  const computedLabel = label || alt || name || "Avatar";

  const fallbackContent = fallback ?? getInitials(name);

  /**
   * Combine all class names based on props.
   */
  const combinedClassName = useMemo(
    () =>
      combineClassNames(
        "avatar",
        theme,
        shape,
        size,
        outline && "outline",
        className
      ),
    [theme, shape, size, outline, className]
  );

  /**
   * Render the image or fallback content.
   */
  const avatarContent = !imgError && src ? (
    <img
      src={src}
      alt={computedLabel}
      className="image"
      onError={() => setImgError(true)}
      loading={priority ? "eager" : "lazy"}
      aria-hidden={false}
      role="img"
    />
  ) : (
    <span
      className="initials"
      data-testid="avatar-initials"
      role="img"
      aria-label={computedLabel}
      title={computedLabel}
    >
      {fallbackContent}
    </span>
  );

  /**
   * Render a status icon or colored dot in the appropriate position.
   */
  const statusIndicator = (status || statusIcon) && (
    <span
      className={combineClassNames(
        "status",
        status && `status-${status}`,
        statusPosition
      )}
      aria-label={status}
      data-testid="avatar-status"
      title={status}
    >
      {statusIcon || <span className={"dot"} />}
    </span>
  );

  const content = (
    <>
      {children ?? avatarContent}
      {statusIndicator}
    </>
  );

  /**
   * Handle avatar click event.
   */
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    onClick?.(e as MouseEvent<HTMLButtonElement | HTMLAnchorElement>);
    if (!href) e.preventDefault();
  };

  // Render as anchor if href is present
  if (href) {
    return (
      <a
        href={href}
        className={combinedClassName}
        onClick={handleClick}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        aria-label={computedLabel}
        data-testid="avatar"
      >
        {content}
      </a>
    );
  }

  // Render as button otherwise
  return (
    <button
      type="button"
      className={combinedClassName}
      onClick={handleClick}
      aria-label={computedLabel}
      data-testid="avatar"
    >
      {content}
    </button>
  );
};

export default Avatar;
