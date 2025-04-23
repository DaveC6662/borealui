import { BadgeBase } from "@/components/Badge/BadgeBase";

const classMap = {
  badge: "badge",
  primary: "primary",
  medium: "medium",
  outline: "outline",
  icon: "icon",
};

const DummyIcon = () => <svg data-testid="icon-svg" />;

describe("BadgeBase (Cypress)", () => {
  it("renders with text and accessible role", () => {
    cy.mount(<BadgeBase text="Beta" classMap={classMap} />);

    cy.findByTestId("badge").should("have.attr", "role", "status");
    cy.findByTestId("badge").should("contain.text", "Beta");
  });

  it("renders with children content", () => {
    cy.mount(<BadgeBase classMap={classMap} testId="badge" text="Live" />);
    cy.findByTestId("badge").should("contain.text", "Live");
  });

  it("renders icon when icon is passed", () => {
    cy.mount(
      <BadgeBase
        text="New"
        icon={DummyIcon}
        classMap={classMap}
        testId="badge"
      />
    );
    cy.findByTestId("icon-svg").should("exist");
  });

  it("does not render when no content is passed", () => {
    cy.mount(<BadgeBase classMap={classMap} text="" />);
    cy.get("body").should("not.contain", "[data-testid='badge']");
  });
});
