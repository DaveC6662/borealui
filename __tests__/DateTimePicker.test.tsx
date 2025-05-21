import { render, screen, fireEvent } from "@testing-library/react";
import DateTimePickerBase from "@/components/DateTimePicker/DateTimePickerBase";

const styles = {
  wrapper: "pickerWrapper",
  inputWrapper: "inputWrapper",
  input: "inputField",
  label: "labelField",
  description: "descText",
  error: "errorText",
  outline: "outline",
  disabled: "disabled",
  primary: "themePrimary",
  medium: "sizeMedium",
};

describe("DateTimePickerBase", () => {
  it("renders with label and input", () => {
    render(
      <DateTimePickerBase
        label="Select date and time"
        value=""
        onChange={jest.fn()}
        classMap={styles}
        data-testid="datetime"
      />
    );

    expect(screen.getByLabelText("Select date and time")).toBeInTheDocument();
    expect(screen.getByTestId("datetime-input")).toHaveAttribute(
      "type",
      "datetime-local"
    );
  });

  it("applies required and disabled attributes", () => {
    render(
      <DateTimePickerBase
        label="Event Time"
        value=""
        onChange={jest.fn()}
        classMap={styles}
        required
        disabled
        data-testid="datetime"
      />
    );

    const input = screen.getByTestId("datetime-input");
    expect(input).toBeRequired();
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("aria-disabled", "true");
    expect(input).toHaveAttribute("aria-required", "true");
  });

  it("renders error message with aria attributes", () => {
    render(
      <DateTimePickerBase
        label="Deadline"
        value=""
        onChange={jest.fn()}
        classMap={styles}
        error="This field is required"
        data-testid="datetime"
      />
    );

    const input = screen.getByTestId("datetime-input");
    const error = screen.getByRole("alert");

    expect(error).toHaveTextContent("This field is required");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-errormessage", error.id);
  });

  it("shows helper description when no error", () => {
    render(
      <DateTimePickerBase
        label="Appointment"
        value=""
        onChange={jest.fn()}
        classMap={styles}
        description="Select an available time slot"
        data-testid="datetime"
      />
    );

    expect(
      screen.getByText("Select an available time slot")
    ).toBeInTheDocument();
    expect(screen.getByTestId("datetime-input")).toHaveAttribute(
      "aria-describedby"
    );
  });

  it("calls onChange when input changes", () => {
    const handleChange = jest.fn();

    render(
      <DateTimePickerBase
        label="Schedule"
        value=""
        onChange={handleChange}
        classMap={styles}
        data-testid="datetime"
      />
    );

    fireEvent.change(screen.getByTestId("datetime-input"), {
      target: { value: "2025-04-30T14:00" },
    });

    expect(handleChange).toHaveBeenCalledWith("2025-04-30T14:00");
  });
});
