import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Rating from "../components/Rating Component/Rating";
import "@testing-library/jest-dom";

describe("Rating Component", () => {
  it("renders correct number of stars", () => {
    render(<Rating value={2} max={5} interactive={false} data-testid="rating" />);
    const stars = screen.getAllByRole("radio");
    expect(stars.length).toBe(5);
  });

  it("renders active stars up to the value", () => {
    render(<Rating value={3} max={5} interactive={false} data-testid="rating" />);
    const activeStars = screen.getAllByTestId(/rating-star-/).filter((el) =>
      el.className.includes("active")
    );
    expect(activeStars.length).toBe(3);
  });

  it("calls onChange when a star is clicked", () => {
    const onChange = jest.fn();
    render(<Rating value={2} onChange={onChange} data-testid="rating" />);
    const star = screen.getByTestId("rating-star-4");
    fireEvent.click(star);
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it("does not call onChange when interactive is false", () => {
    const onChange = jest.fn();
    render(
      <Rating value={3} onChange={onChange} interactive={false} data-testid="rating" />
    );
    fireEvent.click(screen.getByTestId("rating-star-3"));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("sets correct aria attributes", () => {
    render(<Rating value={2} max={3} data-testid="rating" />);
    const container = screen.getByTestId("rating");
    expect(container).toHaveAttribute("role", "radiogroup");

    const stars = screen.getAllByRole("radio");
    stars.forEach((star, i) => {
      expect(star).toHaveAttribute("aria-checked", (i + 1 === 2).toString());
      expect(star).toHaveAttribute("tabIndex");
    });
  });

  it("handles keyboard interaction: Enter", () => {
    const onChange = jest.fn();
    render(<Rating value={2} onChange={onChange} data-testid="rating" />);
    const star = screen.getByTestId("rating-star-3");
    star.focus();
    fireEvent.keyDown(star, { key: "Enter" });
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("handles keyboard interaction: ArrowRight", () => {
    const onChange = jest.fn();
    render(<Rating value={2} onChange={onChange} data-testid="rating" />);
    const star = screen.getByTestId("rating-star-2");
    star.focus();
    fireEvent.keyDown(star, { key: "ArrowRight" });
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("handles keyboard interaction: ArrowLeft", () => {
    const onChange = jest.fn();
    render(<Rating value={3} onChange={onChange} data-testid="rating" />);
    const star = screen.getByTestId("rating-star-3");
    star.focus();
    fireEvent.keyDown(star, { key: "ArrowLeft" });
    expect(onChange).toHaveBeenCalledWith(2);
  });
});
