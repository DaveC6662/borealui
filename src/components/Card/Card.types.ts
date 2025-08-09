import { IconType } from "react-icons";
import {
  OrientationType,
  RoundingType,
  ShadowType,
  SizeType,
  StateType,
  ThemeType,
} from "../../types/types";

/**
 * Defines an action button rendered in the card footer.
 */
export interface ActionButton {
  /** Label for the button (used as visible text or aria-label). */
  label: string;
  /** Function to call on button click. */
  onClick: () => void;
  /** Optional icon for the button (used with `useIconButtons`). */
  icon?: IconType;
  /**
   * Optional theme override for the button
   * ('primary' | 'secondary' | 'tertiary' | 'quaternary' | 'clear').
   */
  theme?: ThemeType;
  /**
   * State of the action button
   * ('success' | 'error' | 'warning' | 'disabled' | '').
   */
  state?: StateType;
  /** Optional URL to render the button as a link. */
  href?: string;
  /**
   * Size for action buttons
   * ('xs' | 'small' | 'medium' | 'large' | 'xl').
   */
  size?: SizeType;
  /** Optional loading state for the button. */
  loading?: boolean;
  /**
   * Rounding style for action button
   * ('none' | 'small' | 'medium' | 'large' | 'full').
   */
  rounding?: RoundingType;
  /**
   * Shadow style for the button
   * ('none' | 'light' | 'medium' | 'strong' | 'intense').
   */
  shadow?: ShadowType;
}

/**
 * Props for the customizable Card component.
 */
export interface CardProps {
  /**
   * Theme style to apply to the card
   * ('primary' | 'secondary' | 'tertiary' | 'quaternary' | 'clear').
   */
  theme?: ThemeType;

  /**
   * State of the card
   * ('success' | 'error' | 'warning' | 'disabled' | '').
   */
  state?: StateType;

  /**
   * Optional rounding style for the card
   * ('none' | 'small' | 'medium' | 'large' | 'full').
   */
  rounding?: RoundingType;

  /**
   * Optional shadow style for the card
   * ('none' | 'light' | 'medium' | 'strong' | 'intense').
   */
  shadow?: ShadowType;

  /** Optional card title displayed in the header. */
  title?: string;

  /** Optional description displayed in the body. */
  description?: string;

  /**
   * Image URL or static asset used as the card's visual.
   * Can be a string or an object with { src, width, height }.
   */
  imageUrl?: string | { src: string; width: number; height: number };

  /** Image alt text */
  imageAlt?: string;

  /** Explicit width for the image (forwarded to next/image or <img>) */
  imageWidth?: number;

  /** Explicit height for the image (forwarded to next/image or <img>) */
  imageHeight?: number;

  /** Use fill layout for the image (next/image: fill; core: 100% cover in a ratio box) */
  imageFill?: boolean;

  /** Custom class name for the card container. */
  className?: string;

  /** Custom class name for the header section. */
  headerClassName?: string;

  /** Custom class name for the image element. */
  imageClassName?: string;

  /** Outlines card instead of solid fill. */
  outline?: boolean;

  /**
   * Card size
   * ('xs' | 'small' | 'medium' | 'large' | 'xl').
   */
  size?: SizeType;

  /**
   * Alignment of card content
   * ('left' | 'right' | 'center').
   */
  align?: "left" | "right" | "center";

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

  /**
   * Layout orientation of the card
   * ('horizontal' | 'vertical').
   */
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

  /** Optional ARIA label for the card. */
  "aria-label"?: string;
}
