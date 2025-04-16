import React, { JSX, useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";
import "./MarkdownRenderer.scss";
import { MarkdownRendererProps } from "../MarkdownRenderer.types";

/**
 * MarkdownRenderer safely converts markdown input to sanitized HTML using `marked` and `DOMPurify`.
 *
 * It handles empty or loading states, ensures safe rendering against XSS,
 * and supports accessibility via proper ARIA roles.
 *
 * @param {MarkdownRendererProps} props - Component props.
 * @returns {JSX.Element} Sanitized and styled HTML rendered from markdown input.
 */
const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = "",
  "data-testid": testId = "markdown-renderer",
}: MarkdownRendererProps): JSX.Element => {
  const [html, setHtml] = useState<string>("");
  const [, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const renderMarkdown = async () => {
      setLoading(true);

      if (!content.trim()) {
        setHtml("<p>No content available.</p>");
        setLoading(false);
        return;
      }

      const raw = await marked.parse(content);
      const clean = DOMPurify.sanitize(raw, { USE_PROFILES: { html: true } });
      setHtml(clean);
      setLoading(false);
    };

    renderMarkdown();
  }, [content]);

  return (
    <>
      {!html ? (
        <div
          data-testid="markdown-loading"
          role="status"
          aria-live="polite"
          className={"loading"}
        >
          Loading markdown...
        </div>
      ) : (
        <div
          className={`${"markdown"} ${className}`}
          data-testid={testId}
          role="region"
          aria-label="Markdown content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </>
  );
};

export default MarkdownRenderer;
