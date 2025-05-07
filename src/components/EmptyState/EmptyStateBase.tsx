import React from "react";
import { EmptyStateProps } from "./EmptyState.types";
import { combineClassNames } from "@/utils/classNames";

export interface BaseEmptyStateProps extends EmptyStateProps {
  Button: React.ComponentType<any>;
  classNames: Record<string, string>;
}

const BaseEmptyState: React.FC<BaseEmptyStateProps> = ({
  icon: Icon,
  title = "Nothing Here Yet",
  message = "There’s no content to display.",
  theme = "primary",
  size = "medium",
  outline = false,
  actionLabel,
  onActionClick,
  className = "",
  "data-testid": testId = "empty-state",
  Button,
  classNames,
}) => {
  const titleId = `${testId}-title`;
  const descId = `${testId}-message`;

  return (
    <section
      className={combineClassNames(
        classNames.empty_state,
        classNames[theme],
        classNames[size],
        outline && classNames.outline,
        className
      )}
      role="region"
      aria-labelledby={titleId}
      aria-describedby={descId}
      data-testid={testId}
    >
      {Icon && (
        <div className={classNames.icon} data-testid={`${testId}-icon`}>
          <Icon aria-hidden="true" />
        </div>
      )}

      <h2
        id={titleId}
        className={classNames.title}
        data-testid={`${testId}-title`}
      >
        {title}
      </h2>

      <p
        id={descId}
        className={classNames.message}
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
