import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ColorPicker, { ColorOption } from "../components/ColorPicker/ColorPicker";

const colorOptions: ColorOption[] = [
  { label: "Red", value: "#e74c3c" },
  { label: "Green", value: "#27ae60" },
  { label: "Blue", value: "#3498db" },
];

describe("ColorPicker", () => {
  it("renders all color options", () => {
    render(
      <ColorPicker
        colors={colorOptions}
        selected="#3498db"
        onChange={() => {}}
      />
    );

    colorOptions.forEach((color) => {
      expect(screen.getByTestId(`color-picker-option-${color.value}`)).toBeInTheDocument();
    });
  });

  it("applies selected state correctly", () => {
    render(
      <ColorPicker
        colors={colorOptions}
        selected="#27ae60"
        onChange={() => {}}
      />
    );

    const selectedOption = screen.getByTestId("color-picker-option-#27ae60");
    expect(selectedOption.classList.contains("selected")).toBe(true);
  });

  it("calls onChange when a color is selected", () => {
    const handleChange = jest.fn();
    render(
      <ColorPicker
        colors={colorOptions}
        selected="#e74c3c"
        onChange={handleChange}
      />
    );
    const input = screen.getByLabelText("Blue");
    fireEvent.click(input);

    expect(handleChange).toHaveBeenCalledWith("#3498db");
  });

  it("renders with custom label and shape", () => {
    render(
      <ColorPicker
        label="Pick your color"
        colors={colorOptions}
        selected="#e74c3c"
        onChange={() => {}}
        shape="pill"
      />
    );

    expect(screen.getByText("Pick your color")).toBeInTheDocument();
  });

  it("renders a disabled component", () => {
    render(
      <ColorPicker
        colors={colorOptions}
        selected="#e74c3c"
        onChange={() => {}}
        disabled
      />
    );

    const fieldset = screen.getByTestId("color-picker");
    expect(fieldset).toBeDisabled();
  });

  it("renders custom color input when allowCustom is true", () => {
    render(
      <ColorPicker
        colors={colorOptions}
        selected="#000000"
        onChange={() => {}}
        allowCustom
      />
    );

    const customInput = screen.getByTestId("color-picker-custom-input");
    expect(customInput).toBeInTheDocument();
    expect(customInput).toHaveAttribute("type", "color");
  });

  it("calls onChange when custom color input is changed", () => {
    const handleChange = jest.fn();
    render(
      <ColorPicker
        colors={colorOptions}
        selected="#000000"
        onChange={handleChange}
        allowCustom
      />
    );

    const customInput = screen.getByTestId("color-picker-custom-input");
    fireEvent.change(customInput, { target: { value: "#123456" } });

    expect(handleChange).toHaveBeenCalledWith("#123456");
  });
});
