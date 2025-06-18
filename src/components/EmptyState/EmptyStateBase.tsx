import React, { useMemo } from "react";
import { EmptyStateProps } from "./EmptyState.types";
import { combineClassNames } from "@/utils/classNames";
import { capitalize } from "@/utils/capitalize";

export interface BaseEmptyStateProps extends EmptyStateProps {
  Button: React.ComponentType<any>;
  classMap: Record<string, string>;
}

const BaseEmptyState: React.FC<BaseEmptyStateProps> = ({
  icon: Icon,
  title = "Nothing Here Yet",
  message = "There’s no content to display.",
  theme = "primary",
  state = "",
  size = "medium",
  rounding = "medium",
  shadow = "light",
  outline = false,
  actionLabel,
  onActionClick,
  className = "",
  "data-testid": testId = "empty-state",
  Button,
  classMap,
}) => {
  const titleId = `${testId}-title`;
  const descId = `${testId}-message`;

  const sectionClassNames = useMemo(
    () =>
      combineClassNames(
        classMap.empty_state,
        classMap[theme],
        classMap[state],
        classMap[size],
        shadow && classMap[`shadow${capitalize(shadow)}`],
        rounding && classMap[`round${capitalize(rounding)}`],
        outline && classMap.outline,
        className
      ),
    [classMap, rounding, shadow, size, state, theme, outline, className]
  );

  return (
    <section
      className={sectionClassNames}
      role="region"
      aria-labelledby={titleId}
      aria-describedby={descId}
      data-testid={testId}
    >
      {Icon && (
        <div className={classMap.icon} data-testid={`${testId}-icon`}>
          <Icon aria-hidden="true" />
        </div>
      )}

      <h2
        id={titleId}
        className={classMap.title}
        data-testid={`${testId}-title`}
      >
        {title}
      </h2>

      <p
        id={descId}
        className={classMap.message}
        data-testid={`${testId}-message`}
      >
        {message}
      </p>

      {actionLabel && onActionClick && (
        <Button
          theme="clear"
          outline={outline}
          onClick={onActionClick}
          aria-label={
            typeof actionLabel === "string" ? actionLabel : "Perform action"
          }
          data-testid={`${testId}-action`}
        >
          {actionLabel}
        </Button>
      )}
    </section>
  );
};

export default BaseEmptyState;
