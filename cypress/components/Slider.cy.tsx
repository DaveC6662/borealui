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

  it("updates value on change", () => {
    const handleChange = cy.stub().as("handleChange");

    cy.mount(
      <SliderBase
        value={40}
        onChange={handleChange}
        styles={mockStyles}
        data-testid="slider"
      />
    );

    cy.findByTestId("slider").invoke("val", 80).trigger("change");
    cy.get("@handleChange").should("have.been.called");
  });
});
