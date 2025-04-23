import React from "react";
import BaseModal from "@/components/Modal/ModalBase";

const DummyIconButton = React.forwardRef<HTMLButtonElement, any>(
  ({ icon: Icon, ...props }, ref) => (
    <button ref={ref} {...props}>
      <Icon aria-hidden="true" />
    </button>
  )
);
DummyIconButton.displayName = "DummyIconButton";

const classNames = {
  overlay: "modalOverlay",
  visible: "modalVisible",
  hidden: "modalHidden",
  content: "modalContent",
  closeButton: "closeButton",
};

describe("BaseModal Component", () => {
  it("renders with accessible attributes and closes with button", () => {
    const onClose = cy.stub().as("onClose");

    cy.mount(
      <BaseModal
        onClose={onClose}
        IconButton={DummyIconButton}
        classNames={classNames}
      >
        <p>Modal Text</p>
      </BaseModal>
    );

    cy.findByRole("dialog")
      .should("have.attr", "aria-modal", "true")
      .and("contain.text", "Modal Text");

    cy.findByTestId("modal-close").click();
    cy.get("@onClose").should("have.been.called");
  });

  it("closes on escape key", () => {
    const onClose = cy.stub().as("onClose");

    cy.mount(
      <BaseModal
        onClose={onClose}
        IconButton={DummyIconButton}
        classNames={classNames}
      />
    );

    // Wait for modal to appear and focus it
    cy.findByRole("dialog").should("exist").focus();
    cy.focused().type("{esc}");

    cy.get("@onClose").should("have.been.called");
  });

  it("traps focus with tab", () => {
    const onClose = cy.stub();

    cy.mount(
      <BaseModal
        onClose={onClose}
        IconButton={DummyIconButton}
        classNames={classNames}
      />
    );

    // Wait for modal visibility
    cy.findByRole("dialog", { name: "Modal Dialog" })
      .should("exist")
      .should("have.class", classNames.visible); // e.g., modalVisible

    // Wait for transition and force focus on dialog to simulate proper flow
    cy.wait(100); // Give visibility animation a moment to apply
    cy.findByTestId("modal").focus();
    cy.realPress("Tab");

    // Wait for focus to reach the button
    cy.focused().should("have.attr", "aria-label", "Close modal");
  });
});
