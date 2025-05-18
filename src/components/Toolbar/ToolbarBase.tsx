import React, { JSX } from "react";
import { combineClassNames } from "../../utils/classNames";
import { ToolbarProps } from "./Toolbar.types";

export const ToolbarBase: React.FC<
  ToolbarProps & {
    AvatarComponent: React.FC<any>;
    classMap: Record<string, string>;
    ariaLabel?: string;
    headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  }
> = ({
  title,
  left,
  center,
  right,
  avatar,
  theme = "primary",
  className = "",
  "data-testid": testId = "toolbar",
  AvatarComponent,
  classMap,
  ariaLabel = "Toolbar",
  headingLevel = 1,
}): JSX.Element => {
  const TitleTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;

  return (
    <header
      className={combineClassNames(
        classMap.toolbar,
        classMap[theme],
        className
      )}
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
