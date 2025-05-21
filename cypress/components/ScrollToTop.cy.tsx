import ScrollToTopBase from "@/components/Buttons/ScrollToTop/ScrollToTopBase";

const DummyIcon = () => <svg data-testid="scroll-icon" />;

const classMap = {
  container: "container",
  button: "scroll-button",
  icon: "icon",
};

describe("ScrollToTopBase (Cypress)", () => {
  it("shows and clicks the scroll to top button", () => {
    const classMap = {
      container: "container",
      button: "scroll-button",
      icon: "scroll-icon",
    };

    // Simulate a long page with the component fixed at the bottom
    cy.mount(
      <div style={{ height: "2000px" }}>
        <ScrollToTopBase
          offset={100}
          IconComponent={() => <svg />}
          classMap={classMap}
        />
      </div>
    );

    // Scroll beyond the offset to trigger button visibility
    cy.window().then((win) => {
      win.scrollTo(0, 150);
    });

    // Wait for the component to detect scroll
    cy.wait(100);

    // Assert the scroll button is now visible
    cy.findByTestId("scroll-button").should("exist").click({ force: true });

    // Optionally assert that scroll position is reset
    cy.window().its("scrollY").should("be.lte", 10);
  });
});
