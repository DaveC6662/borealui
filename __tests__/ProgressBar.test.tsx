import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import BaseProgressBar from "@/components/ProgressBar/ProgressBarBase";

expect.extend(toHaveNoViolations);

const classNames = {
  container: "progressContainer",
  bar: "progressBar",
  primary: "themePrimary",
  secondary: "themeSecondary",
  small: "sizeSmall",
  medium: "sizeMedium",
  large: "sizeLarge",
  animated: "animated",
  indeterminate: "indeterminate",
};

describe("BaseProgressBar", () => {
  it("renders with correct width and attributes", () => {
    render(
      <BaseProgressBar
        progress={70}
        classMap={classNames}
        data-testid="progressbar"
      />
    );

    const progressbar = screen.getByRole("progressbar");
    const bar = screen.getByTestId("progressbar-bar");

    expect(progressbar).toHaveAttribute("aria-valuenow", "70");
    expect(progressbar).toHaveAttribute("aria-valuetext", "70% complete");
    expect(bar).toHaveStyle({ width: "70%" });
  });

  it("renders indeterminate progress correctly", () => {
    render(
      <BaseProgressBar
        indeterminate
        classMap={classNames}
        data-testid="progressbar"
      />
    );

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).not.toHaveAttribute("aria-valuenow");
    expect(progressbar).toHaveAttribute("aria-busy", "true");
  });

  it("is accessible in indeterminate mode", async () => {
    const { container } = render(
      <BaseProgressBar
        indeterminate
        classMap={classNames}
        data-testid="progressbar"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("is accessible with jest-axe", async () => {
    const { container } = render(
      <BaseProgressBar
        progress={50}
        classMap={classNames}
        data-testid="progressbar"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
