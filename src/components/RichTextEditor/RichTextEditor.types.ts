/**
 * Props for the RichTextEditor component.
 */
export interface RichTextEditorProps {
    /**
     * The initial content of the editor in HTML or TipTap-compatible markdown.
     * @default ""
     */
    initialContent?: string;
    /**
     * Callback that is invoked whenever the editor updates.
     * The sanitized HTML content is passed as an argument.
     */
    onChange?: (safeHtml: string) => void;
    /** Optional test ID for testing frameworks. */
    "data-testid"?: string;
  }