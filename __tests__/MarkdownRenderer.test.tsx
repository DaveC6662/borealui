import { render, screen, waitFor } from "@testing-library/react";
import BaseMarkdownRenderer from "@/components/MarkdownRenderer/MarkdownRendererBase";

const classNames = {
  wrapper: "markdownWrapper",
  loading: "markdownLoading",
};

describe("BaseMarkdownRenderer", () => {
  it("shows loading indicator initially", () => {
    render(
      <BaseMarkdownRenderer content="**Loading Test**" classMap={classNames} />
    );
    expect(screen.getByRole("status")).toHaveTextContent("Loading markdown...");
    expect(screen.getByRole("status")).toHaveAttribute("aria-busy", "true");
  });

  it("renders markdown content properly", async () => {
    render(
      <BaseMarkdownRenderer
        content={"# Cypress Markdown Test\n\n**Bold Text**"}
        classMap={classNames}
        data-testid="markdown-renderer"
      />
    );

    await waitFor(() => {
      const region = screen.getByRole("region", { name: /markdown content/i });
      expect(region).toContainHTML("<h1>Cypress Markdown Test</h1>");
      expect(region).toContainHTML("<strong>Bold Text</strong>");
    });
  });

  it("renders fallback message on empty content", async () => {
    render(<BaseMarkdownRenderer content=" " classMap={classNames} />);

    await waitFor(() => {
      const fallback = screen.getByRole("region", {
        name: /markdown content/i,
      });
      expect(fallback).toHaveTextContent("No content available.");
    });
  });

  it("sets the correct language attribute", async () => {
    render(
      <BaseMarkdownRenderer
        content="*Bonjour*"
        classMap={classNames}
        language="fr"
      />
    );

    await waitFor(() => {
      const region = screen.getByRole("region");
      expect(region).toHaveAttribute("lang", "fr");
    });
  });
});
