import React, { useMemo } from "react";
import { BadgeProps } from "./Badge.types";
import { combineClassNames } from "@/utils/classNames";

export interface BadgeBaseProps extends BadgeProps {
  classMap: Record<string, string>;
}

export const BadgeBase: React.FC<BadgeBaseProps> = ({
  text,
  children,
  theme = "primary",
  title,
  size = "medium",
  outline = false,
  testId = "badge",
  icon: Icon,
  className = "",
  classMap,
}) => {
  const themeClass = outline
    ? classMap[`badge_${theme}_outline`]
    : classMap[`badge_${theme}`];

  const combinedClassName = useMemo(
    () =>
      combineClassNames(
        classMap.badge,
        classMap[`badge_${size}`],
        themeClass,
        className
      ),
    [theme, size, outline, className]
  );

  if (!text && !children) return null;

  const content = children ?? text;
  const label = typeof content === "string" ? content : text;

  return (
    <span
      className={combinedClassName}
      aria-label={label}
      title={title || label}
      data-testid={testId}
      role="status"
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
