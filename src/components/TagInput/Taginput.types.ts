import {
  RoundingType,
  ShadowType,
  SizeType,
  StateType,
  ThemeType,
} from "@/types/types";
import { IconButtonProps } from "../IconButton/IconButton.types";
import { TextInputProps } from "../TextInput/TextInput.types";

/**
 * Props for the TagInput component.
 */
export interface TagInputProps {
  /** Array of current tags. */
  tags?: string[];
  /**
   * Callback fired when tags change.
   * Receives the new array of tags.
   */
  onChange?: (tags: string[]) => void;
  /**
   * Optional function to fetch autocomplete suggestions based on input query.
   * Should return a promise resolving to a string array.
   */
  fetchSuggestions?: (query: string) => Promise<string[]>;
  /** Debounce time (ms) for suggestions/autocomplete fetches. */
  debounceMs?: number;
  /** Placeholder text displayed in the input when empty. */
  placeholder?: string;
  /**
   * Theme for styling the input and tags.
   * One of: "primary" | "secondary" | "tertiary" | "quaternary" | "clear"
   */
  theme?: ThemeType;
  /**
   * State of the input (for feedback/validation).
   * One of: "success" | "error" | "warning" | "disabled" | ""
   */
  state?: StateType;
  /**
   * Size of the input and tags.
   * One of: "xs" | "small" | "medium" | "large" | "xl"
   */
  size?: SizeType;
  /**
   * Rounding style for the input and tags.
   * One of: "none" | "small" | "medium" | "large" | "full"
   */
  rounding?: RoundingType;
  /**
   * Shadow style for the input and tags.
   * One of: "none" | "light" | "medium" | "strong" | "intense"
   */
  shadow?: ShadowType;
  /** Optional description for accessibility (aria-describedby). */
  ariaDescription?: string;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

export type TagInputBaseProps = TagInputProps & {
  classMap: Record<string, string>;
  IconButton: React.FC<IconButtonProps>;
  TextInput: React.FC<TextInputProps>;
};
