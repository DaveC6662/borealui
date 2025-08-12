import React, { forwardRef, useMemo } from "react";
import { ButtonProps } from "./Button.types";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultSize,
  getDefaultTheme,
} from "../../config/boreal-style-config";

export interface ButtonBaseProps extends ButtonProps {
  classMap: Record<string, string>;
  LinkComponent?: React.ElementType;
}

const ButtonBase = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonBaseProps
>(
  (
    {
      icon: Icon,
      theme = getDefaultTheme(),
      state = "",
      onClick,
      type = "button",
      rounding = getDefaultRounding(),
      shadow = getDefaultShadow(),
      children,
      className = "",
      disabled = false,
      ariaLabel,
      href,
      isExternal = false,
      outline = false,
      size = getDefaultSize(),
      loading = false,
      fullWidth = false,
      "data-testid": testId = "button",
      classMap,
      LinkComponent = "a",
      ...rest
    },
    ref
  ) => {
    const needsAriaLabel = !children || typeof children !== "string";
    const computedAriaLabel = needsAriaLabel ? ariaLabel : undefined;
    if (
      process.env.NODE_ENV === "development" &&
      needsAriaLabel &&
      !ariaLabel
    ) {
      console.warn("ButtonBase: icon-only buttons must provide `ariaLabel`.");
    }

    const combinedClassName = useMemo(
      () =>
        combineClassNames(
          classMap.button,
          classMap[theme],
          classMap[state],
          classMap[size],
          outline && classMap.outline,
          shadow && classMap[`shadow${capitalize(shadow)}`],
          rounding && classMap[`round${capitalize(rounding)}`],
          fullWidth && classMap.fullWidth,
          disabled && classMap.disabled,
          className
        ),
      [
        theme,
        state,
        outline,
        size,
        shadow,
        rounding,
        fullWidth,
        disabled,
        className,
      ]
    );

    const sharedProps = {
      "aria-busy": loading || undefined,
      "aria-disabled": disabled || undefined,
      "data-testid": testId,
      onClick: disabled ? undefined : onClick,
      ...(computedAriaLabel ? { "aria-label": computedAriaLabel } : {}),
    };

    const content = (
      <>
        {Icon && (
          <span
            className={classMap.buttonIcon}
            aria-hidden="true"
            data-testid={testId ? `${testId}-icon` : undefined}
          >
            <Icon className={classMap.icon} />
          </span>
        )}
        <span
          className={classMap.buttonLabel}
          aria-live="polite"
          aria-atomic="true"
          data-testid={testId ? `${testId}-loading` : undefined}
        >
          {loading ? (
            <>
              <div className={classMap.loader} aria-hidden="true" />
              <span className="sr_only">Loading</span>
            </>
          ) : (
            <>
              {children}
              {href && isExternal && (
                <span className="sr_only"> (opens in a new tab)</span>
              )}
            </>
          )}
        </span>
      </>
    );

    if (href && isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combineClassNames(combinedClassName, classMap.link)}
          ref={ref as React.Ref<HTMLAnchorElement>}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : undefined}
          onClick={disabled ? (e) => e.preventDefault() : onClick}
          {...rest}
        >
          {content}
        </a>
      );
    }

    if (href && !isExternal) {
      return (
        <LinkComponent
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combineClassNames(combinedClassName, classMap.link)}
          ref={ref as React.Ref<HTMLAnchorElement>}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : undefined}
          onClick={
            disabled
              ? (e: { preventDefault: () => any }) => e.preventDefault()
              : onClick
          }
          {...rest}
        >
          {content}
        </LinkComponent>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        className={combinedClassName}
        disabled={disabled}
        {...sharedProps}
        {...rest}
      >
        {content}
      </button>
    );
  }
);

ButtonBase.displayName = "ButtonBase";

export default ButtonBase;
