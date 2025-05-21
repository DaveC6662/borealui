import DividerBase from "@/components/Divider/DividerBase";

const styles = {
  divider: "divider",
  horizontal: "horizontal",
  vertical: "vertical",
  dashed: "dashed",
  primary: "themePrimary",
};

describe("DividerBase", () => {
  it("renders horizontal divider with default styles", () => {
    cy.mount(<DividerBase styles={styles} data-testid="divider" />);
    cy.findByTestId("divider")
      .should("have.class", "divider")
      .and("have.class", "horizontal")
      .and("have.attr", "role", "separator");
  });

  it("renders vertical divider with aria-orientation", () => {
    cy.mount(
      <DividerBase
        orientation="vertical"
        styles={styles}
        data-testid="divider-vertical"
      />
    );

    cy.findByTestId("divider-vertical")
      .should("have.attr", "aria-orientation", "vertical")
      .and("have.class", "vertical");
  });

  it("renders dashed and themed styles", () => {
    cy.mount(
      <DividerBase
        dashed
        theme="primary"
        styles={styles}
        data-testid="divider-style"
      />
    );

    cy.findByTestId("divider-style")
      .should("have.class", "dashed")
      .and("have.class", "themePrimary");
  });

  it("renders as semantic <hr> element", () => {
    cy.mount(<DividerBase as="hr" styles={styles} data-testid="divider-hr" />);
    cy.findByTestId("divider-hr")
      .should("match", "hr")
      .and("not.have.attr", "role");
  });

  it("supports aria-hidden for decorative dividers", () => {
    cy.mount(
      <DividerBase
        styles={styles}
        aria-hidden="true"
        data-testid="divider-hidden"
      />
    );

    cy.findByTestId("divider-hidden").should(
      "have.attr",
      "aria-hidden",
      "true"
    );
  });
});
