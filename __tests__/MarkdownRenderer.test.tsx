import { render, screen, waitFor } from "@testing-library/react";
import BaseMarkdownRenderer from "@/components/MarkdownRenderer/MarkdownRendererBase";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

const classNames = {
  wrapper: "markdownWrapper",
  loading: "markdownLoading",
  empty: "markdownEmpty",
  shadowMedium: "shadowMedium",
  roundMedium: "roundMedium",
};

describe("BaseMarkdownRenderer", () => {
  it("renders markdown content properly", async () => {
    render(
      <BaseMarkdownRenderer
        content={"# Cypress Markdown Test\n\n**Bold Text**"}
        classMap={classNames}
        data-testid="markdown-renderer"
      />
    );

    await waitFor(() => {
      const region = screen.getByRole("region", {
        name: /markdown content/i,
      });
      expect(region).toBeInTheDocument();
      expect(region.innerHTML).toContain("<h1>Cypress Markdown Test</h1>");
      expect(region.innerHTML).toContain("<strong>Bold Text</strong>");
    });
  });

  it("renders fallback message on empty content", async () => {
    render(
      <BaseMarkdownRenderer
        content=" "
        classMap={classNames}
        data-testid="markdown-renderer"
      />
    );

    await waitFor(() => {
      const region = screen.getByRole("region", {
        name: /no markdown content/i,
      });
      expect(region).toHaveTextContent("No content available.");
    });
  });

  it("sets the correct language attribute", async () => {
    render(
      <BaseMarkdownRenderer
        content="*Bonjour*"
        classMap={classNames}
        language="fr"
        data-testid="markdown-renderer"
      />
    );

    await waitFor(() => {
      const region = screen.getByRole("region", {
        name: /markdown content/i,
      });
      expect(region).toHaveAttribute("lang", "fr");
    });
  });

  it("has no accessibility violations with rendered markdown", async () => {
    const { container } = render(
      <BaseMarkdownRenderer
        content={"# Accessibility Test\n\n**Accessible content**"}
        classMap={classNames}
        data-testid="markdown-renderer"
      />
    );

    await waitFor(() =>
      expect(
        screen.getByRole("region", { name: /markdown content/i })
      ).toBeInTheDocument()
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
