import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Select from "@components/Select/Select/Select";

describe("Select component", () => {
  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "grape", label: "Grape" },
  ];

  it("renders with provided options and placeholder", () => {
    render(
      <Select
        options={options}
        value={""}
        onChange={jest.fn()}
        placeholder="Choose fruit"
        data-testid="test-select"
      />
    );

    const select = screen.getByTestId("test-select-input");
    expect(select).toBeInTheDocument();
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.getByText("Grape")).toBeInTheDocument();
  });

  it("calls onChange with correct value", () => {
    const handleChange = jest.fn();
    render(
      <Select
        options={options}
        value={""}
        onChange={handleChange}
        data-testid="test-select"
      />
    );

    fireEvent.change(screen.getByTestId("test-select-input"), {
      target: { value: "banana" },
    });

    expect(handleChange).toHaveBeenCalledWith("banana");
  });

  it("disables the select when disabled is true", () => {
    render(
      <Select
        options={options}
        value={""}
        onChange={jest.fn()}
        disabled
        data-testid="test-select"
      />
    );

    const select = screen.getByTestId("test-select-input");
    expect(select).toBeDisabled();
  });

  it("uses aria-label correctly", () => {
    render(
      <Select
        options={options}
        value={""}
        onChange={jest.fn()}
        ariaLabel="Fruits Dropdown"
        data-testid="test-select"
      />
    );

    const select = screen.getByTestId("test-select-input");
    expect(select).toHaveAttribute("aria-label", "Fruits Dropdown");
  });
});
