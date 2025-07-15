import {
  AttachmentType,
  RoundingType,
  ShadowType,
  ThemeType,
} from "@/types/types";

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
  logo?: React.ReactNode;

  /** Array of footer navigation links. */
  links?: FooterLink[];

  /** Array of social links with icons. */
  socialLinks?: SocialLink[];

  /** Whether to show the theme selector dropdown. */
  showThemeSelect?: boolean;
}
