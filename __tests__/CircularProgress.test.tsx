import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CircularProgress } from "@/index.next";

describe("CircularProgress", () => {
  it("renders the component with correct rating text", () => {
    render(<CircularProgress rating={75} data-testid="circular-progress" />);
    const progress = screen.getByTestId("circular-progress");
    expect(progress).toBeInTheDocument();
    expect(progress).toHaveTextContent("75%");
  });

  it("shows raw value when showRaw is true", () => {
    render(
      <CircularProgress rating={45} showRaw data-testid="circular-progress-raw" />
    );
    expect(screen.getByTestId("circular-progress-raw")).toHaveTextContent("45/100");
  });

  it("clamps value to min and max", () => {
    render(
      <CircularProgress rating={150} max={100} min={0} data-testid="clamped-progress" />
    );
    expect(screen.getByTestId("clamped-progress")).toHaveTextContent("100%");
  });

  it("applies custom class name", () => {
    render(<CircularProgress rating={60} className="custom-class" data-testid="custom-progress" />);
    const progress = screen.getByTestId("custom-progress");
    expect(progress).toHaveClass("custom-class");
  });

  it("has appropriate ARIA attributes", () => {
    render(
      <CircularProgress rating={30} min={0} max={100} label="Score" data-testid="aria-progress" />
    );
    const progress = screen.getByTestId("aria-progress");
    expect(progress).toHaveAttribute("role", "progressbar");
    expect(progress).toHaveAttribute("aria-valuemin", "0");
    expect(progress).toHaveAttribute("aria-valuemax", "100");
    expect(progress).toHaveAttribute("aria-valuenow", "30");
    expect(progress).toHaveAttribute("aria-label", "Score");
  });
});
