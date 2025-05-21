// __tests__/CheckboxBase.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import CheckboxBase from "@/components/CheckBox/CheckboxBase";

const classMap = {
  checkboxWrapper: "checkboxWrapper",
  checkboxInput: "checkboxInput",
  checkboxBox: "checkboxBox",
  checkboxLabel: "checkboxLabel",
  primary: "themePrimary",
  disabled: "disabled",
  left: "labelLeft",
  right: "labelRight",
};

describe("CheckboxBase", () => {
  it("renders with label on right and checks accessibility attributes", () => {
    render(
      <CheckboxBase
        checked={true}
        onChange={jest.fn()}
        label="Accept Terms"
        labelPosition="right"
        classMap={classMap}
        data-testid="checkbox"
      />
    );

    const input = screen.getByLabelText("Accept Terms");
    const label = screen.getByTestId("checkbox-label");

    expect(input).toBeInTheDocument();
    expect(label).toHaveTextContent("Accept Terms");
    expect(input).toHaveAttribute("type", "checkbox");
    expect(input).toHaveAttribute(
      "aria-labelledby",
      expect.stringContaining("label")
    );
  });

  it("renders with label on left", () => {
    render(
      <CheckboxBase
        checked={false}
        onChange={jest.fn()}
        label="Enable Notifications"
        labelPosition="left"
        classMap={classMap}
        data-testid="checkbox-left"
      />
    );

    expect(screen.getByTestId("checkbox-left-label")).toHaveTextContent(
      "Enable Notifications"
    );
  });

  it("fires onChange when toggled", () => {
    const onChange = jest.fn();
    render(
      <CheckboxBase
        label="I agree"
        classMap={classMap}
        data-testid="checkbox-toggle"
        onChange={onChange}
        checked={false}
      />
    );

    fireEvent.click(screen.getByLabelText("I agree"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("handles indeterminate state", () => {
    render(
      <CheckboxBase
        label="Indeterminate"
        classMap={classMap}
        data-testid="checkbox-indeterminate"
        indeterminate={true}
        checked={false}
        onChange={jest.fn()}
      />
    );

    const input = screen.getByLabelText("Indeterminate");
    expect(input).toHaveAttribute("aria-checked", "mixed");
  });
});
