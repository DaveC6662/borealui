import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import CircularProgressBase from "@/components/CircularProgress/CircularProgressBase";
import "@testing-library/jest-dom";

expect.extend(toHaveNoViolations);

const classMap = {
  circular_progress: "circularProgress",
  circle_border: "circleBorder",
  inner_circle: "innerCircle",
  rating_text: "ratingText",
  medium: "medium",
  shadowLight: "shadowLight",
  primary: "primary",
};

describe("CircularProgressBase", () => {
  it("renders the correct percent with showRaw=false", () => {
    render(
      <CircularProgressBase
        rating={50}
        max={100}
        showRaw={false}
        classMap={classMap}
        data-testid="circular-progress"
      />
    );

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveAttribute("aria-valuenow", "50");
    expect(screen.getByTestId("circular-progress")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  it("renders the correct raw format when showRaw=true", () => {
    render(
      <CircularProgressBase
        rating={30}
        max={120}
        showRaw={true}
        classMap={classMap}
        data-testid="circular-progress"
      />
    );

    expect(screen.getByText("30/120")).toBeInTheDocument();
  });

  it("includes accessible labels and live updates", () => {
    render(
      <CircularProgressBase
        rating={80}
        classMap={classMap}
        label="Loading Progress"
        data-testid="circular-progress"
      />
    );

    const progressbar = screen.getByRole("progressbar", {
      name: /loading progress/i,
    });

    expect(progressbar).toHaveAttribute("aria-valuemin", "0");
    expect(progressbar).toHaveAttribute("aria-valuemax", "100");
    expect(progressbar).toHaveAttribute("aria-valuenow", "80");

    const label = screen.getByText("80%");
    expect(label).toHaveAttribute("aria-live", "polite");
    expect(label).toHaveAttribute("aria-atomic", "true");
  });

  it("clamps rating within min and max bounds", () => {
    render(
      <CircularProgressBase
        rating={150}
        min={0}
        max={100}
        classMap={classMap}
        data-testid="circular-progress"
      />
    );

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveAttribute("aria-valuenow", "100");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <CircularProgressBase
        rating={70}
        classMap={classMap}
        label="Progress Tracker"
        data-testid="circular-progress"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
