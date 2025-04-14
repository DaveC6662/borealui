/**
 * Props for the SkeletonLoader component.
 */
export interface SkeletonLoaderProps {
  /** Width of the skeleton loader (e.g., "100%", "200px", or a number representing pixels). */
  width?: string | number;
  /** Height of the skeleton loader (e.g., "100%", "50px", or a number representing pixels). */
  height?: string | number;
  /** Additional class name(s) for custom styling. */
  className?: string;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}