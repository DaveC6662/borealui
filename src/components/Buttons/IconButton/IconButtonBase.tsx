import React, { forwardRef, useMemo } from "react";
import { IconButtonProps } from "./IconButton.types";
import { combineClassNames } from "../../../utils/classNames";

export interface IconButtonBaseProps extends IconButtonProps {
  classMap: Record<string, string>;
  LinkComponent?: React.ElementType;
}

const IconButtonBase = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  IconButtonBaseProps
>(
  (
    {
      icon: Icon,
      theme = "primary",
      href,
      isExternal = false,
      onClick,
      onKeyDown,
      className = "",
      disabled = false,
      ariaLabel,
      title,
      outline = false,
      size = "medium",
      loading = false,
      type = "button",
      classMap,
      LinkComponent = "a",
      "data-testid": testId,
      tabIndex,
      ...rest
    },
    ref
  ) => {
    const label = ariaLabel || title || "Icon button";

    const classNames = useMemo(
      () =>
        combineClassNames(
          classMap.iconButton,
          classMap[theme],
          size && classMap[size],
          outline && classMap.outline,
          disabled && classMap.disabled,
          className
        ),
      [theme, size, outline, disabled, className]
    );

    const sharedAria = {
      "aria-label": label,
      "aria-disabled": disabled || undefined,
      "aria-busy": loading || undefined,
      "data-testid": testId,
      tabIndex: typeof tabIndex === "number" ? tabIndex : disabled ? -1 : 0,
      title,
    };

    const iconContent = (
      <span className={classMap.buttonLabel}>
        {loading ? (
          <div className={classMap.loader} aria-hidden="true" />
        ) : (
          <Icon data-testid="icon-button-icon" />
        )}
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
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...sharedAria}
          {...rest}
        >
          {iconContent}
        </a>
      );
    }

    // Internal link (e.g., Next.js Link)
    if (href && !disabled && !isExternal) {
      return (
        <LinkComponent
          href={href}
          role="button"
          className={classNames}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...sharedAria}
          {...rest}
        >
          {iconContent}
        </LinkComponent>
      );
    }

    // Native button
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        className={classNames}
        disabled={disabled}
        onClick={(e) => {
          if (!disabled) onClick?.(e);
        }}
        onKeyDown={(e) => {
          if (!disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onClick?.(
              new MouseEvent("click", {
                bubbles: true,
              }) as unknown as React.MouseEvent<HTMLElement>
            );
          }

          onKeyDown?.(e);
        }}
        {...sharedAria}
        {...rest}
      >
        {iconContent}
      </button>
    );
  }
);

IconButtonBase.displayName = "IconButtonBase";

export default IconButtonBase;
