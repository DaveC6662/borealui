/// <reference types="cypress" />
import IconButtonBase from "@/components/Buttons/IconButton/IconButtonBase";
import { FaTimes } from "react-icons/fa";

describe("IconButtonBase (Cypress)", () => {
  const classMap = {
    iconButton: "icon-button",
    primary: "primary",
    medium: "medium",
    outline: "outline",
    disabled: "disabled",
    buttonLabel: "button-label",
    loader: "loader",
  };

  it("renders and responds to clicks", () => {
    const onClick = cy.stub().as("onClickStub");

    cy.mount(
      <IconButtonBase
        icon={FaTimes}
        ariaLabel="Close button"
        classMap={classMap}
        onClick={onClick}
        data-testid="icon-button"
      />
    );

    cy.findByTestId("icon-button").click();
    cy.get("@onClickStub").should("have.been.calledOnce");
  });

  it("is accessible by label", () => {
    cy.mount(
      <IconButtonBase
        icon={FaTimes}
        ariaLabel="Accessible button"
        classMap={classMap}
        data-testid="icon-button"
      />
    );

    cy.findByRole("button", { name: /accessible button/i }).should("exist");
  });

  it("does not fire event when disabled", () => {
    const onClick = cy.stub().as("disabledClick");

    cy.mount(
      <IconButtonBase
        icon={FaTimes}
        ariaLabel="Disabled"
        classMap={classMap}
        disabled
        onClick={onClick}
        data-testid="icon-button"
      />
    );

    cy.findByTestId("icon-button").click({ force: true });
    cy.get("@disabledClick").should("not.have.been.called");
  });
});
