import React from "react";
import CircularProgressBase from "@/components/CircularProgress/CircularProgressBase";

const classMap = {
  circularProgress: "circularProgress",
  circleBorder: "circleBorder",
  innerCircle: "innerCircle",
  ratingText: "ratingText",
  medium: "medium",
};

describe("<CircularProgressBase />", () => {
  it("renders percent text and correct ARIA attributes", () => {
    cy.mount(
      <CircularProgressBase
        rating={75}
        showRaw={false}
        classMap={classMap}
        label="File upload progress"
        data-testid="circular-progress"
      />
    );

    cy.findByRole("progressbar", { name: /file upload progress/i })
      .should("have.attr", "aria-valuenow", "75")
      .and("have.attr", "aria-valuemin", "0")
      .and("have.attr", "aria-valuemax", "100");

    cy.findByText("75%").should("exist");
  });

  it("renders raw value display when showRaw=true", () => {
    cy.mount(
      <CircularProgressBase
        rating={40}
        max={200}
        showRaw={true}
        classMap={classMap}
        data-testid="circular-progress"
      />
    );

    cy.findByText("40/200").should("exist");
  });
});
