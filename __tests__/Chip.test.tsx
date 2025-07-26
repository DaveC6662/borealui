import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import CheckboxBase from "@/components/CheckBox/CheckboxBase";

expect.extend(toHaveNoViolations);

const classMap = {
  checkbox: "checkboxWrapper",
  input: "checkboxInput",
  box: "checkboxBox",
  label: "checkboxLabel",
  primary: "themePrimary",
  disabled: "disabled",
  left: "labelLeft",
  right: "labelRight",
  small: "checkboxSmall",
  roundSmall: "roundSmall",
  shadowLight: "shadowLight",
  indeterminate: "indeterminate",
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

    const label = screen.getByTestId("checkbox-left-label");
    expect(label).toHaveTextContent("Enable Notifications");
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

  it("does not call onChange when disabled", () => {
    const onChange = jest.fn();
    render(
      <CheckboxBase
        label="Disabled Check"
        classMap={classMap}
        data-testid="checkbox-disabled"
        onChange={onChange}
        checked={false}
        disabled
      />
    );

    const checkbox = screen.getByLabelText("Disabled Check");
    expect(checkbox).toBeDisabled();
    fireEvent.click(checkbox);
    expect(onChange).not.toHaveBeenCalled();
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

  it("has no accessibility violations", async () => {
    const { container } = render(
      <CheckboxBase
        label="Accessible Checkbox"
        classMap={classMap}
        onChange={jest.fn()}
        checked={false}
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
