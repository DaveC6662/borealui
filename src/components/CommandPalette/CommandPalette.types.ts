import { RoundingType, ShadowType, StateType, ThemeType } from "@/types/types";
import { ReactNode } from "react";

/**
 * Represents an individual command in the command palette.
 */
export interface CommandItem {
  /** Display label for the command. */
  label: string;
  /** Function to call when the command is selected. */
  action: () => void;
  /** Optional icon to display alongside the command label. */
  icon?: ReactNode;
}

/**
 * Props for the CommandPalette component.
 */
export interface CommandPaletteProps {
  /** Array of available command options. */
  commands: CommandItem[];

  /** Optional placeholder for the input field. */
  placeholder?: string;

  /**
   * Theme style for the palette
   * ('primary' | 'secondary' | 'tertiary' | 'quaternary' | 'clear').
   */
  theme?: ThemeType;

  /**
   * Rounding style for the palette
   * ('none' | 'small' | 'medium' | 'large' | 'full').
   */
  rounding?: RoundingType;

  /**
   * Shadow style for the palette
   * ('none' | 'light' | 'medium' | 'strong' | 'intense').
   */
  shadow?: ShadowType;

  /**
   * The state of the command palette
   * ('success' | 'error' | 'warning' | 'disabled' | '').
   */
  state?: StateType;

  /** Whether the command palette is currently open. */
  isOpen: boolean;

  /** Callback to close the command palette. */
  onClose: () => void;

  /** Callback to handle the search input asynchronously. */
  asyncSearch?: (query: string) => Promise<CommandItem[]>;

  /** Optional debounce time (in ms) for the search input. */
  debounceMs?: number;

  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}
