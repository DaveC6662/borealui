import {
  AttachmentType,
  RoundingType,
  ShadowType,
  ThemeType,
} from "@/types/types";
import { IconButtonProps } from "../IconButton/IconButton.types";
import { ThemeSelectProps } from "../Select/Select.types";

/**
 * Represents a navigational link in the footer.
 */
interface FooterLink {
  /** Text label of the link. */
  label: string;
  /** URL the link navigates to. */
  href: string;
}

/**
 * Represents a social media link with an icon and tracking metadata.
 */
interface SocialLink {
  /** Platform name (used for analytics and accessibility). */
  title: string;
  /** Icon to display (React component). */
  icon: React.ComponentType;
  /** URL to open when clicked. */
  href: string;
}

export type LogoSource =
  | React.ReactNode
  | string
  | { src: string; width?: number; height?: number };

export type LogoImage = { src: string; width?: number; height?: number };

/**
 * Props for the Footer component.
 */
export interface FooterProps {
  /**
   * Theme used for styling.
   * ('primary' | 'secondary' | 'tertiary' | 'quaternary' | 'clear')
   */
  theme?: ThemeType;

  /** Optional class name for custom styles. */
  className?: string;

  /**
   * Attachment type for how the footer is positioned.
   * ('static' | 'fixed' | 'sticky')
   */
  attachment?: AttachmentType;

  /**
   * Shadow of the component.
   * ('none' | 'light' | 'medium' | 'strong' | 'intense')
   */
  shadow?: ShadowType;

  /**
   * Rounding of the component.
   * ('none' | 'small' | 'medium' | 'large' | 'full')
   */
  rounding?: RoundingType;

  /** Test ID for testing frameworks. */
  "data-testid"?: string;

  /** Optional copyright text. */
  copyright?: string;

  /** Optional logo element (e.g., <img>, <Logo />) */
  logo?: LogoSource;

  /** Array of footer navigation links. */
  links?: FooterLink[];

  /** Array of social links with icons. */
  socialLinks?: SocialLink[];

  /** Whether to show the theme selector dropdown. */
  showThemeSelect?: boolean;
}

export type LinkWrapperProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children" | "className"
> & {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export type LinkWrapperComponent = React.ComponentType<LinkWrapperProps>;

export type ImageLikeProps = {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  "data-testid"?: string;
};

export type ImageComponent = React.ComponentType<ImageLikeProps>;

export interface BaseFooterProps extends FooterProps {
  IconButton: React.ComponentType<IconButtonProps>;
  ThemeSelect: React.ComponentType<ThemeSelectProps>;
  ImageComponent?: ImageComponent | "img";
  classMap: Record<string, string>;
  LinkWrapper?: LinkWrapperComponent;
}
