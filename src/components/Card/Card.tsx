"use client";

import React, { useId } from "react";
import Image, { StaticImageData } from "next/image";
import { Button, IconButton, Skeleton } from "@/index";
import { IconType } from "react-icons";
import styles from "./Card.module.scss";
import { OrientationType, ThemeType } from "@/types/types";
import { combineClassNames } from "@/utils/classNames";

/**
 * Defines an action button rendered in the card footer.
 */
interface ActionButton {
  /** Label for the button (used as visible text or aria-label). */
  label: string;
  /** Function to call on button click. */
  onClick: () => void;
  /** Optional icon for the button (used with `useIconButtons`). */
  icon?: IconType;
  /** Optional theme override for the button. */
  theme?: ThemeType;
  /** Optional URL to render the button as a link. */
  href?: string;
  /** Optional loading state for the button. */
  loading?: boolean;
}

/**
 * Props for the customizable Card component.
 */
export interface CardProps {
  /** Theme style to apply to the card. */
  theme?: ThemeType;
  /** Optional card title displayed in the header. */
  title?: string;
  /** Optional description displayed in the body. */
  description?: string;
  /** Image URL or static asset used as the card's visual. */
  imageUrl?: string | StaticImageData;
  /** Image alt text */
  imageAlt?: string;
  /** Custom class name for the card container. */
  className?: string;
  /** Custom class name for the header section. */
  headerClassName?: string;
  /** Custom class name for the image element. */
  imageClassName?: string;
  /** Whether to use a solid background style. */
  solid?: boolean;
  /** Custom class name for the body section. */
  bodyClassName?: string;
  /** Custom class name for the footer section. */
  footerClassName?: string;
  /** Custom render function for the header section. */
  renderHeader?: () => React.ReactNode;
  /** Custom render function for the body/content section. */
  renderContent?: () => React.ReactNode;
  /** Custom render function for the footer section. */
  renderFooter?: () => React.ReactNode;
  /** List of action buttons to render in the footer. */
  actionButtons?: ActionButton[];
  /** Whether to render action buttons as icon buttons. */
  useIconButtons?: boolean;
  /** Whether to apply a blur effect on the image placeholder. */
  blur?: boolean;
  /** Layout orientation of the card ("vertical" or "horizontal"). */
  layout?: OrientationType;
  /** Optional icon to display beside the title. */
  cardIcon?: IconType;
  /** Optional custom children passed into the body. */
  children?: React.ReactNode;
  /** Whether the card is in a loading state (shows skeleton). */
  loading?: boolean;
  /** Optional test ID for test targeting. */
  "data-testid"?: string;
  /** Optional ARIA label reference ID for accessibility. */
  "aria-labelledby"?: string;
}

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
