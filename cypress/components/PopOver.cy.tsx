import BasePopover from "@/components/Popover/PopOverBase";

const classNames = {
  container: "popoverContainer",
  trigger: "popoverTrigger",
  popover: "popoverContent",
  placementMap: {
    bottom: "placementBottom",
  },
  themeMap: {
    primary: "themePrimary",
  },
};

describe("BasePopover", () => {
  it("opens and closes via click", () => {
    cy.mount(
      <BasePopover
        trigger={<span>Trigger</span>}
        content={<div>Popover Info</div>}
        classNames={classNames}
        data-testid="popover"
      />
    );

    cy.findByTestId("popover-content").should("not.exist");

    cy.findByTestId("popover-trigger").click();
    cy.findByTestId("popover-content")
      .should("exist")
      .and("contain", "Popover Info");

    cy.findByTestId("popover-trigger").click();
    cy.findByTestId("popover-content").should("not.exist");
  });

  it("responds to keyboard keys", () => {
    cy.mount(
      <BasePopover
        trigger={<span>Open Popover</span>}
        content={<div>Keyboard content</div>}
        classNames={classNames}
        data-testid="popover"
      />
    );

    cy.findByTestId("popover-trigger").focus().type("{enter}");
    cy.findByTestId("popover-content").should("exist");

    cy.findByTestId("popover-trigger").type(" ");
    cy.findByTestId("popover-content").should("not.exist");
  });

  it("closes when pressing Escape", () => {
    cy.mount(
      <BasePopover
        trigger={<span>Click Me</span>}
        content={<div>Esc content</div>}
        classNames={classNames}
        data-testid="popover"
      />
    );

    cy.findByTestId("popover-trigger").click();
    cy.findByTestId("popover-content").should("exist");

    cy.realPress("Escape");
    cy.findByTestId("popover-content").should("not.exist");
  });
});
