import { RoundingType, ShadowType } from "@/types";

/**
 * Props for the ScrollToTopBase component.
 */
export interface ScrollToTopProps {
  /**
   * Optional rounding style applied to the button.
   */
  rounding?: RoundingType;

  /**
   * Optional shadow style for the button.
   */
  shadow?: ShadowType;

  /**
   * The scroll offset (in pixels) from the top of the page at which the button becomes visible.
   *
   * @default 300
   */
  offset?: number;

  /**
   * Additional custom class names for the root element of the component.
   */
  className?: string;

  /**
   * Test identifier for the component, used to target it in testing frameworks.
   */
  "data-testid"?: string;
}

export interface ScrollToTopBaseProps extends ScrollToTopProps {
  classMap: Record<string, string>;
  IconComponent: React.ElementType;
}
