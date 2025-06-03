import { StateType, ThemeType } from "@/types/types";
import { ReactNode, HTMLAttributes } from "react";

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  theme?: ThemeType;
  state?: StateType;
  children: ReactNode;
  "data-testid"?: string;
}
