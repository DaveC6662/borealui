import { IconType } from "react-icons";
import { ThemeType, SizeType } from "@/types/types";

/**
 * Props for the EmptyState component.
 */
export interface EmptyStateProps {
  /** Optional icon component (e.g., from react-icons). */
  icon?: IconType;
  /** Title text displayed prominently. */
  title?: string;
  /** Optional supporting message below the title. */
  message?: string;
  /** Theming option for styling (e.g., "primary", "secondary"). */
  theme?: ThemeType;
  /** Size modifier (e.g., "small", "medium", "large"). */
  size?: SizeType;
  /** Whether the component uses outline styles. */
  outline?: boolean;
  /** Optional label for an action button. */
  actionLabel?: string;
  /** Optional click handler for the action button. */
  onActionClick?: () => void;
  /** Additional class name for the container. */
  className?: string;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}