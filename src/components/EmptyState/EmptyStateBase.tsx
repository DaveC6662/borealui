import React, { useMemo, useId } from "react";
import type { BaseEmptyStateProps } from "./EmptyState.types";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultSize,
  getDefaultTheme,
} from "../../config/boreal-style-config";

const BaseEmptyState: React.FC<BaseEmptyStateProps> = ({
  icon: Icon,
  title = "Nothing Here Yet",
  message = "There’s no content to display.",
  theme = getDefaultTheme(),
  state = "",
  size = getDefaultSize(),
  rounding = getDefaultRounding(),
  shadow = getDefaultShadow(),
  outline = false,
  actionLabel,
  onActionClick,
  className = "",
  "data-testid": testId = "empty-state",
  Button,
  classMap,
}) => {
  const uid = useId();
  const titleId = `${testId}-title-${uid}`;
  const descId = message ? `${testId}-message-${uid}` : undefined;

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

  const buttonAriaLabel =
    typeof actionLabel === "string" ? undefined : "Perform action";

  return title ? (
    <section
      className={sectionClassNames}
      role="region"
      aria-labelledby={titleId}
      aria-describedby={descId}
      data-testid={testId}
    >
      {Icon && (
        <div className={classMap.icon} data-testid={`${testId}-icon`}>
          <Icon aria-hidden="true" focusable={false} />
        </div>
      )}

      <h2
        id={titleId}
        className={classMap.title}
        data-testid={`${testId}-title`}
      >
        {title}
      </h2>

      {message && (
        <p
          id={descId}
          className={classMap.message}
          data-testid={`${testId}-message`}
        >
          {message}
        </p>
      )}

      {actionLabel && onActionClick && (
        <Button
          theme="clear"
          outline={outline}
          onClick={onActionClick}
          aria-label={buttonAriaLabel}
          data-testid={`${testId}-action`}
        >
          {actionLabel}
        </Button>
      )}
    </section>
  ) : (
    <section
      className={sectionClassNames}
      aria-describedby={descId}
      data-testid={testId}
    >
      {Icon && (
        <div className={classMap.icon} data-testid={`${testId}-icon`}>
          <Icon aria-hidden="true" focusable={false} />
        </div>
      )}

      {message && (
        <p
          id={descId}
          className={classMap.message}
          data-testid={`${testId}-message`}
        >
          {message}
        </p>
      )}

      {actionLabel && onActionClick && (
        <Button
          theme="clear"
          outline={outline}
          onClick={onActionClick}
          aria-label={buttonAriaLabel}
          data-testid={`${testId}-action`}
        >
          {actionLabel}
        </Button>
      )}
    </section>
  );
};

BaseEmptyState.displayName = "BaseEmptyState";
export default BaseEmptyState;
