import React, { forwardRef, useMemo } from "react";
import { IconButtonProps } from "./IconButton.types";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultSize,
  getDefaultTheme,
} from "../../config/boreal-style-config";

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
      theme = getDefaultTheme(),
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
      rounding = getDefaultRounding(),
      shadow = getDefaultShadow(),
      size = getDefaultSize(),
      loading = false,
      type = "button",
      classMap,
      LinkComponent = "a",
      "data-testid": testId = "icon-button",
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
      [theme, state, outline, size, shadow, rounding, disabled, className]
    );

    const sharedAria = {
      "aria-label": label,
      "aria-busy": loading || undefined,
      title,
      "data-testid": testId,
    };

    const iconContent = (
      <span
        className={classMap.buttonLabel}
        aria-live="polite"
        aria-atomic="true"
      >
        {loading ? (
          <>
            <div
              className={classMap.loader}
              aria-hidden="true"
              aria-live="polite"
              aria-atomic="true"
            />
            <span className="sr_only">Loading</span>
          </>
        ) : Icon ? (
          <Icon data-testid="icon-button-icon" />
        ) : null}
      </span>
    );

    if (href && !disabled && isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combineClassNames(classNames, classMap.link)}
          ref={ref as React.Ref<HTMLAnchorElement>}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : undefined}
          onClick={disabled ? (e) => e.preventDefault() : onClick}
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
          className={combineClassNames(classNames, classMap.link)}
          ref={ref as React.Ref<HTMLAnchorElement>}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : undefined}
          onClick={
            disabled
              ? (e: { preventDefault: () => any }) => e.preventDefault()
              : onClick
          }
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
        onClick={
          disabled
            ? (e: { preventDefault: () => any }) => e.preventDefault()
            : onClick
        }
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
