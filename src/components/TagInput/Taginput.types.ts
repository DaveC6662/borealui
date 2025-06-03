import { SizeType, StateType, ThemeType } from "@/types/types";

export interface TagInputProps {
  tags?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  theme?: ThemeType;
  state?: StateType;
  size?: SizeType;
  ariaDescription?: string;
  "data-testid"?: string;
}
