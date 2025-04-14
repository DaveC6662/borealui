import { render, screen, fireEvent } from "@testing-library/react";
import { Slider } from "@/index";
import { SizeType, ThemeType } from "@/types/types";

describe("Slider Component", () => {
  const setup = (props = {}) => {
    const defaultProps = {
      value: 50,
      onChange: jest.fn(),
      min: 0,
      max: 100,
      step: 1,
      label: "Test Slider",
      theme: "primary" as ThemeType,
      size: "medium" as SizeType,
      "data-testid": "test-slider",
      ...props,
    };

    render(<Slider {...defaultProps} />);
    return defaultProps;
  };

  it("renders with label and value", () => {
    setup();
    expect(screen.getByText("Test Slider")).toBeInTheDocument();
    expect(screen.getByTestId("test-slider-value")).toHaveTextContent("50");
  });

  it("calls onChange when value changes", () => {
    const { onChange } = setup();
    const slider = screen.getByTestId("test-slider") as HTMLInputElement;
    fireEvent.change(slider, { target: { value: "70" } });
    expect(onChange).toHaveBeenCalled();
  });

  it("applies the correct aria-label", () => {
    setup({ "aria-label": "Volume" });
    const slider = screen.getByTestId("test-slider");
    expect(slider).toHaveAttribute("aria-label", "Volume");
  });

  it("renders with custom size and theme", () => {
    setup({ size: "xl", theme: "success" });
    const container = screen.getByTestId("test-slider-container");
    expect(container.className).toMatch(/success/);
    expect(container.className).toMatch(/xl/);
  });

  it("does not show value if showValue is false", () => {
    setup({ showValue: false });
    expect(screen.queryByTestId("test-slider-value")).not.toBeInTheDocument();
  });
});