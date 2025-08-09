import React, { useId, useMemo } from "react";
import { ActionButton, CardProps } from "./Card.types";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultSize,
  getDefaultTheme,
} from "../../config/boreal-style-config";

type ExtendedActionButton = ActionButton & {
  buttonComponent: React.ElementType;
  iconButtonComponent: React.ElementType;
};

export interface CardBaseProps extends CardProps {
  classMap: Record<string, string>;
  SkeletonComponent: React.FC<{
    width: string;
    height: string;
    ["data-testid"]?: string;
  }>;
  ImageComponent?: React.ElementType;
  actionButtons: ExtendedActionButton[];
}

const CardBase: React.FC<CardBaseProps> = ({
  theme = getDefaultTheme(),
  state = "",
  cardIcon,
  title = "",
  description = "",
  rounding = getDefaultRounding(),
  shadow = getDefaultShadow(),
  imageUrl,
  imageAlt,
  imageHeight,
  imageWidth,
  imageFill,
  className = "",
  imageClassName = "",
  headerClassName = "",
  bodyClassName = "",
  footerClassName = "",
  outline = false,
  size = getDefaultSize(),
  align = "center",
  renderHeader,
  renderContent,
  renderFooter,
  actionButtons = [],
  useIconButtons = false,
  layout = "vertical",
  blur = false,
  loading = false,
  children,
  "data-testid": testId = "card",
  "aria-labelledby": ariaLabelledBy,
  "aria-label": ariaLabel,
  classMap,
  SkeletonComponent,
  ImageComponent,
}) => {
  const autoId = useId();
  const headerId = ariaLabelledBy || `${autoId}-header`;
  const descriptionId = `${autoId}-description`;
  const hasImage = !!imageUrl;
  const showBlur = blur && typeof imageUrl !== "string";
  const derivedAriaLabel = ariaLabel || title || description || "Content card";

  const FallbackImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} />
  );

  const hasImageObj =
    typeof imageUrl === "object" && imageUrl && "src" in imageUrl;
  const imgSrc = hasImageObj ? imageUrl.src : (imageUrl as string | undefined);

  const resolvedWidth =
    (hasImageObj ? (imageUrl as any).width : undefined) ?? imageWidth;
  const resolvedHeight =
    (hasImageObj ? (imageUrl as any).height : undefined) ?? imageHeight;

  const imgAlt = imageAlt || `${title || "Card"} image`;

  const ImageRenderer = ImageComponent || FallbackImage;

  const cardClassName = useMemo(
    () =>
      combineClassNames(
        classMap.card,
        classMap[layout],
        align && classMap[align],
        classMap[theme],
        classMap[state],
        classMap[size],
        shadow && classMap[`shadow${capitalize(shadow)}`],
        rounding && classMap[`round${capitalize(rounding)}`],
        outline && classMap.outline,
        loading && classMap.loading,
        className
      ),
    [classMap, size, outline, align, className]
  );

  return (
    <div
      data-testid={testId}
      className={cardClassName}
      role="region"
      aria-labelledby={title ? headerId : undefined}
      aria-label={!title ? derivedAriaLabel : undefined}
    >
      {loading ? (
        <SkeletonComponent width="100%" height="250px" data-testid="skeleton" />
      ) : (
        <div className={classMap.content}>
          {hasImage &&
            (imageFill ? (
              <div className={classMap.media}>
                <ImageRenderer
                  src={imgSrc as any}
                  alt={imgAlt}
                  className={combineClassNames(classMap.image, imageClassName)}
                  fill
                />
              </div>
            ) : (
              <ImageRenderer
                src={imgSrc as any}
                alt={imgAlt}
                className={combineClassNames(classMap.image, imageClassName)}
                width={resolvedWidth ?? 640}
                height={resolvedHeight ?? 360}
              />
            ))}

          <div>
            <div
              className={combineClassNames(classMap.header, headerClassName)}
              id={headerId}
            >
              {renderHeader ? (
                renderHeader()
              ) : title ? (
                <h2 className={classMap.title}>
                  {cardIcon && (
                    <span
                      className={classMap.icon}
                      aria-hidden="true"
                      data-testid="card-icon"
                    >
                      {React.createElement(cardIcon)}
                    </span>
                  )}
                  {title}
                </h2>
              ) : null}
            </div>

            <div
              className={combineClassNames(classMap.body, bodyClassName)}
              role="group"
              aria-describedby={description ? descriptionId : undefined}
            >
              {renderContent ? (
                renderContent()
              ) : (
                <>
                  {description && (
                    <p id={descriptionId} className={classMap.description}>
                      {description}
                    </p>
                  )}
                  {children && (
                    <div className={classMap.children}>{children}</div>
                  )}
                </>
              )}
            </div>

            {(actionButtons.length > 0 || renderFooter) && (
              <div
                className={combineClassNames(classMap.footer, footerClassName)}
              >
                {actionButtons.length > 0 && (
                  <div className={classMap.actions}>
                    {actionButtons.map((button, index) =>
                      useIconButtons && button.icon ? (
                        <button.iconButtonComponent
                          key={index}
                          icon={button.icon}
                          onClick={button.onClick}
                          className={classMap.action_button}
                          theme={button.theme || "clear"}
                          state={button.state || ""}
                          aria-label={button.label}
                          size={button.size || size}
                          href={button.href}
                          loading={button.loading}
                        />
                      ) : (
                        <button.buttonComponent
                          key={index}
                          onClick={button.onClick}
                          className={classMap.action_button}
                          theme={button.theme || "secondary"}
                          state={button.state || ""}
                          href={button.href}
                          loading={button.loading}
                          size={button.size || size}
                          aria-label={button.label}
                        >
                          {button.label}
                        </button.buttonComponent>
                      )
                    )}
                  </div>
                )}
                {renderFooter && renderFooter()}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardBase;
