import { render, screen, fireEvent } from "@testing-library/react";
import BaseRadioButton from "@/components/RadioButton/RadioButtonBase";

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
});
