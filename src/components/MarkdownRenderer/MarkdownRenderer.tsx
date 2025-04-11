"use client";

import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";
import styles from "./MarkdownRenderer.module.scss";

/**
 * Props for the MarkdownRenderer component.
 */
interface MarkdownRendererProps {
  /** Raw markdown content to be rendered as HTML. */
  content: string;
  /** Optional additional class name for styling. */
  className?: string;
  /** Optional test ID for testing frameworks. */
  "data-testid"?: string;
}

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
}) => {
  const [html, setHtml] = useState("");
  const [, setLoading] = useState(true);

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
          className={styles.loading}
        >
          Loading markdown...
        </div>
      ) : (
        <div
          className={`${styles.markdown} ${className}`}
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
