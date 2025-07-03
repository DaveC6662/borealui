import React, { useMemo, MouseEvent } from "react";
import { BadgeProps } from "./Badge.types";
import { combineClassNames } from "@/utils/classNames";
import { capitalize } from "@/utils/capitalize";
import {
  defaultRounding,
  defaultShadow,
  defaultSize,
  defaultTheme,
} from "@/config/boreal-style-config";

export interface BadgeBaseProps extends BadgeProps {
  classMap: Record<string, string>;
}

export const BadgeBase: React.FC<BadgeBaseProps> = ({
  text,
  children,
  theme = defaultTheme,
  state = "",
  disabled = false,
  rounding = defaultRounding,
  shadow = defaultShadow,
  title,
  size = defaultSize,
  outline = false,
  testId = "badge",
  icon: Icon,
  className = "",
  classMap,
  onClick,
}) => {
  const combinedClassName = useMemo(
    () =>
      combineClassNames(
        classMap.badge,
        classMap[size],
        classMap[theme],
        classMap[state],
        shadow && classMap[`shadow${capitalize(shadow)}`],
        rounding && classMap[`round${capitalize(rounding)}`],
        disabled && classMap.disabled,
        outline && classMap.outline,
        onClick && classMap.clickable,
        className
      ),
    [theme, size, outline, className]
  );

  if (!text && !children) return null;

  const content = children ?? text;
  const label = typeof content === "string" ? content : text;

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    if (disabled) return;
    onClick?.(e as MouseEvent<HTMLButtonElement | HTMLAnchorElement>);
    if (!title && !onClick) e.preventDefault();
  };

  return (
    <span
      className={combinedClassName}
      aria-label={label}
      title={title || label}
      data-testid={testId}
      role="status"
      onClick={handleClick}
      aria-live="polite"
    >
      {Icon && (
        <Icon
          className={classMap["badge_icon"]}
          aria-hidden="true"
          focusable="false"
        />
      )}
      {content}
    </span>
  );
};
