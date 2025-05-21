describe("Toolbar Component", () => {
  it("renders the toolbar with expected content", () => {
    cy.visit("/toolbar-test");

    cy.findByRole("banner").should("exist");
    cy.findByRole("heading", { name: /toolbar title/i }).should("exist");
    cy.findByTestId("toolbar-left").should("contain.text", "Left");
    cy.findByTestId("toolbar-right").should("contain.text", "Right");
  });
});
