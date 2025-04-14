"use client";

import React, { MouseEvent, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Avatar.module.scss";
import { AvatarProps } from "./Avatar.types";
import { combineClassNames } from "@/utils/classNames";
import { getInitials } from "@/utils/getInitials";

/**
 * Avatar component for displaying user profile photos or initials.
 * Supports various sizes, shapes, themes, status indicators, and linking behavior.
 *
 * @example
 * <Avatar name="Jane Doe" status="online" />
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
        styles.avatar,
        styles[theme],
        styles[shape],
        styles[size],
        outline && styles.outline,
        className
      ),
    [theme, shape, size, outline, className]
  );

  /**
   * Render the default avatar content (image or initials).
   */
  const avatarContent = !imgError && src ? (
    <Image
      src={src}
      alt={computedLabel}
      fill
      className={styles.image}
      onError={() => setImgError(true)}
      loading="lazy"
      priority={priority}
    />
  ) : (
    <span
      className={styles.initials}
      data-testid="avatar-initials"
      role="img"
      aria-label={computedLabel}
      title={computedLabel}
      suppressHydrationWarning
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
        styles.status,
        status && styles[`status-${status}`],
        styles[statusPosition]
      )}
      aria-label={status}
      data-testid="avatar-status"
      title={status}
    >
      {statusIcon || <span className={styles.dot} />}
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

  // Render as internal Next.js link
  if (href?.startsWith("/")) {
    return (
      <Link href={href} aria-label={computedLabel} className={combinedClassName} onClick={handleClick}>
        {content}
      </Link>
    );
  }

  // Render as external anchor tag
  if (href) {
    return (
      <a
        href={href}
        className={combinedClassName}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label={computedLabel}
        data-testid="avatar"
      >
        {content}
      </a>
    );
  }

  // Render as a button element
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
