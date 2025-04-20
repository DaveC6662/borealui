import ToggleBase from "@/components/Toggle/ToggleBase";

const mockStyles = {
  toggleContainer: "toggleContainer",
  toggle: "toggle",
  active: "active",
  slider: "slider",
  label: "label",
  primary: "primary",
  medium: "medium",
  disabled: "disabled",
};

describe("ToggleBase Component", () => {
  it("renders and toggles via click", () => {
    const onChange = cy.stub().as("onToggle");

    cy.mount(
      <ToggleBase
        checked={false}
        onChange={onChange}
        label="Notifications"
        styles={mockStyles}
      />
    );

    cy.findByRole("switch", { name: "Notifications" }).click();
    cy.get("@onToggle").should("have.been.calledWith", true);
  });

  it("toggles via keyboard (space)", () => {
    const onChange = cy.stub().as("onToggle");

    cy.mount(
      <ToggleBase
        checked={false}
        onChange={onChange}
        label="Dark Mode"
        styles={mockStyles}
      />
    );

    cy.findByRole("switch", { name: "Dark Mode" }).focus().type(" ");
    cy.get("@onToggle").should("have.been.calledWith", true);
  });

  it("is accessible in mobile view", () => {
    cy.viewport("iphone-6");

    cy.mount(
      <ToggleBase
        checked={false}
        onChange={() => {}}
        label="Mobile Toggle"
        styles={mockStyles}
      />
    );

    cy.findByRole("switch", { name: "Mobile Toggle" }).should("exist");
  });
});
