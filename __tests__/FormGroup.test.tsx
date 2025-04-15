import { render, screen } from "@testing-library/react";
import { TextInput, FormGroup } from "@/index.next";
import "@testing-library/jest-dom";

describe("FormGroup", () => {
  it("renders label, description, and input", () => {
    render(
      <FormGroup label="Username" description="Enter your handle" id="username">
        <TextInput />
      </FormGroup>
    );

    expect(screen.getByTestId("form-group-input")).toBeInTheDocument();
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Enter your handle")).toBeInTheDocument();
  });

  it("sets aria-describedby correctly when description is present", () => {
    render(
      <FormGroup label="Email" description="We will not share your email" id="email">
        <TextInput />
      </FormGroup>
    );

    const input = screen.getByTestId("form-group-input");
    expect(input).toHaveAttribute("aria-describedby", "email-description");
  });

  it("sets aria-describedby and aria-invalid when error is present", () => {
    render(
      <FormGroup label="Password" error="Required field" id="password">
        <TextInput />
      </FormGroup>
    );

    const input = screen.getByTestId("form-group-input");
    expect(input).toHaveAttribute("aria-describedby", "password-error");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Required field")).toBeInTheDocument();
  });

  it("hides label visually when hideLabel is true", () => {
    render(
      <FormGroup label="Hidden Label" hideLabel id="hidden">
        <TextInput />
      </FormGroup>
    );

    const label = screen.getByText("Hidden Label");
    expect(label).toHaveClass("srOnly");
    expect(screen.getByTestId("form-group-input")).toBeInTheDocument();
  });

  it("supports horizontal layout and custom spacing", () => {
    const { container } = render(
      <FormGroup label="Horizontal" layout="horizontal" spacing="large">
        <TextInput />
      </FormGroup>
    );

    expect(container.firstChild).toHaveClass("horizontal");
    expect(container.firstChild).toHaveClass("lg");
  });

  it("renders controller node when provided", () => {
    render(
      <FormGroup
        label="Search"
        controller={<button data-testid="search-button">Search</button>}
      >
        <TextInput />
      </FormGroup>
    );

    expect(screen.getByTestId("search-button")).toBeInTheDocument();
  });
});
