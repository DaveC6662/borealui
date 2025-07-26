import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import ColorPickerBase from "@/components/ColorPicker/ColorPickerBase";
import "@testing-library/jest-dom";
import React from "react";

expect.extend(toHaveNoViolations);

const colors = [
  { label: "Red", value: "#ff0000" },
  { label: "Green", value: "#00ff00" },
  { label: "Blue", value: "#0000ff" },
];

const classMap = {
  color_picker: "colorPicker",
  legend: "legend",
  color_picker_grid: "colorGrid",
  swatch: "colorSwatch",
  preview: "colorPreview",
  radio_input: "radioInput",
  selected: "selected",
  custom_input: "customColorInput",
  medium: "medium",
  round: "round",
  shadowLight: "shadowLight",
};

describe("ColorPickerBase", () => {
  it("renders radio buttons with proper labels", () => {
    render(
      <ColorPickerBase
        colors={colors}
        selected="#ff0000"
        onChange={jest.fn()}
        label="Pick a color"
        classMap={classMap}
        data-testid="color-picker"
      />
    );

    const group = screen.getByRole("radiogroup", { name: "Pick a color" });
    expect(group).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(colors.length);
  });

  it("checks the selected radio button", () => {
    render(
      <ColorPickerBase
        colors={colors}
        selected="#00ff00"
        onChange={jest.fn()}
        classMap={classMap}
        data-testid="color-picker"
      />
    );

    const input = screen
      .getByTestId("color-picker-option-#00ff00")
      .querySelector("input") as HTMLInputElement;

    expect(input).toBeChecked();
  });

  it("triggers onChange when a color is selected", () => {
    const handleChange = jest.fn();

    render(
      <ColorPickerBase
        colors={colors}
        selected="#ff0000"
        onChange={handleChange}
        classMap={classMap}
        data-testid="color-picker"
      />
    );

    fireEvent.click(
      screen.getByTestId("color-picker-option-#0000ff").querySelector("input")!
    );
    expect(handleChange).toHaveBeenCalledWith("#0000ff");
  });

  it("renders custom color input if allowCustom is true", () => {
    render(
      <ColorPickerBase
        colors={colors}
        selected="#ff0000"
        onChange={jest.fn()}
        allowCustom
        classMap={classMap}
        data-testid="color-picker"
      />
    );

    const customInput = screen.getByLabelText("Custom color picker");
    expect(customInput).toBeInTheDocument();
    expect(customInput).toHaveAttribute("type", "color");
    expect(customInput).toHaveValue("#ff0000");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ColorPickerBase
        colors={colors}
        selected="#00ff00"
        onChange={jest.fn()}
        allowCustom
        label="Choose a color"
        classMap={classMap}
        data-testid="color-picker"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
