import BaseProgressBar from "@/components/ProgressBar/ProgressBarBase";

const classNames = {
  container: "progressContainer",
  bar: "progressBar",
  themeMap: {
    primary: "themePrimary",
    secondary: "themeSecondary",
  },
  sizeMap: {
    small: "sizeSmall",
    medium: "sizeMedium",
    large: "sizeLarge",
  },
  animated: "animated",
  indeterminate: "indeterminate",
};

describe("BaseProgressBar", () => {
  it("renders and shows correct progress", () => {
    cy.mount(
      <BaseProgressBar
        progress={80}
        classNames={classNames}
        data-testid="progressbar"
      />
    );

    cy.findByRole("progressbar")
      .should("have.attr", "aria-valuenow", "80")
      .and("have.attr", "aria-valuetext", "80% complete");

    cy.findByTestId("progressbar").then(($container) => {
      const containerWidth = $container.width()!;
      const expectedWidth = Math.round(containerWidth * 0.8);

      cy.findByTestId("progressbar-bar").should(($bar) => {
        const barWidth = $bar.width()!;
        expect(barWidth).to.be.closeTo(expectedWidth, 2); // 2px leeway
      });
    });
  });

  it("renders indeterminate state correctly", () => {
    cy.mount(
      <BaseProgressBar
        indeterminate
        classNames={classNames}
        data-testid="progressbar"
      />
    );

    cy.findByTestId("progressbar")
      .should("have.attr", "aria-busy", "true")
      .and("not.have.attr", "aria-valuenow");
  });
});
