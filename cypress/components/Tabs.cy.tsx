import TabsBase from "@/components/Tabs/TabsBase";

const mockStyles = {
  tabsContainer: "tabsContainer",
  tabs: "tabs",
  tab: "tab",
  active: "active",
  content: "content",
  primary: "primary",
  medium: "medium",
  icon: "icon",
};

const mockTabs = [
  { label: "First", content: <p>First panel</p> },
  { label: "Second", content: <p>Second panel</p> },
  { label: "Third", content: <p>Third panel</p> },
];

describe("TabsBase Component", () => {
  it("renders all tabs and shows first panel by default", () => {
    cy.mount(
      <TabsBase tabs={mockTabs} styles={mockStyles} data-testid="tabs" />
    );

    cy.findAllByRole("tab").should("have.length", 3);
    cy.findByRole("tabpanel").should("contain.text", "First panel");
  });

  it("switches content on tab click", () => {
    cy.mount(<TabsBase tabs={mockTabs} styles={mockStyles} />);
    cy.findByRole("tab", { name: /Second/i }).click();
    cy.findByRole("tabpanel").should("contain.text", "Second panel");
  });

  it("navigates tabs with arrow keys", () => {
    cy.mount(<TabsBase tabs={mockTabs} styles={mockStyles} />);
    cy.findByRole("tab", { name: /First/i })
      .focus()
      .trigger("keydown", { key: "ArrowRight" });
    cy.focused().should("have.text", "Second");
  });

  it("is keyboard and screen-reader accessible", () => {
    cy.mount(<TabsBase tabs={mockTabs} styles={mockStyles} />);
    cy.findByRole("tablist").should("have.attr", "aria-label", "Tabs");
    cy.findByRole("tab", { name: "First" }).should(
      "have.attr",
      "aria-selected",
      "true"
    );
    cy.findByRole("tabpanel").should("have.attr", "aria-labelledby");
  });

  it("renders correctly on mobile", () => {
    cy.viewport("iphone-6");
    cy.mount(<TabsBase tabs={mockTabs} styles={mockStyles} />);
    cy.findAllByRole("tab").should("have.length", 3);
  });
});
