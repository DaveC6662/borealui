import React, { forwardRef, useMemo, KeyboardEvent } from "react";
import { IconButtonProps } from "./IconButton.types";
import { combineClassNames } from "@/utils/classNames";

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

    const sharedProps = {
      "aria-label": label,
      "aria-disabled": disabled || undefined,
      "aria-busy": loading || undefined,
      disabled,
      tabIndex: disabled ? -1 : 0,
      title,
      "data-testid": testId,
    };

    const iconContent = (
      <span className={classMap.buttonLabel}>
        {loading ? (
          <div className={classMap.loader} />
        ) : (
          <Icon data-testid="icon-button-icon" />
        )}
      </span>
    );

    if (href && !disabled && isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          role="button"
          className={classNames}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...sharedProps}
          {...rest}
        >
          {iconContent}
        </a>
      );
    }

    if (href && !disabled && !isExternal) {
      return (
        <LinkComponent
          href={href}
          role="button"
          className={classNames}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...sharedProps}
          {...rest}
        >
          {iconContent}
        </LinkComponent>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
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

IconButtonBase.displayName = "IconButtonBase";

export default IconButtonBase;
