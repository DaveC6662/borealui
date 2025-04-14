import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { TextInput } from "@/index";

describe("TextInput", () => {
  it("renders with placeholder", () => {
    render(<TextInput placeholder="Enter your name" data-testid="textinput" />);
    expect(screen.getByTestId("textinput")).toHaveAttribute("placeholder", "Enter your name");
  });

  it("renders with an icon", () => {
    render(<TextInput icon={FaUser} placeholder="With Icon" data-testid="textinput-icon" />);
    expect(screen.getByTestId("textinput-icon")).toBeInTheDocument();
    expect(screen.getByTestId("textinput-icon")).toHaveAttribute("placeholder", "With Icon");
  });

  it("updates value on change", () => {
    render(<TextInput placeholder="Type..." data-testid="textinput" />);
    const input = screen.getByTestId("textinput");
    fireEvent.change(input, { target: { value: "Hello" } });
    expect(input).toHaveValue("Hello");
  });

  it("toggles password visibility", () => {
    render(<TextInput password icon={FaLock} placeholder="Password" data-testid="password-input" />);
    const input = screen.getByTestId("password-input");
    expect(input).toHaveAttribute("type", "password");
    const toggleBtn = screen.getByTestId("password-input-password-toggle");
    fireEvent.click(toggleBtn);
    expect(input).toHaveAttribute("type", "text");
  });

  it("applies readOnly and disabled states", () => {
    render(
      <>
        <TextInput value="ReadOnly" readOnly data-testid="readonly-input" />
        <TextInput value="Disabled" disabled data-testid="disabled-input" />
      </>
    );
    expect(screen.getByTestId("readonly-input")).toHaveAttribute("readOnly");
    expect(screen.getByTestId("disabled-input")).toBeDisabled();
  });

  it("applies aria-label and description", () => {
    render(
      <TextInput
        ariaLabel="Test Input"
        ariaDescription="Helper text"
        data-testid="aria-input"
      />
    );
    const input = screen.getByTestId("aria-input");
    expect(input).toHaveAttribute("aria-label", "Test Input");
    expect(screen.getByTestId("aria-input-input-description")).toBeInTheDocument();
  });
});