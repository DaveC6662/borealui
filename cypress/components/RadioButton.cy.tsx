import BaseRadioButton from "@/components/RadioButton/RadioButtonBase";
import { useState } from "react";

const mockClassNames = {
  wrapper: "radioWrapper",
  input: "radioInput",
  circle: "radioCircle",
  label: "radioLabel",
  themeMap: {
    primary: "themePrimary",
    secondary: "themeSecondary",
  },
  disabled: "radioDisabled",
};

const RadioWrapper = () => {
  const [selected, setSelected] = useState("A");
  return (
    <div>
      <BaseRadioButton
        label="Option A"
        value="A"
        checked={selected === "A"}
        onChange={(v) => setSelected(v)}
        classNames={mockClassNames}
        data-testid="radio-a"
      />
      <BaseRadioButton
        label="Option B"
        value="B"
        checked={selected === "B"}
        onChange={(v) => setSelected(v)}
        classNames={mockClassNames}
        data-testid="radio-b"
      />
    </div>
  );
};

describe("BaseRadioButton", () => {
  it("selects option on click", () => {
    cy.mount(<RadioWrapper />);
    cy.findByTestId("radio-b").click();
    cy.findByTestId("radio-b").should("be.checked");
    cy.findByTestId("radio-a").should("not.be.checked");
  });
});
