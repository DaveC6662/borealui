/// <reference types="cypress" />
import { AvatarBase } from "@/components/Avatar/AvatarBase";

const classMap = {
  avatar: "avatar",
  primary: "theme-primary",
  circle: "shape-circle",
  medium: "size-medium",
  outline: "outline",
  image: "image",
  initials: "initials",
  status: "status",
  "status-online": "status-online",
  bottomRight: "bottomRight",
  dot: "dot",
};

describe("AvatarBase (Cypress)", () => {
  it("renders initials fallback", () => {
    cy.mount(<AvatarBase name="Jane Doe" classMap={classMap} />);
    cy.findByRole("img").should("have.text", "JD");
  });

  it("renders image if src provided", () => {
    cy.mount(
      <AvatarBase src="avatar.png" alt="Avatar image" classMap={classMap} />
    );
    cy.findByRole("img").should("have.attr", "src", "avatar.png");
  });

  it("displays status indicator", () => {
    cy.mount(<AvatarBase name="Alice" status="online" classMap={classMap} />);

    cy.findByTestId("avatar-status")
      .should("exist")
      .and("have.attr", "aria-hidden", "true")
      .and("have.class", "status-online");
  });

  it("triggers onClick", () => {
    const onClickStub = cy.stub().as("onClickStub");
    cy.mount(
      <AvatarBase name="Bob" onClick={onClickStub} classMap={classMap} />
    );
    cy.findByTestId("avatar").click();
    cy.get("@onClickStub").should("have.been.called");
  });
});
