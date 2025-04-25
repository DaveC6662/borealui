import React, { useId } from "react";
import { ActionButton, CardProps } from "./Card.types";
import { combineClassNames } from "@/utils/classNames";

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
  theme = "primary",
  cardIcon,
  title = "",
  description = "",
  imageUrl,
  imageAlt,
  className = "",
  imageClassName = "",
  headerClassName = "",
  bodyClassName = "",
  footerClassName = "",
  outline = false,
  size = "medium",
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

  const ImageRenderer = ImageComponent || FallbackImage;

  const cardClassName = combineClassNames(
    classMap.card,
    classMap[`card_${theme}`],
    classMap[`card_${size}`],
    classMap[`card_${layout}`],
    outline && classMap[`card_${theme}_outline`],
    loading && classMap["card_loading"],
    align && classMap[`card_${align}`],
    className
  );

  const contentClassName = combineClassNames(classMap["card_content"]);

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
        <div className={contentClassName}>
          {hasImage && (
            <ImageRenderer
              src={imageUrl}
              alt={imageAlt || `${title || "Card"} image`}
              className={combineClassNames(
                classMap["card_image"],
                imageClassName
              )}
              placeholder={showBlur ? "blur" : undefined}
            />
          )}

          <div>
            <div
              className={combineClassNames(
                classMap["card_header"],
                headerClassName
              )}
              id={headerId}
            >
              {renderHeader ? (
                renderHeader()
              ) : title ? (
                <h2 className={classMap["card_title"]}>
                  {cardIcon && (
                    <span
                      className={classMap["card_icon"]}
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
              className={combineClassNames(
                classMap["card_body"],
                bodyClassName
              )}
              role="group"
              aria-describedby={description ? descriptionId : undefined}
            >
              {renderContent ? (
                renderContent()
              ) : (
                <>
                  {description && (
                    <p
                      id={descriptionId}
                      className={classMap["card_description"]}
                    >
                      {description}
                    </p>
                  )}
                  {children && (
                    <div className={classMap["card_children"]}>{children}</div>
                  )}
                </>
              )}
            </div>

            {(actionButtons.length > 0 || renderFooter) && (
              <div
                className={combineClassNames(
                  classMap["card_footer"],
                  footerClassName
                )}
              >
                {actionButtons.length > 0 && (
                  <div className={classMap["card_actions"]}>
                    {actionButtons.map((button, index) =>
                      useIconButtons && button.icon ? (
                        <button.iconButtonComponent
                          key={index}
                          icon={button.icon}
                          onClick={button.onClick}
                          className={classMap["card_action_button"]}
                          theme={button.theme || "clear"}
                          aria-label={button.label}
                          size={button.size || size}
                          href={button.href}
                          loading={button.loading}
                        />
                      ) : (
                        <button.buttonComponent
                          key={index}
                          onClick={button.onClick}
                          className={classMap["card_action_button"]}
                          theme={button.theme || "secondary"}
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
