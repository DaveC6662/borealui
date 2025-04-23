// __tests__/BaseRating.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import BaseRating from "@/components/Rating/RatingBase";

const mockClassNames = {
  wrapper: "wrapper",
  star: "star",
  active: "active",
  themeMap: { primary: "primary" },
  sizeMap: { medium: "medium" },
  interactive: "interactive",
};

describe("BaseRating", () => {
  it("renders stars with correct value", () => {
    render(
      <BaseRating
        value={3}
        onChange={jest.fn()}
        max={5}
        theme="primary"
        classNames={mockClassNames}
        data-testid="rating"
      />
    );

    for (let i = 1; i <= 5; i++) {
      const star = screen.getByTestId(`rating-star-${i}`);
      expect(star).toBeInTheDocument();
    }
  });

  it("triggers onChange on click", () => {
    const handleChange = jest.fn();
    render(
      <BaseRating
        value={2}
        onChange={handleChange}
        classNames={mockClassNames}
      />
    );

    fireEvent.click(screen.getByTestId("rating-star-4"));
    expect(handleChange).toHaveBeenCalledWith(4);
  });

  it("triggers onChange on keyboard events", () => {
    const handleChange = jest.fn();
    render(
      <BaseRating
        value={2}
        onChange={handleChange}
        classNames={mockClassNames}
      />
    );

    const star = screen.getByTestId("rating-star-2");
    fireEvent.keyDown(star, { key: "Enter" });
    expect(handleChange).toHaveBeenCalledWith(2);
  });
});
