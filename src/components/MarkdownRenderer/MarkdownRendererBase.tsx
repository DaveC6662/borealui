import React, { useEffect, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { MarkdownRendererProps } from "./MarkdownRenderer.types";

export interface BaseMarkdownRendererProps extends MarkdownRendererProps {
  classNames: {
    wrapper: string;
    loading: string;
  };
}

const BaseMarkdownRenderer: React.FC<BaseMarkdownRendererProps> = ({
  content,
  className = "",
  "data-testid": testId = "markdown-renderer",
  classNames,
}) => {
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
          className={classNames.loading}
        >
          Loading markdown...
        </div>
      ) : (
        <div
          className={`${classNames.wrapper} ${className}`}
          data-testid={testId}
          role="region"
          aria-label="Markdown content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </>
  );
};

export default BaseMarkdownRenderer;
