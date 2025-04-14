import { SizeType, ThemeType } from "@/types/types";

/**
 * Props for the TagInput component.
 * @typedef {Object} TagInputProps
 * @property {string[]} [tags] - Initial list of tags.
 * @property {(tags: string[]) => void} [onChange] - Callback triggered when the tag list changes.
 * @property {string} [placeholder] - Placeholder text for the input field.
 * @property {ThemeType} [theme] - Theme style applied to the component.
 * @property {SizeType} [size] - Size variant of the component (e.g., small, medium, large).
 * @property {string} [data-testid] - Optional test ID for testing utilities.
 */
export interface TagInputProps {
    tags?: string[];
    onChange?: (tags: string[]) => void;
    placeholder?: string;
    theme?: ThemeType;
    size?: SizeType;
    "data-testid"?: string;
  }