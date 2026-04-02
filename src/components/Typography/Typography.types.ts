import { AriaRole, CSSProperties, ElementType, ReactNode } from "react";

/* Font types */
export type TypographyVariant =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body-lg"
  | "body"
  | "body-sm"
  | "label"
  | "caption"
  | "overline"
  | "code";

/* Font alignment types */
export type TypographyAlign = "left" | "center" | "right" | "inherit";

/* Font weight types */
export type TypographyWeight =
  | "light"
  | "normal"
  | "medium"
  | "bold"
  | "bolder"
  | "inherit";

/* Theme types */
export type TypographyTheme =
  | "primary"
  | "secondary"
  | "tertiary"
  | "quaternary"
  | "clear"
  | "success"
  | "warning"
  | "error"
  | "inherit";

export interface TypographyOwnProps {
  children?: ReactNode;
  variant?: TypographyVariant;
  as?: ElementType;
  align?: TypographyAlign;
  weight?: TypographyWeight;
  theme?: TypographyTheme;
  italic?: boolean;
  underline?: boolean;
  truncate?: boolean;
  noWrap?: boolean;
  srOnly?: boolean;
  className?: string;
  style?: CSSProperties;
  id?: string;
  title?: string;
  testId?: string;
  role?: AriaRole;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  "aria-hidden"?: boolean;
  "aria-live"?: "off" | "polite" | "assertive";
  "aria-atomic"?: boolean;
  "aria-busy"?: boolean;
}

export interface TypographyBaseProps extends TypographyOwnProps {
  classMap: Record<string, string>;
  combineClassNames: (
    ...classes: Array<string | false | null | undefined>
  ) => string;
}
