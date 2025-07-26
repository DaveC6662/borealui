import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import BaseRadioButton from "@/components/RadioButton/RadioButtonBase";

expect.extend(toHaveNoViolations);

const mockClassNames = {
  wrapper: "radioWrapper",
  input: "radioInput",
  circle: "radioCircle",
  label: "radioLabel",
  primary: "themePrimary",
  secondary: "themeSecondary",
  disabled: "radioDisabled",
};

describe("BaseRadioButton", () => {
  it("renders correctly with label", () => {
    render(
      <BaseRadioButton
        label="Option A"
        value="A"
        checked={false}
        onChange={() => {}}
        classMap={mockClassNames}
        data-testid="radio"
      />
    );
    expect(screen.getByTestId("radio-label")).toHaveTextContent("Option A");
    expect(screen.getByTestId("radio")).not.toBeChecked();
  });

  it("triggers onChange when clicked", () => {
    const handleChange = jest.fn();
    render(
      <BaseRadioButton
        label="Option B"
        value="B"
        checked={false}
        onChange={handleChange}
        classMap={mockClassNames}
        data-testid="radio"
      />
    );

    fireEvent.click(screen.getByTestId("radio"));
    expect(handleChange).toHaveBeenCalledWith("B");
  });

  it("disables input when disabled is true", () => {
    render(
      <BaseRadioButton
        label="Disabled Option"
        value="D"
        checked={false}
        disabled
        onChange={() => {}}
        classMap={mockClassNames}
        data-testid="radio"
      />
    );
    expect(screen.getByTestId("radio")).toBeDisabled();
  });

  it("sets correct aria-labelledby attribute", () => {
    render(
      <BaseRadioButton
        label="ARIA Labelled Option"
        value="E"
        checked={false}
        onChange={() => {}}
        classMap={mockClassNames}
        data-testid="radio"
      />
    );
    const radio = screen.getByTestId("radio");
    const label = screen.getByTestId("radio-label");
    expect(radio).toHaveAttribute("aria-labelledby", label.id);
  });

  it("is accessible", async () => {
    const { container } = render(
      <BaseRadioButton
        label="Accessible Option"
        value="C"
        checked={false}
        onChange={() => {}}
        classMap={mockClassNames}
        data-testid="radio"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
