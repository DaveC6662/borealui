import DateTimePickerBase from "@/components/DateTimePicker/DateTimePickerBase";

const styles = {
  wrapper: "pickerWrapper",
  inputWrapper: "inputWrapper",
  input: "inputField",
  label: "labelField",
  description: "descText",
  error: "errorText",
  outline: "outline",
  disabled: "disabled",
  primary: "themePrimary",
  medium: "sizeMedium",
};

describe("DateTimePickerBase", () => {
  it("renders with label and accepts input", () => {
    cy.mount(
      <DateTimePickerBase
        label="Pick date"
        value=""
        onChange={cy.stub().as("onChange")}
        styles={styles}
        data-testid="datetime"
      />
    );

    cy.findByLabelText("Pick date").should("exist").type("2025-04-30T12:00");
    cy.get("@onChange").should("have.been.called");
  });

  it("displays error and role alert", () => {
    cy.mount(
      <DateTimePickerBase
        label="Meeting Time"
        value=""
        error="Required"
        onChange={() => {}}
        styles={styles}
        data-testid="datetime"
      />
    );

    cy.findByRole("alert").should("contain.text", "Required");
    cy.findByTestId("datetime-input")
      .should("have.attr", "aria-invalid", "true")
      .and("have.attr", "aria-errormessage");
  });

  it("shows description when present", () => {
    cy.mount(
      <DateTimePickerBase
        label="Office Hours"
        value=""
        description="Pick a date during working hours"
        onChange={() => {}}
        styles={styles}
        data-testid="datetime"
      />
    );

    cy.contains("Pick a date during working hours").should("exist");
    cy.findByTestId("datetime-input").should("have.attr", "aria-describedby");
  });

  it("respects required and disabled props", () => {
    cy.mount(
      <DateTimePickerBase
        label="Time"
        value=""
        required
        disabled
        onChange={() => {}}
        styles={styles}
        data-testid="datetime"
      />
    );

    cy.findByTestId("datetime-input")
      .should("have.attr", "aria-required", "true")
      .and("have.attr", "aria-disabled", "true")
      .and("be.disabled");
  });
});
