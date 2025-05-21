import BaseMarkdownRenderer from "@/components/MarkdownRenderer/MarkdownRendererBase";

const classNames = {
  wrapper: "markdownWrapper",
  loading: "markdownLoading",
};

describe("BaseMarkdownRenderer", () => {
  it("displays a loading message initially", () => {
    cy.mount(
      <BaseMarkdownRenderer
        content="**loading**"
        classNames={classNames}
        data-testid="markdown-renderer"
      />
    );

    cy.findByRole("status")
      .should("contain.text", "Loading markdown...")
      .and("have.attr", "aria-busy", "true");
  });

  it("renders valid markdown content", () => {
    cy.mount(
      <BaseMarkdownRenderer
        content="# Cypress Markdown Test\n**Bold Text**"
        classNames={classNames}
        data-testid="markdown-renderer"
      />
    );

    cy.findByTestId("markdown-renderer").should("exist");
    cy.findByTestId("markdown-renderer").should(
      "contain.text",
      "Cypress Markdown Test"
    );
    cy.findByTestId("markdown-renderer").should("contain.text", "Bold Text");
  });

  it("shows fallback on empty content", () => {
    cy.mount(
      <BaseMarkdownRenderer
        content=""
        classNames={classNames}
        data-testid="markdown-renderer"
      />
    );

    cy.findByRole("region", { name: /markdown content/i }).should(
      "contain.text",
      "No content available."
    );
  });

  it("applies correct language attribute", () => {
    cy.mount(
      <BaseMarkdownRenderer
        content="## Bonjour"
        classNames={classNames}
        language="fr"
        data-testid="markdown-renderer"
      />
    );

    cy.findByTestId("markdown-renderer")
      .should("have.attr", "lang", "fr")
      .and("contain.html", "<h2>Bonjour</h2>");
  });
});
