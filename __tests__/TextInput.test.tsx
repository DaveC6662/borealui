import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import { FaUser } from "react-icons/fa";
import TextInputBase from "@/components/TextInput/TextInputBase";
import { IconButton } from "@/index.core";

const mockStyles = {
  textBoxContainer: "textBoxContainer",
  textInput: "textInput",
  iconContainer: "iconContainer",
  togglePassword: "togglePassword",
  srOnly: "srOnly",
  primary: "primary",
  disabled: "disabled",
};

describe("TextInputBase", () => {
  it("renders a standard text input with icon and label", async () => {
    const { container } = render(
      <TextInputBase
        classMap={mockStyles}
        placeholder="Username"
        IconButton={IconButton}
        icon={FaUser}
        ariaLabel="Username field"
      />
    );

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByTestId("text-input-icon")).toBeInTheDocument();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders a password input and toggles visibility", () => {
    render(
      <TextInputBase
        classMap={mockStyles}
        password
        IconButton={IconButton}
        placeholder="Password"
        ariaLabel="Enter your password"
      />
    );

    const input = screen.getByPlaceholderText("Password") as HTMLInputElement;
    const toggle = screen.getByTestId("text-input-password-toggle");

    expect(input.type).toBe("password");

    fireEvent.click(toggle);
    expect(input.type).toBe("text");

    fireEvent.click(toggle);
    expect(input.type).toBe("password");
  });

  it("respects disabled and readonly props", () => {
    render(
      <TextInputBase
        classMap={mockStyles}
        placeholder="Disabled field"
        IconButton={IconButton}
        disabled
        readOnly
      />
    );

    const input = screen.getByPlaceholderText("Disabled field");
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("readonly");
  });

  it("displays an accessible description", () => {
    render(
      <TextInputBase
        classMap={mockStyles}
        placeholder="With description"
        IconButton={IconButton}
        ariaDescription="This input is used to test aria-describedby"
      />
    );

    const input = screen.getByPlaceholderText("With description");
    const description = screen.getByTestId("text-input-input-description");

    expect(description).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-describedby", description.id);
  });
});
