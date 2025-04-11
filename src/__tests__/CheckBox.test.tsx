import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Checkbox from "../components/CheckBox/CheckBox";

describe("Checkbox Component", () => {
  const label = "Accept Terms";

  const setup = (overrideProps = {}) => {
    const onChange = jest.fn();
    render(
      <Checkbox
        label={label}
        checked={false}
        onChange={onChange}
        data-testid="checkbox-input"
        {...overrideProps}
      />
    );
    const input = screen.getByTestId("checkbox-input") as HTMLInputElement;
    return { input, onChange };
  };

  it("renders with label", () => {
    setup();
    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it("calls onChange when clicked", () => {
    const { input, onChange } = setup();
    fireEvent.click(input);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("does not call onChange when disabled", () => {
    const { input, onChange } = setup({ disabled: true });
    fireEvent.click(input);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("handles indeterminate state correctly", () => {
    const { container } = render(
      <Checkbox label="Indeterminate" checked={false} onChange={() => {}} indeterminate data-testid="checkbox-wrapper" />
    );
    const wrapper = container.querySelector('[role="checkbox"]');
    expect(wrapper).toHaveAttribute("aria-checked", "mixed");
  });

  it("renders label on the left", () => {
    setup({ labelPosition: "left" });
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("is disabled when prop is true", () => {
    const { input } = setup({ disabled: true });
    expect(input).toBeDisabled();
  });

  it("reflects checked state correctly", () => {
    const { input } = setup({ checked: true });
    expect(input.checked).toBe(true);
  });

  it("applies theme class", () => {
    const { container } = render(
      <Checkbox
        label={label}
        checked={false}
        onChange={() => {}}
        theme="success"
        data-testid="checkbox-input"
      />
    );
    expect(container.firstChild).toHaveClass("success");
  });
});
