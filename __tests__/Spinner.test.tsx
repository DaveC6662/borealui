import { render, screen } from "@testing-library/react";
import { Spinner } from "@/index";
import "@testing-library/jest-dom";

describe("Spinner", () => {
  it("renders with default props", () => {
    render(<Spinner data-testid="spinner" />);
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute("role", "status");
    expect(spinner).toHaveAttribute("aria-label", "Loading");
    expect(spinner).toHaveStyle({ width: "50px", height: "50px" });
  });

  it("applies custom size", () => {
    render(<Spinner size={80} data-testid="spinner-custom" />);
    const spinner = screen.getByTestId("spinner-custom");
    expect(spinner).toHaveStyle({ width: "80px", height: "80px" });
  });

  it("applies theme class", () => {
    render(<Spinner theme="error" data-testid="spinner-error" />);
    const spinner = screen.getByTestId("spinner-error");
    expect(spinner.className).toMatch(/error/);
  });
});
