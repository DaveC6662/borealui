"use client";

import React, { forwardRef, MouseEvent, useMemo } from "react";
import Link from "next/link";
import styles from "./Button.module.scss";
import { SizeType, ThemeType } from "@/types/types";
import { combineClassNames } from "@/utils/classNames";

/**
 * Props for the reusable Button component.
 */
interface ButtonProps {
  /** Optional icon component to render inside the button. */
  icon?: React.ElementType;
  /** Theme style of the button (e.g., "primary", "secondary"). */
  theme?: ThemeType;
  /** Click event handler for the button. */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** Child content to display inside the button. */
  children?: React.ReactNode;
  /** Additional class name(s) for custom styling. */
  className?: string;
  /** Whether the button should be disabled. */
  disabled?: boolean;
  /** Accessible label for screen readers. */
  ariaLabel?: string;
  /** If provided, button will render as a link pointing to this href. */
  href?: string;
  /** If true, opens the link in a new tab (used with `href`). */
  isExternal?: boolean;
  /** Whether to use outline styling. */
  outline?: boolean;
  /** Size of the button (e.g., "small", "medium", "large"). */
  size?: SizeType;
  /** Whether to show a loading indicator instead of the children. */
  loading?: boolean;
  /** Whether the button should take up the full width of its container. */
  fullWidth?: boolean;
  /** Button type for native `<button>` elements. */
  type?: "button" | "reset" | "submit";
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

/**
 * A highly customizable and accessible button component supporting
 * icons, theming, link behavior, loading state, and full-width layout.
 *
 * @param {ButtonProps} props - Props passed to the Button component.
 * @param {React.Ref<HTMLButtonElement>} ref - Ref forwarded to the underlying button.
 * @returns {JSX.Element} Rendered button, anchor, or link.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      icon: Icon,
      theme = "primary",
      onClick,
      type = "button",
      children,
      className = "",
      disabled = false,
      ariaLabel,
      href,
      isExternal = false,
      outline = false,
      size = "medium",
      loading = false,
      fullWidth = false,
      "data-testid": testId,
      ...rest
    },
    ref
  ) => {
    /** Combined class names for styling based on props. */
    const combinedClassName = useMemo(
      () =>
        combineClassNames(
          styles.button,
          styles[theme],
          outline && styles.outline,
          styles[size],
          fullWidth && styles.fullWidth,
          disabled && styles.disabled,
          className
        ),
      [theme, outline, size, fullWidth, disabled, className]
    );

    /** Shared props used across all element variations (button, link, anchor). */
    const sharedProps = {
      "aria-label": ariaLabel,
      "aria-busy": loading || undefined,
      "aria-disabled": disabled || undefined,
      "data-testid": testId,
      tabIndex: disabled ? -1 : 0,
    };

    /** Inner content of the button, including optional icon and label or loading spinner. */
    const content = (
      <>
        {Icon && (
          <span className={styles.buttonIcon} aria-hidden="true" data-testid="icon">
            <Icon className={styles.icon} />
          </span>
        )}
        <span className={styles.buttonLabel}>
          {loading ? <div className={styles.loader} /> : children}
        </span>
      </>
    );

    // External link variant
    if (href && isExternal) {
      return (
        <a
          {...sharedProps}
          {...rest}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${combinedClassName} ${styles.link}`}
          role="button"
        >
          {content}
        </a>
      );
    }

    // Internal link variant
    if (href && !isExternal) {
      return (
        <Link href={href} passHref legacyBehavior>
          <a
            {...sharedProps}
            {...rest}
            className={`${combinedClassName} ${styles.link}`}
            role="button"
          >
            {content}
          </a>
        </Link>
      );
    }

    // Standard button
    return (
      <button
        ref={ref}
        type={type}
        className={combinedClassName}
        disabled={disabled}
        onClick={onClick}
        {...sharedProps}
        {...rest}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
