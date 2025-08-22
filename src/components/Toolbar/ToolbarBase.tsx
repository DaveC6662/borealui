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
  left,
  center,
  right,
  avatar,
  theme = getDefaultTheme(),
  shadow = getDefaultShadow(),
  rounding = getDefaultRounding(),
  className = "",
  "data-testid": testId = "toolbar",
  AvatarComponent,
  classMap,
  ariaLabel = "Toolbar",
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
        rounding && classMap[`round${capitalize(rounding)}`]
      ),
    [classMap, theme, className, shadow, rounding]
  );

  const avatarAriaHidden =
    avatar && !avatar.name && !avatar.onClick ? true : undefined;

  return (
    <div
      className={toolbarClass}
      role="toolbar"
      aria-orientation="horizontal"
      aria-label={ariaLabel}
      data-testid={testId}
    >
      <div
        className={classMap.section}
        role="group"
        aria-label="Toolbar left section"
        data-testid={`${testId}-left`}
      >
        {left}
      </div>

      <div
        className={classMap.section}
        role="group"
        aria-label="Toolbar center section"
        data-testid={`${testId}-center`}
      >
        {title && (
          <TitleTag className={classMap.title} data-testid={`${testId}-title`}>
            {title}
          </TitleTag>
        )}
        {center}
      </div>

      <div
        className={classMap.section}
        role="group"
        aria-label="Toolbar right section"
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
