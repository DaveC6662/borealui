import { ThemeType } from "@/types/types";

/**
 * Props for the FileUpload component.
 */
export interface FileUploadProps {
  /** Label displayed above the file input. */
  label?: string;
  /** Optional description text under the label. */
  description?: string;
  /** Optional error message. */
  error?: string;
  /** Whether the file input is required. */
  required?: boolean;
  /** Theme for the buttons and progress bar. */
  theme?: ThemeType;
  /** Allows multiple file selection if true. */
  multiple?: boolean;
  /** Called after simulated upload completes. */
  onSubmit: (files: File[]) => void;
  /** External upload progress value (overrides internal simulation). */
  uploadProgress?: number;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
  /** Maximum file size in bytes (e.g., 5MB = 5 * 1024 * 1024). */
  maxFileSizeBytes?: number;
  /** Allowed file MIME types (e.g., ["image/png", "application/pdf"]). */
  allowedFileTypes?: string[];
}
