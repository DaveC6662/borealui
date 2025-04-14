import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import { Button } from "@/index";
import { FaCheck } from "react-icons/fa";

describe("Button Component", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("applies theme, size, outline, and fullWidth classes", () => {
    render(
      <Button theme="success" size="large" outline fullWidth>
        Styled Button
      </Button>
    );

    const btn = screen.getByRole("button", { name: "Styled Button" });
    expect(btn).toHaveClass("success");
    expect(btn).toHaveClass("large");
    expect(btn).toHaveClass("outline");
    expect(btn).toHaveClass("fullWidth");
  });

  it("handles click event", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    fireEvent.click(screen.getByRole("button", { name: "Click" }));
    expect(handleClick).toHaveBeenCalled();
  });

  it("does not trigger onClick when disabled", () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    );

    fireEvent.click(screen.getByRole("button", { name: "Disabled" }));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders a loading spinner", () => {
    render(<Button loading>Loading</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveAttribute("aria-busy", "true");
    expect(btn.querySelector(".loader")).toBeInTheDocument();
  });

  it("renders icon if provided", () => {
    render(<Button icon={FaCheck}>With Icon</Button>);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders as internal link if href is provided", () => {
    render(<Button href="/docs">Docs</Button>);
    const link = screen.getByRole("button", { name: "Docs" });
    expect(link).toHaveAttribute("href", "/docs");
  });

  it("renders as external link if isExternal is true", () => {
    render(
      <Button href="https://example.com" isExternal>
        External
      </Button>
    );
    const link = screen.getByRole("button", { name: "External" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("applies aria-label correctly", () => {
    render(<Button ariaLabel="Save">Save</Button>);
    expect(screen.getByLabelText("Save")).toBeInTheDocument();
  });

  it("respects data-testid", () => {
    render(
      <Button data-testid="custom-btn" ariaLabel="Custom">
        Custom
      </Button>
    );
    expect(screen.getByTestId("custom-btn")).toBeInTheDocument();
  });
});
