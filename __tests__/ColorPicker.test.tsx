import { render, screen, fireEvent } from "@testing-library/react";
import ColorPickerBase from "@/components/ColorPicker/ColorPickerBase";
import "@testing-library/jest-dom";

const colors = [
  { label: "Red", value: "#ff0000" },
  { label: "Green", value: "#00ff00" },
  { label: "Blue", value: "#0000ff" },
];

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

    expect(
      screen.getByRole("radiogroup", { name: "Pick a color" })
    ).toBeInTheDocument();
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

    const greenInput = screen
      .getByTestId("color-picker-option-#00ff00")
      .querySelector("input") as HTMLInputElement;

    expect(greenInput).toBeChecked();
  });

  it("triggers onChange when a color is selected", () => {
    const handleChange = jest.fn();

    render(
      <ColorPickerBase
        colors={colors}
        selected="#ff0000"
        onChange={handleChange}
        classMap={classMap}
      />
    );

    fireEvent.click(screen.getByTestId("color-picker-option-#0000ff"));
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
      />
    );

    expect(screen.getByLabelText("Custom color picker")).toBeInTheDocument();
  });
});
