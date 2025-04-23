import React, { useEffect, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { MarkdownRendererProps } from "./MarkdownRenderer.types";

export interface BaseMarkdownRendererProps extends MarkdownRendererProps {
  classNames: {
    wrapper: string;
    loading: string;
  };
  language?: string;
}

const BaseMarkdownRenderer: React.FC<BaseMarkdownRendererProps> = ({
  content,
  className = "",
  language = "en",
  "data-testid": testId = "markdown-renderer",
  classNames,
}) => {
  const [html, setHtml] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const renderMarkdown = async () => {
      setLoading(true);

      if (!content.trim()) {
        setHtml("");
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

  if (loading) {
    return (
      <div
        data-testid="markdown-loading"
        role="status"
        aria-live="polite"
        className={classNames.loading}
        aria-busy="true"
      >
        Loading markdown...
      </div>
    );
  }

  if (!html) {
    return (
      <div
        className={classNames.wrapper}
        data-testid={testId}
        role="region"
        aria-label="Markdown content"
      >
        <p>No content available.</p>
      </div>
    );
  }

  return (
    <div
      className={`${classNames.wrapper} ${className}`}
      data-testid={testId}
      role="region"
      aria-label="Markdown content"
      lang={language}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default BaseMarkdownRenderer;
