import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DateTimePicker } from "@/index.next";

describe("DateTimePicker", () => {
  const testId = "datetime-picker";

  it("renders with label and input", () => {
    render(<DateTimePicker label="Select Date" data-testid={testId} />);
    expect(screen.getByLabelText("Select Date")).toBeInTheDocument();
    expect(screen.getByTestId(testId)).toBeInTheDocument();
    expect(screen.getByTestId(`${testId}-input`)).toBeInTheDocument();
  });

  it("calls onChange when date changes", () => {
    const handleChange = jest.fn();
    render(
      <DateTimePicker
        label="Event Time"
        value="2025-01-01T12:00"
        onChange={handleChange}
        data-testid={testId}
      />
    );

    const input = screen.getByTestId(`${testId}-input`) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "2025-01-02T14:30" } });
    expect(handleChange).toHaveBeenCalledWith("2025-01-02T14:30");
  });

  it("respects required and disabled props", () => {
    render(
      <DateTimePicker
        label="Meeting Time"
        required
        disabled
        data-testid={testId}
      />
    );

    const input = screen.getByTestId(`${testId}-input`) as HTMLInputElement;
    expect(input).toBeRequired();
    expect(input).toBeDisabled();
  });

  it("renders with min and max attributes", () => {
    render(
      <DateTimePicker
        label="Range Picker"
        min="2025-01-01T00:00"
        max="2025-12-31T23:59"
        data-testid={testId}
      />
    );

    const input = screen.getByTestId(`${testId}-input`) as HTMLInputElement;
    expect(input.min).toBe("2025-01-01T00:00");
    expect(input.max).toBe("2025-12-31T23:59");
  });
});
