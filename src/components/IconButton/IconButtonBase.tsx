import React, { forwardRef, useMemo } from "react";
import { IconButtonBaseProps } from "./IconButton.types";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultSize,
  getDefaultTheme,
} from "../../config/boreal-style-config";

const IconButtonBase = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  IconButtonBaseProps
>(function IconButtonBase(
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
) {
  const needsLabel = !ariaLabel && !title;
  if (process.env.NODE_ENV === "development" && needsLabel) {
    console.warn(
      "IconButtonBase: provide `ariaLabel` or `title` for icon-only buttons."
    );
  }
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
        (disabled || loading) && classMap.disabled,
        className
      ),
    [
      classMap,
      theme,
      state,
      size,
      shadow,
      rounding,
      outline,
      disabled,
      loading,
      className,
    ]
  );

  const sharedAria = {
    "aria-label": label,
    "aria-busy": loading || undefined,
    title,
    "data-testid": testId,
  } as const;

  const iconContent = (
    <span
      className={classMap.buttonLabel}
      aria-live="polite"
      aria-atomic="true"
    >
      {loading ? (
        <>
          <div className={classMap.loader} aria-hidden="true" />
          <span className="sr_only">Loading</span>
        </>
      ) : Icon ? (
        <Icon
          data-testid="icon-button-icon"
          aria-hidden={true}
          focusable={false}
        />
      ) : null}
    </span>
  );

  const renderAsLink = !!href;
  const inert = disabled || loading;

  if (renderAsLink) {
    const linkProps = {
      className: combineClassNames(classNames, classMap.link),
      ref: ref as React.Ref<HTMLAnchorElement>,
      onClick: inert ? (e: React.MouseEvent) => e.preventDefault() : onClick,
      onKeyDown,
      "aria-disabled": inert || undefined,
      tabIndex: inert ? -1 : tabIndex,
      ...sharedAria,
      ...rest,
    };

    if (isExternal) {
      return (
        <a
          {...linkProps}
          href={inert ? undefined : href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {iconContent}
        </a>
      );
    }

    return (
      <LinkComponent {...linkProps} href={inert ? undefined : href}>
        {iconContent}
      </LinkComponent>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={classNames}
      onClick={disabled ? (e) => e.preventDefault() : onClick}
      onKeyDown={onKeyDown}
      ref={ref as React.Ref<HTMLButtonElement>}
      tabIndex={tabIndex}
      {...sharedAria}
      {...rest}
    >
      {iconContent}
    </button>
  );
});

IconButtonBase.displayName = "IconButtonBase";
export default IconButtonBase;
