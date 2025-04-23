import React from "react";
import ChipBase from "@/components/Chip/ChipBase";

const DummyIcon = () => <svg data-testid="dummy-icon" aria-hidden="true" />;
const DummyClose = () => <span>X</span>;
const DummyIconButton = ({ onClick, "data-testid": testId }: any) => (
  <button aria-label="Close chip" onClick={onClick} data-testid={testId}>
    <DummyClose />
  </button>
);

const classMap = {
  chip: "chip",
  primary: "primary",
  medium: "medium",
  topCenter: "topCenter",
  fadeOut: "fadeOut",
  chipIcon: "chipIcon",
  chipMessage: "chipMessage",
  chipClose: "chipClose",
  icon: "icon",
};

describe("ChipBase Component", () => {
  beforeEach(() => {
    const portal = document.createElement("div");
    portal.setAttribute("id", "widget-portal");
    document.body.appendChild(portal);
  });

  afterEach(() => {
    document.getElementById("widget-portal")?.remove();
  });

  it("renders with proper accessibility", () => {
    cy.mount(
      <ChipBase
        id="test"
        visible={true}
        message="Cypress chip test"
        icon={DummyIcon}
        IconButtonComponent={DummyIconButton}
        classMap={classMap}
        data-testid="chip"
      />
    );

    cy.findByRole("status").should("contain.text", "Cypress chip test");
    cy.findByTestId("chip-close").should(
      "have.attr",
      "aria-label",
      "Close chip"
    );
  });

  it("calls onClose when clicked", () => {
    const onCloseStub = cy.stub().as("onCloseStub");

    cy.mount(
      <ChipBase
        id="click"
        visible={true}
        message="Closable"
        onClose={onCloseStub}
        IconButtonComponent={DummyIconButton}
        classMap={classMap}
        data-testid="chip"
      />
    );

    cy.findByTestId("chip-close").click();
    cy.get("@onCloseStub").should("have.been.calledOnce");
  });
});
