
"use client";

import { forwardRef, useMemo } from "react";
import type { KeyboardEvent } from "react";
import Link from "next/link";
import styles from "./IconButton.module.scss";
import { combineClassNames } from "@/utils/classNames";
import { IconButtonProps } from "./IconButton.types";

/**
 * IconButton renders an accessible button or link with an icon and optional loading state.
 * Supports theme, size, outline, disabled, link behavior, and keyboard interactions.
 *
 * @param {IconButtonProps} props - Component props.
 * @param {React.Ref<HTMLButtonElement>} ref - Ref forwarded to the underlying button.
 * @returns {JSX.Element} Rendered icon button or link.
 */
const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon: Icon,
      theme = "primary",
      href,
      isExternal = false,
      onClick,
      className = "",
      disabled = false,
      ariaLabel,
      title,
      outline = false,
      size = "medium",
      loading = false,
      type = "button",
      "data-testid": testId,
      ...rest
    },
    ref
  ) => {
    /** Fallback label for accessibility. */
    const label = ariaLabel || title || "Icon button";

    /** Shared attributes across <a>, <Link>, and <button>. */
    const sharedProps = {
      "aria-label": label,
      "aria-disabled": disabled || undefined,
      "aria-busy": loading || undefined,
      disabled,
      tabIndex: disabled ? -1 : 0,
      title,
      "data-testid": testId,
    };

    /** Computed class names based on props. */
    const classNames = useMemo(
      () =>
        combineClassNames(
          styles.iconButton,
          styles[theme],
          outline && styles.outline,
          size && styles[size],
          disabled && styles.disabled,
          className
        ),
      [theme, outline, size, disabled, className]
    );

    /** Content rendered inside the button. */
    const iconContent = (
      <span className={styles.buttonLabel}>
        {loading ? <div className={styles.loader} /> : <Icon data-testid="icon-button-icon" />}
      </span>
    );

    // External link
    if (href && !disabled && isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          role="button"
          className={classNames}
          {...sharedProps}
          {...rest}
        >
          {iconContent}
        </a>
      );
    }

    // Internal link
    if (href && !disabled && !isExternal) {
      return (
        <Link
          href={href}
          className={classNames}
          role="button"
          {...sharedProps}
          {...rest}
        >
          {iconContent}
        </Link>
      );
    }

    // Default button
    return (
      <button
        ref={ref}
        type={type}
        className={classNames}
        onClick={(e) => {
          if (!disabled) onClick?.(e);
        }}
        onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) => {
          if (!disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            const event = new MouseEvent("click", { bubbles: true });
            e.currentTarget.dispatchEvent(event);
          }
        }}
        {...sharedProps}
        {...rest}
      >
        {iconContent}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
export default IconButton;
