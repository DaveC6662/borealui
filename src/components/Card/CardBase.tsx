import React, { useId, useMemo } from "react";
import { CardBaseProps, CardImageSource } from "./Card.types";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultSize,
  getDefaultTheme,
} from "../../config/boreal-style-config";

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
  const derivedAriaLabel = ariaLabel || title || description || "Content card";

  const FallbackImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} />
  );

  function normalizeImageSource(
    srcInput: CardImageSource,
    fallbackWidth?: number,
    fallbackHeight?: number
  ) {
    if (!srcInput) {
      return {
        src: undefined as string | undefined,
        width: fallbackWidth,
        height: fallbackHeight,
      };
    }

    if (
      typeof srcInput === "object" &&
      "src" in srcInput &&
      typeof (srcInput as any).src === "string"
    ) {
      const { src, width, height } = srcInput as any;
      const trimmed = src.trim();

      if (!trimmed) {
        return {
          src: undefined,
          width: fallbackWidth,
          height: fallbackHeight,
        };
      }

      return {
        src: trimmed,
        width: typeof width === "number" ? width : fallbackWidth,
        height: typeof height === "number" ? height : fallbackHeight,
      };
    }

    if (typeof srcInput === "string") {
      const trimmed = srcInput.trim();

      if (!trimmed) {
        return {
          src: undefined,
          width: fallbackWidth,
          height: fallbackHeight,
        };
      }

      return {
        src: trimmed,
        width: fallbackWidth,
        height: fallbackHeight,
      };
    }

    return {
      src: undefined,
      width: fallbackWidth,
      height: fallbackHeight,
    };
  }

  const isStaticObj =
    typeof imageUrl === "object" &&
    imageUrl !== null &&
    "src" in (imageUrl as any) &&
    typeof (imageUrl as any).src === "string";

  const isReactImage =
    imageUrl !== undefined && !isStaticObj && typeof imageUrl !== "string";

  const {
    src: imgSrc,
    width: resolvedWidth,
    height: resolvedHeight,
  } = normalizeImageSource(
    imageUrl as CardImageSource,
    imageWidth,
    imageHeight
  );

  const hasImage = isReactImage || !!imgSrc;

  const imgAlt = imageAlt || `${title || "Card"} image`;

  const ImageRenderer = ImageComponent || FallbackImage;
  const isNextImage = typeof ImageRenderer !== "string";

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
    [
      classMap,
      layout,
      align,
      theme,
      state,
      size,
      shadow,
      rounding,
      outline,
      loading,
      className,
    ]
  );

  return (
    <div
      data-testid={testId}
      className={cardClassName}
      role="region"
      aria-labelledby={title ? headerId : undefined}
      aria-label={!title ? derivedAriaLabel : undefined}
      aria-busy={loading || undefined}
    >
      {loading ? (
        <SkeletonComponent
          width="250px"
          height="250px"
          data-testid={`${testId}-skeleton`}
        />
      ) : (
        <div className={classMap.content}>
          {hasImage &&
            (isReactImage ? (
              <div className={classMap.media}>
                {React.isValidElement(imageUrl)
                  ? imageUrl
                  : React.createElement(imageUrl as React.ComponentType<any>)}
              </div>
            ) : imageFill ? (
              <div className={classMap.media}>
                <ImageRenderer
                  src={imgSrc as any}
                  alt={imgAlt}
                  className={combineClassNames(classMap.image, imageClassName)}
                  {...(isNextImage ? { fill: true } : {})}
                  {...(!isNextImage ? { loading: "lazy" as const } : {})}
                />
              </div>
            ) : (
              <ImageRenderer
                src={imgSrc as any}
                alt={imgAlt}
                className={combineClassNames(classMap.image, imageClassName)}
                width={resolvedWidth ?? 640}
                height={resolvedHeight ?? 360}
                {...(!isNextImage ? { loading: "lazy" as const } : {})}
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
                      data-testid={`${testId}-icon`}
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
                          ariaLabel={button.ariaLabel}
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
                          ariaLabel={button.ariaLabel}
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

CardBase.displayName = "CardBase";

export default CardBase;
