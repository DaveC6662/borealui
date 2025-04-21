import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import SliderBase from "@/components/Slider/SliderBase";

const mockStyles = {
  sliderContainer: "sliderContainer",
  sliderWrapper: "sliderWrapper",
  sliderLabel: "sliderLabel",
  slider: "slider",
  sliderValue: "sliderValue",
  small: "small",
  medium: "medium",
  large: "large",
  primary: "primary",
  secondary: "secondary",
};

describe("SliderBase", () => {
  it("renders with label and value", () => {
    render(
      <SliderBase
        value={25}
        onChange={() => {}}
        label="Volume"
        styles={mockStyles}
        data-testid="slider"
      />
    );

    expect(screen.getByLabelText("Volume")).toBeInTheDocument();
    expect(screen.getByTestId("slider-value")).toHaveTextContent("25");
  });

  it("fires onChange when value changes", () => {
    const handleChange = jest.fn();
    render(
      <SliderBase
        value={50}
        onChange={handleChange}
        styles={mockStyles}
        data-testid="slider"
      />
    );

    fireEvent.change(screen.getByTestId("slider"), { target: { value: "60" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("is accessible according to jest-axe", async () => {
    const { container } = render(
      <SliderBase
        value={30}
        onChange={() => {}}
        label="Progress"
        styles={mockStyles}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
