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
   * The icon component to display inside the scroll-to-top button.
   *
   * @example
   * ```tsx
   * import { FaArrowUp } from "react-icons/fa";
   *
   * <ScrollToTopBase IconComponent={FaArrowUp} />
   * ```
   */
  IconComponent: React.ElementType;

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
