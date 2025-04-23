import React from "react";
import BaseMessagePopup from "@/components/MessagePopUp/MessagePopupBase";

const DummyButton = React.forwardRef<HTMLButtonElement, any>(
  ({ children, ...props }, ref) => (
    <button ref={ref} type="button" {...props}>
      {children}
    </button>
  )
);
DummyButton.displayName = "DummyButton";

const DummyIconButton = React.forwardRef<HTMLButtonElement, any>(
  ({ icon: Icon, ...props }, ref) => (
    <button ref={ref} type="button" {...props}>
      {Icon ? <Icon aria-hidden="true" /> : null}
    </button>
  )
);
DummyIconButton.displayName = "DummyIconButton";

const classNames = {
  wrapper: "popupWrapper",
  content: "popupContent",
  close: "popupClose",
  message: "popupMessage",
  actions: "popupActions",
  confirm: "popupConfirm",
  cancel: "popupCancel",
};

describe("BaseMessagePopup", () => {
  it("renders content and responds to user actions", () => {
    const onClose = cy.stub().as("onClose");
    const onConfirm = cy.stub().as("onConfirm");
    const onCancel = cy.stub().as("onCancel");

    cy.mount(
      <BaseMessagePopup
        message="Confirm deletion?"
        onClose={onClose}
        onConfirm={onConfirm}
        onCancel={onCancel}
        Button={DummyButton}
        IconButton={DummyIconButton}
        classNames={classNames}
        data-testid="message-popup"
      />
    );

    cy.findByRole("dialog").should("contain.text", "Confirm deletion?");
    cy.findByTestId("message-popup-confirm").click();
    cy.get("@onConfirm").should("have.been.called");

    cy.findByTestId("message-popup-cancel").click();
    cy.get("@onCancel").should("have.been.called");

    cy.findByTestId("message-popup-close").click();
    cy.get("@onClose").should("have.been.called");
  });

  it("closes when Escape is pressed", () => {
    const onClose = cy.stub().as("onClose");

    cy.mount(
      <BaseMessagePopup
        message="Close with Escape"
        onClose={onClose}
        Button={DummyButton}
        IconButton={DummyIconButton}
        classNames={classNames}
      />
    );

    cy.get("body").type("{esc}");
    cy.get("@onClose").should("have.been.called");
  });
});
