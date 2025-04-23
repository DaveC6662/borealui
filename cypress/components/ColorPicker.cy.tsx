import React from "react";
import ColorPickerBase from "@/components/ColorPicker/ColorPickerBase";

const classMap = {
  colorPicker: "colorPicker",
  legend: "legend",
  colorGrid: "colorGrid",
  colorSwatch: "colorSwatch",
  colorPreview: "colorPreview",
  radioInput: "radioInput",
  selected: "selected",
  customColorInput: "customColorInput",
  medium: "medium",
  round: "round",
};

const colors = [
  { label: "Red", value: "#ff0000" },
  { label: "Green", value: "#00ff00" },
  { label: "Blue", value: "#0000ff" },
];

describe("<ColorPickerBase />", () => {
  it("renders color options and selects one", () => {
    cy.mount(
      <ColorPickerBase
        colors={colors}
        selected="#00ff00"
        onChange={cy.stub().as("onColorChange")}
        label="Select color"
        classMap={classMap}
        data-testid="color-picker"
      />
    );

    cy.findByRole("radiogroup", { name: "Select color" }).should("exist");
    cy.get('[data-testid="color-picker-option-#ff0000"]').should("exist");
    cy.get('[data-testid="color-picker-option-#00ff00"] input').should(
      "be.checked"
    );

    cy.get('[data-testid="color-picker-option-#0000ff"] input').check({
      force: true,
    });
    cy.get("@onColorChange").should("have.been.calledWith", "#0000ff");
  });

  it("shows custom color input if allowCustom is true", () => {
    cy.mount(
      <ColorPickerBase
        colors={colors}
        selected="#ff0000"
        onChange={cy.stub()}
        allowCustom
        classMap={classMap}
        data-testid="color-picker"
      />
    );

    cy.findByLabelText("Custom color picker").should("exist");
  });
});
