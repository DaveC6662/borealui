import {
  RoundingType,
  ShadowType,
  SizeType,
  StateType,
  ThemeType,
} from "@/types/types";

export interface TagInputProps {
  tags?: string[];
  onChange?: (tags: string[]) => void;
  fetchSuggestions?: (query: string) => Promise<string[]>;
  debounceMs?: number;
  placeholder?: string;
  theme?: ThemeType;
  state?: StateType;
  size?: SizeType;
  rounding?: RoundingType;
  shadow?: ShadowType;
  ariaDescription?: string;
  "data-testid"?: string;
}
