/// <reference types="cypress" />
import ButtonBase from "@/components/Buttons/Button/ButtonBase";
import { FaStar } from "react-icons/fa";

const classMap = {
  button: "btn",
  primary: "btn-primary",
  outline: "btn-outline",
  small: "btn-sm",
  medium: "btn-md",
  large: "btn-lg",
  fullWidth: "btn-full",
  disabled: "btn-disabled",
  link: "btn-link",
  buttonIcon: "btn-icon",
  buttonLabel: "btn-label",
  loader: "btn-loader",
  icon: "icon-style",
};

describe("ButtonBase (Cypress)", () => {
  it("renders with icon and text", () => {
    cy.mount(
      <ButtonBase
        icon={FaStar}
        classMap={classMap}
        data-testid="button"
        ariaLabel="Favorite"
      >
        Favorite
      </ButtonBase>
    );
    cy.findByRole("button", { name: "Favorite" }).should("exist");
    cy.findByTestId("icon").should("exist");
  });

  it("handles click", () => {
    const clickSpy = cy.stub().as("clickHandler");
    cy.mount(
      <ButtonBase
        classMap={classMap}
        onClick={clickSpy}
        data-testid="click-btn"
      >
        Click Me
      </ButtonBase>
    );
    cy.findByTestId("click-btn").click();
    cy.get("@clickHandler").should("have.been.calledOnce");
  });

  it("is disabled when passed disabled prop", () => {
    cy.mount(
      <ButtonBase classMap={classMap} disabled data-testid="disabled-btn">
        Disabled
      </ButtonBase>
    );
    cy.findByTestId("disabled-btn").should("be.disabled");
  });
});
