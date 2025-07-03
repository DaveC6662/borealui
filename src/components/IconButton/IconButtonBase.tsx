import React, { forwardRef, useMemo } from "react";
import { IconButtonProps } from "./IconButton.types";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "@/utils/capitalize";
import {
  defaultRounding,
  defaultShadow,
  defaultSize,
  defaultTheme,
} from "@/config/boreal-style-config";

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
      theme = defaultTheme,
      state = "",
      href,
      isExternal = false,
      onClick,
      onKeyDown,
      className = "",
      disabled = false,
      ariaLabel,
      title,
      outline = false,
      rounding = defaultRounding,
      shadow = defaultShadow,
      size = defaultSize,
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
          classMap[state],
          size && classMap[size],
          shadow && classMap[`shadow${capitalize(shadow)}`],
          rounding && classMap[`round${capitalize(rounding)}`],
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
      title,
      tabIndex: typeof tabIndex === "number" ? tabIndex : disabled ? -1 : 0,
      "data-testid": testId,
    };

    const iconContent = (
      <span className={classMap.buttonLabel}>
        {loading ? (
          <div className={classMap.loader} aria-hidden="true" />
        ) : (
          <Icon data-testid="icon-button-icon" aria-hidden="true" />
        )}
      </span>
    );

    if (href && !disabled && isExternal) {
      return (
        <a
          href={href}
          role="button"
          target="_blank"
          rel="noopener noreferrer"
          className={classNames}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...sharedAria}
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
          {...sharedAria}
          {...rest}
        >
          {iconContent}
        </LinkComponent>
      );
    }

    return (
      <button
        type={type}
        disabled={disabled}
        className={classNames}
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
        ref={ref as React.Ref<HTMLButtonElement>}
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
