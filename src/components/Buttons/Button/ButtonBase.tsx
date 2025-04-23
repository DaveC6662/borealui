import React, { forwardRef, useMemo } from "react";
import { ButtonProps } from "./Button.types";
import { combineClassNames } from "@/utils/classNames";

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
      classMap,
      LinkComponent = "a",
      ...rest
    },
    ref
  ) => {
    const computedAriaLabel =
      ariaLabel || (typeof children === "string" ? children : "Button");

    const combinedClassName = useMemo(
      () =>
        combineClassNames(
          classMap.button,
          classMap[theme],
          outline && classMap.outline,
          classMap[size],
          fullWidth && classMap.fullWidth,
          disabled && classMap.disabled,
          className
        ),
      [theme, outline, size, fullWidth, disabled, className]
    );

    const sharedProps = {
      "aria-label": computedAriaLabel,
      "aria-busy": loading || undefined,
      "aria-disabled": disabled || undefined,
      "data-testid": testId,
      tabIndex: disabled ? -1 : 0,
      onClick: disabled ? undefined : onClick,
    };

    const content = (
      <>
        {Icon && (
          <span
            className={classMap.buttonIcon}
            aria-hidden="true"
            data-testid="icon"
          >
            <Icon className={classMap.icon} />
          </span>
        )}
        <span className={classMap.buttonLabel}>
          {loading ? (
            <div className={classMap.loader} aria-hidden="true" />
          ) : (
            children
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
          role="button"
          className={combineClassNames(combinedClassName, classMap.link)}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...sharedProps}
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
          role="button"
          className={combineClassNames(combinedClassName, classMap.link)}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...sharedProps}
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
