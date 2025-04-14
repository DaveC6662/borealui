import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MarkdownRenderer } from "@/index";

describe("MarkdownRenderer", () => {
  const markdown = `# Hello **world**`;

  it("renders markdown content as HTML", async () => {
    render(<MarkdownRenderer content={markdown} data-testid="markdown-renderer" />);
    
    await waitFor(() => {
      const rendered = screen.getByTestId("markdown-renderer");
      expect(rendered).toBeInTheDocument();
      expect(rendered.innerHTML).toContain("<h1");
      expect(rendered.innerHTML).toContain("Hello <strong>world</strong>");
    });
  });

  it("sanitizes script tags from markdown input", async () => {
    render(
      <MarkdownRenderer
        content={`# Unsafe\n<script>alert("XSS")</script>`}
        data-testid="markdown-renderer"
      />
    );

    await waitFor(() => {
      const rendered = screen.getByTestId("markdown-renderer");
      expect(rendered.innerHTML).toContain("Unsafe");
      expect(rendered.innerHTML).not.toContain("<script>");
    });
  });

  it("shows fallback loading text before content loads", async () => {
    render(<MarkdownRenderer content="# Loading..." data-testid="markdown-renderer" />);

    const fallback = screen.getByTestId("markdown-loading");
    expect(fallback).toBeInTheDocument();

    await waitFor(() => {
      const rendered = screen.getByTestId("markdown-renderer");
      expect(rendered.innerHTML).toContain("Loading...");
    });
  });
});
