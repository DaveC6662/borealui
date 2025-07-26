import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import SpinnerBase from "@/components/Spinner/SpinnerBase";

expect.extend(toHaveNoViolations);

const mockStyles = {
  spinner: "spinner-base",
  primary: "theme-primary",
  secondary: "theme-secondary",
};

describe("SpinnerBase", () => {
  it("renders with correct size and theme classes", () => {
    render(<SpinnerBase size={60} theme="primary" classMap={mockStyles} />);
    const spinnerInner = screen.getByTestId("spinner");
    expect(spinnerInner).toHaveClass("spinner-base", "theme-primary");
    expect(spinnerInner).toHaveStyle({
      width: "60px",
      height: "60px",
      borderWidth: "5px",
    });
  });

  it("has appropriate accessibility attributes", () => {
    render(
      <SpinnerBase size={50} label="Loading content..." classMap={mockStyles} />
    );
    const spinner = screen.getByRole("status");

    screen.debug(spinner);

    expect(spinner).toHaveAttribute("aria-busy", "true");
    expect(spinner).toHaveAttribute("aria-label", "Loading content...");
    expect(spinner).toHaveAttribute("aria-live", "polite");
  });

  it("is accessible according to jest-axe", async () => {
    const { container } = render(
      <SpinnerBase label="Loading" classMap={mockStyles} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
