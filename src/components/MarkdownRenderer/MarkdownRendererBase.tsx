import React, { useMemo } from "react";
import { marked } from "marked";
import { MarkdownRendererProps } from "./MarkdownRenderer.types";
import { combineClassNames } from "../../utils/classNames";
import { capitalize } from "../../utils/capitalize";
import {
  getDefaultRounding,
  getDefaultShadow,
} from "../../config/boreal-style-config";

export interface BaseMarkdownRendererProps extends MarkdownRendererProps {
  classMap: Record<string, string>;
  language?: string;
}

function sanitizeWithDOMParser(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  doc.querySelectorAll("script").forEach((el) => el.remove());
  return doc.body.innerHTML;
}

const BaseMarkdownRenderer: React.FC<BaseMarkdownRendererProps> = ({
  content,
  className = "",
  language = "en",
  rounding = getDefaultRounding(),
  shadow = getDefaultShadow(),
  "data-testid": testId = "markdown-renderer",
  classMap,
}) => {
  const html = useMemo(() => {
    const trimmed = content.trim();
    if (!trimmed) return "";
    const raw = marked.parse(trimmed, { async: false }) as string;
    return sanitizeWithDOMParser(raw);
  }, [content]);

  const wrapperClass = useMemo(
    () =>
      combineClassNames(
        classMap.wrapper,
        shadow && classMap[`shadow${capitalize(shadow)}`],
        rounding && classMap[`round${capitalize(rounding)}`],
        className
      ),
    [classMap, rounding, shadow, className]
  );

  if (!html) {
    return (
      <div
        className={classMap.empty}
        data-testid={testId}
        role="region"
        aria-label="No markdown content"
      >
        <p>No content available.</p>
      </div>
    );
  }

  return (
    <div
      className={wrapperClass}
      data-testid={testId}
      role="region"
      aria-label="Markdown content"
      lang={language}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default BaseMarkdownRenderer;
