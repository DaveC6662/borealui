import React, { useId, useMemo } from "react";
import { CardBaseProps, CardImageSource, StaticCardImage } from "./Card.types";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
  getDefaultSize,
  getDefaultTheme,
  getDefaultBorder,
} from "../../config/boreal-style-config";

const CardBase: React.FC<CardBaseProps> = ({
  theme = getDefaultTheme(),
  state = "",
  cardIcon,
  title = "",
  border = getDefaultBorder(),
  description = "",
  rounding = getDefaultRounding(),
  shadow = getDefaultShadow(),
  imageUrl,
  imageAlt,
  imageHeight,
  imageWidth,
  imageFill,
  imageDecorative = false,
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
  id,
  role,
  tabIndex,
  selectable = false,
  selected = false,
  disabled = false,
  "data-testid": testId = "card",
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  "aria-expanded": ariaExpanded,
  "aria-controls": ariaControls,
  "aria-current": ariaCurrent,
  "aria-live": ariaLive,
  "aria-atomic": ariaAtomic,
  headerId,
  descriptionId,
  classMap,
  SkeletonComponent,
  ImageComponent,
}) => {
  const autoId = useId();
  const resolvedHeaderId = headerId || ariaLabelledBy || `${autoId}-header`;
  const resolvedDescriptionId = descriptionId || `${autoId}-description`;

  const hasTitle = Boolean(title);
  const hasDescription = Boolean(description);

  const derivedAriaLabel = ariaLabel || title || description || "Content card";

  const resolvedRole =
    role ||
    (selectable ? "button" : hasTitle || ariaLabel ? "region" : undefined);

  const FallbackImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img {...props} />
  );

  function isStaticCardImage(value: unknown): value is StaticCardImage {
    return (
      typeof value === "object" &&
      value !== null &&
      "src" in value &&
      typeof (value as { src: unknown }).src === "string"
    );
  }

  function normalizeImageSource(
    srcInput: CardImageSource | undefined,
    fallbackWidth?: number,
    fallbackHeight?: number,
  ): { src?: string; width?: number; height?: number } {
    if (!srcInput) {
      return { src: undefined, width: fallbackWidth, height: fallbackHeight };
    }

    if (typeof srcInput === "string") {
      const trimmed = srcInput.trim();
      if (!trimmed) {
        return { src: undefined, width: fallbackWidth, height: fallbackHeight };
      }
      return { src: trimmed, width: fallbackWidth, height: fallbackHeight };
    }

    if (isStaticCardImage(srcInput)) {
      const trimmed = srcInput.src.trim();
      if (!trimmed) {
        return { src: undefined, width: fallbackWidth, height: fallbackHeight };
      }

      return {
        src: trimmed,
        width: srcInput.width ?? fallbackWidth,
        height: srcInput.height ?? fallbackHeight,
      };
    }

    return { src: undefined, width: fallbackWidth, height: fallbackHeight };
  }

  const {
    src: imgSrc,
    width: resolvedWidth,
    height: resolvedHeight,
  } = normalizeImageSource(imageUrl, imageWidth, imageHeight);

  const hasImage = Boolean(imgSrc);
  const imgAlt = imageDecorative ? "" : imageAlt || `${title || "Card"} image`;

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
        border && classMap[`border${capitalize(border)}`],
        outline && classMap.outline,
        loading && classMap.loading,
        disabled && classMap.disabled,
        selected && classMap.selected,
        selectable && classMap.selectable,
        className,
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
      border,
      outline,
      loading,
      disabled,
      selected,
      selectable,
      className,
    ],
  );

  return (
    <div
      id={id}
      data-testid={testId}
      className={cardClassName}
      role={resolvedRole}
      tabIndex={disabled ? -1 : tabIndex}
      aria-labelledby={
        hasTitle && !ariaLabel ? resolvedHeaderId : ariaLabelledBy
      }
      aria-describedby={
        ariaDescribedBy || (hasDescription ? resolvedDescriptionId : undefined)
      }
      aria-label={!hasTitle || ariaLabel ? derivedAriaLabel : undefined}
      aria-busy={loading || undefined}
      aria-disabled={disabled || undefined}
      aria-pressed={selectable ? selected : undefined}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      aria-current={ariaCurrent}
      aria-live={ariaLive}
      aria-atomic={ariaAtomic}
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
            imgSrc &&
            (imageFill ? (
              <div className={classMap.media}>
                <ImageRenderer
                  src={imgSrc}
                  alt={imgAlt}
                  className={combineClassNames(classMap.image, imageClassName)}
                  fill
                />
              </div>
            ) : (
              <ImageRenderer
                src={imgSrc}
                alt={imgAlt}
                className={combineClassNames(classMap.image, imageClassName)}
                width={resolvedWidth ?? 640}
                height={resolvedHeight ?? 360}
              />
            ))}

          <div>
            <div
              className={combineClassNames(classMap.header, headerClassName)}
              id={resolvedHeaderId}
            >
              {renderHeader ? (
                renderHeader()
              ) : hasTitle ? (
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

            <div className={combineClassNames(classMap.body, bodyClassName)}>
              {renderContent ? (
                renderContent()
              ) : (
                <>
                  {hasDescription && (
                    <p
                      id={resolvedDescriptionId}
                      className={classMap.description}
                    >
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
                          aria-label={button["aria-label"] || button.label}
                          aria-describedby={button["aria-describedby"]}
                          aria-labelledby={button["aria-labelledby"]}
                          aria-pressed={button["aria-pressed"]}
                          aria-expanded={button["aria-expanded"]}
                          aria-controls={button["aria-controls"]}
                          aria-current={button["aria-current"]}
                          role={button.role}
                          title={button.title}
                          size={button.size || size}
                          href={button.href}
                          loading={button.loading}
                          disabled={button.disabled}
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
                          ariaLabel={button["aria-label"] || button.label}
                          aria-describedby={button["aria-describedby"]}
                          aria-labelledby={button["aria-labelledby"]}
                          aria-pressed={button["aria-pressed"]}
                          aria-expanded={button["aria-expanded"]}
                          aria-controls={button["aria-controls"]}
                          aria-current={button["aria-current"]}
                          role={button.role}
                          title={button.title}
                          disabled={button.disabled}
                        >
                          {button.label}
                        </button.buttonComponent>
                      ),
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
