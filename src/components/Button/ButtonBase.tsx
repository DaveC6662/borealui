import React, { forwardRef, useMemo } from "react";
import { ButtonBaseProps } from "./Button.types";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultSize,
  getDefaultTheme,
} from "../../config/boreal-style-config";

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
    const iconOnly =
      !children ||
      (typeof children !== "string" && React.Children.count(children) === 0);
    const computedAriaLabel = iconOnly ? ariaLabel : undefined;

    if (process.env.NODE_ENV === "development" && iconOnly && !ariaLabel) {
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
        classMap,
      ]
    );

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
          aria-live={loading ? "polite" : undefined}
          aria-atomic={loading || undefined}
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
              {href && (isExternal ?? /^https?:\/\//i.test(href)) && (
                <span className="sr_only"> (opens in a new tab)</span>
              )}
            </>
          )}
        </span>
      </>
    );

    if (href) {
      const Comp = (LinkComponent ?? "a") as React.ElementType;
      const external = (isExternal ?? /^https?:\/\//i.test(href)) && !disabled;

      const linkCommon = {
        ref: ref as React.Ref<HTMLAnchorElement>,
        className: combineClassNames(combinedClassName, classMap.link),
        onClick: disabled
          ? (e: React.MouseEvent) => e.preventDefault()
          : onClick,
        "aria-disabled": disabled || undefined,
        tabIndex: disabled ? -1 : undefined,
        ...(computedAriaLabel ? { "aria-label": computedAriaLabel } : {}),
        "data-testid": testId,
      } as const;

      if (Comp === "a") {
        return (
          <a
            {...linkCommon}
            href={disabled ? undefined : href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
          >
            {content}
          </a>
        );
      }

      return (
        <Comp
          {...(linkCommon as Omit<
            React.ComponentPropsWithoutRef<typeof Comp>,
            "children"
          >)}
          href={href as never}
          {...(rest as React.ComponentPropsWithoutRef<typeof Comp>)}
        >
          {content}
        </Comp>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        className={combinedClassName}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...(computedAriaLabel ? { "aria-label": computedAriaLabel } : {})}
        data-testid={testId}
        onClick={disabled ? undefined : onClick}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);

ButtonBase.displayName = "ButtonBase";

export default ButtonBase;
