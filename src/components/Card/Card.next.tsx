"use client";

import React, { JSX, useId } from "react";
import Image from "next/image";
import { Button, IconButton, Skeleton } from "@/index";
import styles from "./Card.module.scss";
import { combineClassNames } from "@/utils/classNames";
import { CardProps } from "./Card.types";

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
}: CardProps): JSX.Element => {
  const autoId = useId();
  const headerId = ariaLabelledBy || `${autoId}-header`;

  const hasImage = !!imageUrl;
  const showBlur = blur && typeof imageUrl !== "string";

  return (
    <div
      data-testid={testId}
      className={combineClassNames(styles.card, solid && styles.solid, styles[theme], loading && styles["cardLoading"], className)}
      role="region"
      aria-labelledby={headerId}
    >
      {loading ? (
        <Skeleton width="250px" height="250px" data-testid="skeleton" />
      ) : (
        <div className={combineClassNames(styles.cardContent, styles.fadeIn, styles[layout])}>
          {hasImage && (
            <Image
              src={imageUrl}
              alt={imageAlt ? imageAlt : "Card image"}
              className={combineClassNames(styles.cardImage, imageClassName)}
              width={300}
              height={200}
              sizes="(max-width: 768px) 100vw, 300px"
              priority={false}
              loading="lazy"
              placeholder={showBlur ? "blur" : undefined}
            />
          )}

          <div>
            <div className={combineClassNames(styles.cardHeader, headerClassName)} id={headerId}>
              {renderHeader ? (
                renderHeader()
              ) : (
                title && (
                  <h2 className={styles.cardTitle}>
                    {cardIcon && (
                      <span className={styles.cardIcon} aria-hidden="true" data-testid="card-icon">
                        {React.createElement(cardIcon)}
                      </span>
                    )}
                    {title}
                  </h2>
                )
              )}
            </div>

            <div className={combineClassNames(styles.cardBody, bodyClassName)}>
              {renderContent ? (
                renderContent()
              ) : (
                <>
                  {description && <p className={styles.cardDescription}>{description}</p>}
                  {children && <div className={styles.cardChildren}>{children}</div>}
                </>
              )}
            </div>

            {(actionButtons.length > 0 || renderFooter) && (
              <div className={combineClassNames(styles.cardFooter, footerClassName)}>
                {actionButtons.length > 0 && (
                  <div className={styles.cardActions}>
                    {actionButtons.map((button, index) =>
                      useIconButtons && button.icon ? (
                        <IconButton
                          key={index}
                          icon={button.icon}
                          onClick={button.onClick}
                          className={styles.actionButton}
                          theme={button.theme || "clear"}
                          ariaLabel={button.label}
                          href={button.href}
                          loading={button.loading}
                        />
                      ) : (
                        <Button
                          key={index}
                          onClick={button.onClick}
                          className={styles.actionButton}
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
