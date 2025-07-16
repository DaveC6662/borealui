import React, { JSX, useMemo } from "react";
import { combineClassNames } from "../../utils/classNames";
import { ToolbarBaseProps, ToolbarProps } from "./Toolbar.types";
import { capitalize } from "../../utils/capitalize";
import {
  defaultRounding,
  defaultShadow,
  defaultTheme,
} from "../../config/boreal-style-config";

export const ToolbarBase: React.FC<ToolbarBaseProps> = ({
  title,
  left,
  center,
  right,
  avatar,
  theme = defaultTheme,
  shadow = defaultShadow,
  rounding = defaultRounding,
  className = "",
  "data-testid": testId = "toolbar",
  AvatarComponent,
  classMap,
  ariaLabel = "Toolbar",
  headingLevel = 1,
}): JSX.Element => {
  const TitleTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;

  const headerClass = useMemo(
    () =>
      combineClassNames(
        classMap.toolbar,
        classMap[theme],
        className,
        shadow && classMap[`shadow${capitalize(shadow)}`],
        rounding && classMap[`round${capitalize(rounding)}`]
      ),
    [classMap, theme, className]
  );

  return (
    <header
      className={headerClass}
      role="banner"
      aria-label={ariaLabel}
      data-testid={testId}
    >
      <div
        className={classMap.section}
        role="navigation"
        aria-label="Toolbar left section"
        data-testid={`${testId}-left`}
      >
        {left}
      </div>

      <div
        className={classMap.section}
        role="navigation"
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
        role="navigation"
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
              aria-hidden={!avatar.name}
            />
          </div>
        )}
      </div>
    </header>
  );
};
