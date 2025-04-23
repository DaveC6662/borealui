import SkeletonBase from "../../src/components/Skeleton/SkeletonBase";

describe("SkeletonLoaderBase (Cypress)", () => {
  const defaultLabel = "Loading content...";

  it("renders with default props and accessibility attributes", () => {
    cy.mount(<SkeletonBase />);

    cy.findByTestId("skeleton-loader")
      .should("exist")
      .and("have.attr", "role", "status")
      .and("have.attr", "aria-busy", "true")
      .and("have.attr", "aria-live", "polite")
      .and("have.attr", "aria-label", defaultLabel)
      .and("have.attr", "aria-describedby", "skeleton-loader-desc");

    cy.findByTestId("skeleton-loader-description")
      .should("exist")
      .and("have.text", defaultLabel);
  });

  it("accepts custom width, height, and label", () => {
    cy.mount(
      <SkeletonBase
        width="250px"
        height="32px"
        label="Loading chart..."
        data-testid="custom-skeleton"
      />
    );

    cy.findByTestId("custom-skeleton")
      .should("have.attr", "aria-label", "Loading chart...")
      .should("have.css", "width", "250px")
      .should("have.css", "height", "32px");

    cy.findByTestId("custom-skeleton-description").should(
      "have.text",
      "Loading chart..."
    );
  });

  it("can accept and apply a custom className", () => {
    cy.mount(<SkeletonBase className="custom-class" />);

    cy.findByTestId("skeleton-loader").should("have.class", "custom-class");
  });
});
