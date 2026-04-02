import React, { JSX, useMemo } from "react";
import { combineClassNames } from "../../utils/classNames";
import { ToolbarBaseProps } from "./Toolbar.types";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultTheme,
} from "../../config/boreal-style-config";

const ToolbarBase: React.FC<ToolbarBaseProps> = ({
  title,
  titleId,
  left,
  center,
  right,
  avatar,
  theme = getDefaultTheme(),
  shadow = getDefaultShadow(),
  rounding = getDefaultRounding(),
  className = "",
  "data-testid": testId = "toolbar",
  "aria-label": ariaLabelProp,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  leftAriaLabel = "Toolbar left section",
  centerAriaLabel = "Toolbar center section",
  rightAriaLabel = "Toolbar right section",
  AvatarComponent,
  classMap,
  "aria-label": ariaLabel = "Toolbar",
  headingLevel = 1,
}): JSX.Element => {
  const safeHeading = Math.min(6, Math.max(1, headingLevel));
  const TitleTag = `h${safeHeading}` as keyof JSX.IntrinsicElements;

  const toolbarClass = useMemo(
    () =>
      combineClassNames(
        classMap.toolbar,
        classMap[theme],
        className,
        shadow && classMap[`shadow${capitalize(shadow)}`],
        rounding && classMap[`round${capitalize(rounding)}`],
      ),
    [classMap, theme, className, shadow, rounding],
  );

  const resolvedAriaLabel = ariaLabelledBy
    ? undefined
    : (ariaLabelProp ?? ariaLabel);

  const avatarAriaHidden =
    avatar && !avatar.name && !avatar.onClick && !avatar["aria-label"]
      ? true
      : undefined;

  const resolvedTitleId = title ? (titleId ?? `${testId}-title`) : undefined;

  return (
    <div
      className={toolbarClass}
      role="toolbar"
      aria-orientation="horizontal"
      aria-label={resolvedAriaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      data-testid={testId}
    >
      <div
        className={classMap.section}
        role="group"
        aria-label={leftAriaLabel}
        data-testid={`${testId}-left`}
      >
        {left}
      </div>

      <div
        className={classMap.section}
        role="group"
        aria-label={centerAriaLabel}
        data-testid={`${testId}-center`}
      >
        {title && (
          <TitleTag
            id={resolvedTitleId}
            className={classMap.title}
            data-testid={`${testId}-title`}
          >
            {title}
          </TitleTag>
        )}
        {center}
      </div>

      <div
        className={classMap.section}
        role="group"
        aria-label={rightAriaLabel}
        data-testid={`${testId}-right`}
      >
        {right}
        {avatar && (
          <div
            className={classMap.avatarWrapper}
            data-testid={`${testId}-avatar`}
          >
            <AvatarComponent
              name={avatar.name}
              src={avatar.src}
              size={avatar.size || "medium"}
              shape={avatar.shape || "circle"}
              theme={avatar.theme}
              outline={avatar.outline}
              onClick={avatar.onClick}
              aria-label={avatar["aria-label"]}
              aria-hidden={avatarAriaHidden}
            />
          </div>
        )}
      </div>
    </div>
  );
};

ToolbarBase.displayName = "ToolbarBase";
export default ToolbarBase;
