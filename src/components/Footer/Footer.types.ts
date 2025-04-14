import { ThemeType } from "@/types/types";

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
    /** Theme used for styling (e.g., "primary", "secondary"). */
    theme?: ThemeType;
    /** Optional class name for custom styles. */
    className?: string;
    /** Test ID for testing frameworks. */
    "data-testid"?: string;
    /** Optional copyright text. */
    copyright?: string;
    /** Array of footer navigation links. */
    links?: FooterLink[];
    /** Array of social links with icons. */
    socialLinks?: SocialLink[];
    /** Whether to show the theme selector dropdown. */
    showThemeSelect?: boolean;
  }
  