import { ThemeType } from "@/types/types";
import { ReactNode, HTMLAttributes } from "react";

/**
 * Props for the Tooltip component.
 *
 * @property {string} content - The text content to display inside the tooltip.
 * @property {"top" | "bottom" | "left" | "right"} [position="top"] - The position of the tooltip relative to the trigger element.
 * @property {ThemeType} [theme="primary"] - The theme/style variant for the tooltip.
 * @property {ReactNode} children - The trigger element(s) which will display the tooltip on hover/focus.
 * @property {string} [data-testid="tooltip"] - Optional test identifier.
 * @extends HTMLAttributes<HTMLDivElement>
 */
export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  theme?: ThemeType;
  children: ReactNode;
  "data-testid"?: string;
}
