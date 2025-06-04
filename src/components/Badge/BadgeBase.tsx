import React, { useMemo, MouseEvent } from "react";
import { BadgeProps } from "./Badge.types";
import { combineClassNames } from "@/utils/classNames";

export interface BadgeBaseProps extends BadgeProps {
  classMap: Record<string, string>;
}

export const BadgeBase: React.FC<BadgeBaseProps> = ({
  text,
  children,
  theme = "primary",
  state = "",
  disabled = false,
  title,
  size = "medium",
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
