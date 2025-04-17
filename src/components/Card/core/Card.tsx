import React, { useId } from "react";
import Button from "../../Buttons/Button/core/Button";
import IconButton from "../../Buttons/IconButton/core/IconButton";
import Skeleton from "../../Skeleton/core/Skeleton";
import "./Card.scss";
import { combineClassNames } from "../../../utils/classNames";
import { CardProps } from "../Card.types";


/**
 * A highly flexible and themeable card component with optional media,
 * header, footer, and content customization. Includes loading state
 * and accessible markup.
 *
 * @param {CardProps} props - Component props.
 * @returns {JSX.Element} Rendered Card component.
 */
const Card: React.FC<CardProps> = ({
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
}) => {
  const autoId = useId();
  const headerId = ariaLabelledBy || `${autoId}-header`;
  const hasImage = !!imageUrl;

  return (
    <div
      data-testid={testId}
      className={combineClassNames(
        "card",
        solid && "solid",
        theme,
        loading && "cardLoading",
        className
      )}
      role="region"
      aria-labelledby={headerId}
    >
      {loading ? (
        <Skeleton width="100%" height="250px" data-testid="skeleton" />
      ) : (
        <div
          className={combineClassNames(
            "cardContent",
            "fadeIn",
            layout
          )}
        >
          {hasImage && (
            <img
              src={typeof imageUrl === "string" ? imageUrl : imageUrl?.src}
              alt={imageAlt || "Card image"}
              className={combineClassNames("cardImage", imageClassName)}
              loading="lazy"
            />
          )}

          <div>
            <div
              className={combineClassNames("cardHeader", headerClassName)}
              id={headerId}
            >
              {renderHeader ? (
                renderHeader()
              ) : title ? (
                <h2 className={"cardTitle"}>
                  {cardIcon && (
                    <span
                      className={"cardIcon"}
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

            <div className={combineClassNames("cardBody", bodyClassName)}>
              {renderContent ? (
                renderContent()
              ) : (
                <>
                  {description && (
                    <p className={"cardDescription"}>{description}</p>
                  )}
                  {children && (
                    <div className={"cardChildren"}>{children}</div>
                  )}
                </>
              )}
            </div>

            {(actionButtons.length > 0 || renderFooter) && (
              <div
                className={combineClassNames(
                  "cardFooter",
                  footerClassName
                )}
              >
                {actionButtons.length > 0 && (
                  <div className={"cardActions"}>
                    {actionButtons.map((button, index) =>
                      useIconButtons && button.icon ? (
                        <IconButton
                          key={index}
                          icon={button.icon}
                          onClick={button.onClick}
                          className={"actionButton"}
                          theme={button.theme || "clear"}
                          ariaLabel={button.label}
                          href={button.href}
                          loading={button.loading}
                        />
                      ) : (
                        <Button
                          key={index}
                          onClick={button.onClick}
                          className={"actionButton"}
                          theme={button.theme || "secondary"}
                          href={button.href}
                          loading={button.loading}
                          ariaLabel={button.label}
                        >
                          {button.label}
                        </Button>
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

export default Card;
