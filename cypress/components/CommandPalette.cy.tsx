import React from "react";
import CommandPaletteBase from "@/components/CommandPalette/CommandPaletteBase";

const DummyInput = React.forwardRef<HTMLInputElement, any>((props, ref) => (
  <input ref={ref} {...props} />
));

const classMap = {
  overlay: "overlay",
  palette: "palette",
  primary: "theme-primary",
  input: "input",
  list: "list",
  item: "item",
  active: "active",
  icon: "icon",
  empty: "empty",
};

describe("<CommandPaletteBase />", () => {
  it("opens with input and commands", () => {
    const commands = [
      { label: "Open Settings", action: () => {} },
      { label: "Search Files", action: () => {} },
    ];

    cy.mount(
      <CommandPaletteBase
        isOpen={true}
        commands={commands}
        onClose={() => {}}
        TextInputComponent={DummyInput}
        classMap={classMap}
      />
    );

    cy.findByRole("dialog").should("exist");
    cy.findByRole("combobox").should("exist");
    cy.findAllByRole("option").should("have.length", 2);
  });

  it("filters commands on input", () => {
    const commands = [
      { label: "Open Settings", action: () => {} },
      { label: "Search Files", action: () => {} },
    ];

    cy.mount(
      <CommandPaletteBase
        isOpen={true}
        commands={commands}
        onClose={() => {}}
        TextInputComponent={DummyInput}
        classMap={classMap}
      />
    );

    cy.findByRole("combobox").type("Search");
    cy.findByText("Search Files").should("exist");
    cy.findByText("Open Settings").should("not.exist");
  });

  it("triggers action on Enter and closes palette", () => {
    const actionSpy = cy.stub().as("actionSpy");
    const onCloseSpy = cy.stub().as("onCloseSpy");

    const commands = [
      { label: "Do Something", action: actionSpy },
      { label: "Something Else", action: () => {} },
    ];

    cy.mount(
      <CommandPaletteBase
        isOpen={true}
        commands={commands}
        onClose={onCloseSpy}
        TextInputComponent={DummyInput}
        classMap={classMap}
      />
    );

    cy.findByRole("combobox").focus().type("{enter}");
    cy.get("@actionSpy").should("have.been.calledOnce");
    cy.get("@onCloseSpy").should("have.been.calledOnce");
  });
});
