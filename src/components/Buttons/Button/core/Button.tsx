import React, {
    forwardRef,
    useMemo,
  } from "react";
  import "./Button.scss";
  import { ButtonProps } from "../Button.types";
  import { combineClassNames } from "../../../../utils/classNames";
  
  /**
   * A flexible and accessible button component that supports:
   * - rendering as `<button>` or `<a>` (internal/external links),
   * - optional icon and loader,
   * - theming, sizing, outline styling,
   * - and full-width layout.
   *
   * @example
   * ```tsx
   * <Button theme="primary" icon={FaCheck}>Submit</Button>
   * ```
   */
  const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
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
      /** Class names for styling the button based on props. */
      const combinedClassName = useMemo(
        () =>
          combineClassNames(
            "button",
            theme,
            outline && "outline",
            size,
            fullWidth && "fullWidth",
            disabled && "disabled",
            className
          ),
        [theme, outline, size, fullWidth, disabled, className]
      );
  
      /** Props shared across both anchor and button types. */
      const sharedProps = {
        "aria-label": ariaLabel,
        "aria-busy": loading || undefined,
        "aria-disabled": disabled || undefined,
        "data-testid": testId,
        tabIndex: disabled ? -1 : 0,
        onClick: disabled ? undefined : onClick,
      };
  
      /** Inner content with optional icon and loader. */
      const content = (
        <>
          {Icon && (
            <span className={"buttonIcon"} aria-hidden="true" data-testid="icon">
              <Icon className={"icon"} />
            </span>
          )}
          <span className={"buttonLabel"}>
            {loading ? <div className={"loader"} /> : children}
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
            className={`${combinedClassName} ${"link"}`}
            role="button"
            ref={ref as React.Ref<HTMLAnchorElement>}
          >
            {content}
          </a>
        );
      }
  
      // Internal link variant (plain <a>)
      if (href && !isExternal) {
        return (
          <a
            {...sharedProps}
            {...rest}
            href={href}
            className={`${combinedClassName} ${"link"}`}
            role="button"
            ref={ref as React.Ref<HTMLAnchorElement>}
          >
            {content}
          </a>
        );
      }
  
      // Standard button element
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
  
  Button.displayName = "Button";
  
  export default Button;
  