import SpinnerBase from "@/components/Spinner/SpinnerBase";

describe("SpinnerBase", () => {
  const styles = {
    spinner: "spinner",
    primary: "primary",
    secondary: "secondary",
  };

  it("renders and is visible", () => {
    cy.mount(<SpinnerBase size={40} theme="primary" styles={styles} />);
    cy.findByTestId("spinner")
      .should("exist")
      .and("have.css", "width", "40px")
      .and("have.css", "height", "40px");
  });

  it("has accessibility attributes", () => {
    cy.mount(<SpinnerBase label="Loading data..." styles={styles} />);
    cy.findByRole("status")
      .should("have.attr", "aria-busy", "true")
      .and("have.attr", "aria-label", "Loading data...")
      .and("have.attr", "aria-live", "polite");
  });

  it("is visible on various screen sizes", () => {
    cy.viewport(320, 568); // iPhone SE
    cy.mount(<SpinnerBase size={30} styles={styles} />);
    cy.findByTestId("spinner").should("be.visible");

    cy.viewport(1024, 768); // Tablet
    cy.mount(<SpinnerBase size={60} styles={styles} />);
    cy.findByTestId("spinner").should("be.visible");
  });
});
