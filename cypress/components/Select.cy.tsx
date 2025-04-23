import { useState } from "react";
import BaseSelect from "@/components/Select/SelectBase";

const classNames = {
  main: "selectMain",
  select: "selectInput",
  icon: "selectIcon",
  themeClass: (theme: string) => `theme-${theme}`,
  disabled: "disabled",
};

const SelectExample = () => {
  const [value, setValue] = useState("");
  return (
    <BaseSelect
      value={value}
      onChange={setValue}
      placeholder="Select something"
      ariaLabel="Example Select"
      ariaDescription="Screen reader description"
      options={[
        { label: "Apple", value: "apple" },
        { label: "Orange", value: "orange" },
      ]}
      classNames={classNames}
    />
  );
};

describe("BaseSelect component", () => {
  it("renders with options and allows selection", () => {
    cy.mount(<SelectExample />);
    cy.findByLabelText("Example Select").select("orange");
    cy.findByDisplayValue("Orange").should("exist");
  });

  it("includes accessibility description", () => {
    cy.mount(<SelectExample />);
    cy.findByTestId("select-description").should(
      "contain.text",
      "Screen reader description"
    );
    cy.findByLabelText("Example Select").should(
      "have.attr",
      "aria-describedby"
    );
  });
});
