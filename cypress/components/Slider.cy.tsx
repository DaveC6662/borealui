import SliderBase from "@/components/Slider/SliderBase";
import { useState } from "react";

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

const SliderTestWrapper = ({ initialValue = 50, styles }: any) => {
  const [value, setValue] = useState(initialValue);

  return (
    <SliderBase
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      label="Test Slider"
      styles={styles}
      data-testid="slider"
    />
  );
};

describe("SliderBase Component", () => {
  it("renders with default value and label", () => {
    cy.mount(
      <SliderBase
        value={70}
        onChange={() => {}}
        label="Brightness"
        styles={mockStyles}
        data-testid="slider"
      />
    );

    cy.findByLabelText("Brightness").should("exist");
    cy.findByTestId("slider-value").should("contain.text", "70");
  });

  it("renders and allows value change", () => {
    cy.mount(<SliderTestWrapper initialValue={50} styles={mockStyles} />);

    cy.findByLabelText("Test Slider").as("slider");
    cy.get("@slider").should("have.value", "50");

    cy.get("@slider").then(($slider) => {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value"
      )?.set;
      if (nativeInputValueSetter) {
        nativeInputValueSetter.call($slider[0], "80");
        $slider[0].dispatchEvent(new Event("input", { bubbles: true }));
        $slider[0].dispatchEvent(new Event("change", { bubbles: true }));
      }
    });

    cy.get("@slider").should("have.value", "80");
    cy.findByTestId("slider-value").should("contain.text", "80");
  });
});
