import { render, screen } from "@testing-library/react";
import CircularProgressBase from "@/components/CircularProgress/CircularProgressBase";
import "@testing-library/jest-dom";

const classMap = {
  circularProgress: "circularProgress",
  circleBorder: "circleBorder",
  innerCircle: "innerCircle",
  ratingText: "ratingText",
  medium: "medium",
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

    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "50"
    );
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

    const label = screen.getByText("80%");
    expect(label).toHaveAttribute("aria-live", "polite");
    expect(label).toHaveAttribute("aria-atomic", "true");
  });
});
