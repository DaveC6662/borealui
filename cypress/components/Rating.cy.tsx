// cypress/components/Rating.cy.tsx
import BaseRating from "@/components/Rating/RatingBase";

const classNames = {
  wrapper: "wrapper",
  star: "star",
  active: "active",
  themeMap: { primary: "primary" },
  sizeMap: { medium: "medium" },
  interactive: "interactive",
};

describe("BaseRating", () => {
  it("renders stars and responds to click", () => {
    cy.mount(
      <BaseRating
        value={2}
        onChange={cy.stub().as("onChange")}
        classNames={classNames}
        max={5}
        theme="primary"
        data-testid="rating"
      />
    );

    cy.findByTestId("rating-star-4").click();
    cy.get("@onChange").should("have.been.calledWith", 4);
  });

  it("responds to keyboard input", () => {
    cy.mount(
      <BaseRating
        value={1}
        onChange={cy.stub().as("onChange")}
        classNames={classNames}
      />
    );

    cy.findByTestId("rating-star-2")
      .focus()
      .trigger("keydown", { key: "Enter" });
    cy.get("@onChange").should("have.been.calledWith", 2);
  });
});
