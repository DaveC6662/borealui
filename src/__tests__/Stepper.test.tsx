import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Stepper from "../components/Stepper/Stepper";
import { FaCheck } from "react-icons/fa";

describe("Stepper", () => {
  const steps = [
    { label: "Step 1", icon: FaCheck },
    { label: "Step 2" },
    { label: "Step 3" },
  ];

  it("renders step labels and icons", () => {
    render(<Stepper steps={steps} activeStep={1} />);
    expect(screen.getByText("Step 1")).toBeInTheDocument();
    expect(screen.getByText("Step 2")).toBeInTheDocument();
    expect(screen.getByText("Step 3")).toBeInTheDocument();
  });

  it('sets "aria-current" on the active step', () => {
    render(<Stepper steps={steps} activeStep={1} />);
    const stepButtons = screen.getAllByRole("button");
    expect(stepButtons[1]).toHaveAttribute("aria-current", "step");
  });

  it("disables steps beyond the active step", () => {
    render(<Stepper steps={steps} activeStep={1} />);
    const stepButtons = screen.getAllByRole("button");
    expect(stepButtons[2]).toBeDisabled();
    expect(stepButtons[0]).not.toBeDisabled();
  });

  it("calls onStepClick when a step is clicked", () => {
    const handleClick = jest.fn();
    render(<Stepper steps={steps} activeStep={1} onStepClick={handleClick} />);
    const stepButtons = screen.getAllByRole("button");
    fireEvent.click(stepButtons[0]);
    expect(handleClick).toHaveBeenCalledWith(0);
  });

  it("responds to Enter key press", () => {
    const handleClick = jest.fn();
    render(<Stepper steps={steps} activeStep={1} onStepClick={handleClick} />);
    const stepButtons = screen.getAllByRole("button");
    fireEvent.keyDown(stepButtons[0], { key: "Enter", code: "Enter" });
    expect(handleClick).toHaveBeenCalledWith(0);
  });
});
