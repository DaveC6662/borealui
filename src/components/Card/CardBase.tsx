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
  solid = false,
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
  classMap,
  SkeletonComponent,
  ImageComponent,
}) => {
  const autoId = useId();
  const headerId = ariaLabelledBy || `${autoId}-header`;
  const hasImage = !!imageUrl;
  const showBlur = blur && typeof imageUrl !== "string";

  return (
    <div
      data-testid={testId}
      className={combineClassNames(
        classMap.card,
        solid && classMap.solid,
        classMap[theme],
        loading && classMap.cardLoading,
        className
      )}
      role="region"
      aria-labelledby={headerId}
    >
      {loading ? (
        <SkeletonComponent width="100%" height="250px" data-testid="skeleton" />
      ) : (
        <div
          className={combineClassNames(
            classMap.cardContent,
            classMap.fadeIn,
            classMap[layout]
          )}
        >
          {hasImage && ImageComponent && (
            <ImageComponent
              src={imageUrl}
              alt={imageAlt || "Card image"}
              className={combineClassNames(classMap.cardImage, imageClassName)}
              placeholder={showBlur ? "blur" : undefined}
            />
          )}
          <div>
            <div
              className={combineClassNames(
                classMap.cardHeader,
                headerClassName
              )}
              id={headerId}
            >
              {renderHeader ? (
                renderHeader()
              ) : title ? (
                <h2 className={classMap.cardTitle}>
                  {cardIcon && (
                    <span
                      className={classMap.cardIcon}
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
              className={combineClassNames(classMap.cardBody, bodyClassName)}
            >
              {renderContent ? (
                renderContent()
              ) : (
                <>
                  {description && (
                    <p className={classMap.cardDescription}>{description}</p>
                  )}
                  {children && (
                    <div className={classMap.cardChildren}>{children}</div>
                  )}
                </>
              )}
            </div>

            {(actionButtons.length > 0 || renderFooter) && (
              <div
                className={combineClassNames(
                  classMap.cardFooter,
                  footerClassName
                )}
              >
                {actionButtons.length > 0 && (
                  <div className={classMap.cardActions}>
                    {actionButtons.map((button, index) =>
                      useIconButtons && button.icon ? (
                        <button.iconButtonComponent
                          key={index}
                          icon={button.icon}
                          onClick={button.onClick}
                          className={classMap.actionButton}
                          theme={button.theme || "clear"}
                          ariaLabel={button.label}
                          href={button.href}
                          loading={button.loading}
                        />
                      ) : (
                        <button.buttonComponent
                          key={index}
                          onClick={button.onClick}
                          className={classMap.actionButton}
                          theme={button.theme || "secondary"}
                          href={button.href}
                          loading={button.loading}
                          ariaLabel={button.label}
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
