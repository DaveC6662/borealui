import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import BaseRating from "@/components/Rating/RatingBase";

expect.extend(toHaveNoViolations);

const mockClassNames = {
  container: "ratingContainer",
  wrapper: "wrapper",
  star: "star",
  active: "active",
  primary: "primary",
  medium: "medium",
  interactive: "interactive",
  label: "label",
};

describe("BaseRating", () => {
  it("renders correct number of stars", () => {
    render(
      <BaseRating
        value={3}
        onChange={jest.fn()}
        max={5}
        theme="primary"
        classMap={mockClassNames}
        data-testid="rating"
      />
    );

    for (let i = 1; i <= 5; i++) {
      expect(screen.getByTestId(`rating-star-${i}`)).toBeInTheDocument();
    }
  });

  it("calls onChange when star is clicked", () => {
    const handleChange = jest.fn();
    render(
      <BaseRating value={2} onChange={handleChange} classMap={mockClassNames} />
    );

    fireEvent.click(screen.getByTestId("rating-star-4"));
    expect(handleChange).toHaveBeenCalledWith(4);
  });

  it("calls onChange when Enter key is pressed", () => {
    const handleChange = jest.fn();
    render(
      <BaseRating value={2} onChange={handleChange} classMap={mockClassNames} />
    );

    const star = screen.getByTestId("rating-star-2");
    fireEvent.keyDown(star, { key: "Enter" });
    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it("calls onChange when Space key is pressed", () => {
    const handleChange = jest.fn();
    render(
      <BaseRating value={1} onChange={handleChange} classMap={mockClassNames} />
    );

    const star = screen.getByTestId("rating-star-1");
    fireEvent.keyDown(star, { key: " " });
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it("navigates with arrow keys", () => {
    const handleChange = jest.fn();
    render(
      <BaseRating value={3} onChange={handleChange} classMap={mockClassNames} />
    );

    const star = screen.getByTestId("rating-star-3");
    fireEvent.keyDown(star, { key: "ArrowRight" });
    expect(handleChange).toHaveBeenCalledWith(4);

    fireEvent.keyDown(star, { key: "ArrowLeft" });
    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it("renders label when provided", () => {
    render(
      <BaseRating
        value={2}
        onChange={() => {}}
        label="Rating Label"
        classMap={mockClassNames}
        data-testid="rating"
      />
    );
    expect(screen.getByText("Rating Label")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <BaseRating
        value={3}
        onChange={() => {}}
        label="Rate this"
        classMap={mockClassNames}
        data-testid="rating"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
