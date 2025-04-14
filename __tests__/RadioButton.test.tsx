import { render, screen, fireEvent } from "@testing-library/react";
import { RadioButton } from "@/index";
import "@testing-library/jest-dom";
import { ThemeType } from "@/types/types";

describe("RadioButton", () => {
  const baseProps = {
    label: "Option A",
    value: "a",
    onChange: jest.fn(),
    checked: false,
  };

  it("renders with label and input", () => {
    render(<RadioButton {...baseProps} data-testid="radio-a" />);
    const input = screen.getByTestId("radio-a");
    const label = screen.getByTestId("radio-a-label");
    const circle = screen.getByTestId("radio-a-circle");

    expect(input).toBeInTheDocument();
    expect(label).toHaveTextContent("Option A");
    expect(circle).toBeInTheDocument();
  });

  it("fires onChange when clicked", () => {
    const onChange = jest.fn();
    render(<RadioButton {...baseProps} onChange={onChange} data-testid="radio-a" />);
    fireEvent.click(screen.getByTestId("radio-a"));
    expect(onChange).toHaveBeenCalledWith("a");
  });

  it("applies checked state", () => {
    render(<RadioButton {...baseProps} checked data-testid="radio-a" />);
    const input = screen.getByTestId("radio-a");
    expect(input).toBeChecked();
  });

  it("applies disabled state", () => {
    render(<RadioButton {...baseProps} disabled data-testid="radio-a" />);
    const input = screen.getByTestId("radio-a");
    expect(input).toBeDisabled();
  });

  it("does not fire onChange when disabled", () => {
    const onChange = jest.fn();
    render(
      <RadioButton {...baseProps} disabled onChange={onChange} data-testid="radio-a" />
    );
    fireEvent.click(screen.getByTestId("radio-a"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("applies theme class", () => {
    const theme: ThemeType = "success";
    const { container } = render(
      <RadioButton {...baseProps} theme={theme} data-testid="radio-a" />
    );
    expect(container.firstChild).toHaveClass("success");
  });

  it("has proper ARIA attributes", () => {
    render(<RadioButton {...baseProps} checked data-testid="radio-a" />);
    const input = screen.getByTestId("radio-a");

    expect(input).toHaveAttribute("role", "radio");
    expect(input).toHaveAttribute("aria-checked", "true");
  });
});
