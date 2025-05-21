import BaseFormGroup from "@/components/FormGroup/FormGroupBase";

const classNames = {
  wrapper: "formWrapper",
  label: "formLabel",
  srOnly: "srOnly",
  required: "formRequired",
  inputWrapper: "inputWrapper",
  inputField: "inputField",
  controller: "controller",
  description: "description",
  errorMessage: "errorMessage",
  layoutMap: {
    vertical: "layoutVertical",
    horizontal: "layoutHorizontal",
  },
  spacingMap: {
    medium: "spacingMedium",
    large: "spacingLarge",
  },
};

describe("BaseFormGroup", () => {
  it("renders group with multiple inputs", () => {
    cy.mount(
      <BaseFormGroup
        id="credentials"
        label="Credentials"
        description="Enter both username and password"
        classNames={classNames}
        layout="vertical"
      >
        <>
          <input
            title="username"
            id="username"
            type="text"
            aria-describedby="credentials-description"
          />
          <input
            title="password"
            id="password"
            type="password"
            aria-describedby="credentials-description"
          />
        </>
      </BaseFormGroup>
    );

    cy.findByRole("group")
      .should("exist")
      .and("have.attr", "aria-labelledby", "credentials-label");
    cy.findByText("Enter both username and password").should("exist");
    cy.get("#username").should(
      "have.attr",
      "aria-describedby",
      "credentials-description"
    );
    cy.get("#password").should(
      "have.attr",
      "aria-describedby",
      "credentials-description"
    );
  });

  it("renders required asterisk and error message", () => {
    cy.mount(
      <BaseFormGroup
        id="email"
        label="Email"
        error="Email is required"
        required
        classNames={classNames}
      >
        <input title="email" id="email" type="email" aria-invalid="true" />
      </BaseFormGroup>
    );

    cy.findByText("*").should("exist").and("have.attr", "aria-hidden", "true");
    cy.findByRole("alert").should("contain.text", "Email is required");
  });
});
