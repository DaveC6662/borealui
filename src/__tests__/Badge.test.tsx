import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { FaCheck } from "react-icons/fa";
import Badge from "../components/Badge/Badge";

describe("Badge Component", () => {
  it("renders text correctly", () => {
    render(<Badge text="Active" />);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("renders children instead of text if provided", () => {
    render(<Badge text="Ignored"><strong>Custom</strong></Badge>);
    expect(screen.getByText("Custom")).toBeInTheDocument();
    expect(screen.queryByText("Ignored")).not.toBeInTheDocument();
  });

  it("applies correct theme class", () => {
    render(<Badge text="Warning" theme="warning" />);
    const badge = screen.getByRole("note");
    expect(badge.className).toMatch(/warning/);
  });

  it("applies correct size class", () => {
    render(<Badge text="Small" size="small" />);
    const badge = screen.getByRole("note");
    expect(badge.className).toMatch(/small/);
  });

  it("applies outline class when outline is true", () => {
    render(<Badge text="Outlined" outline />);
    const badge = screen.getByRole("note");
    expect(badge.className).toMatch(/outline/);
  });

  it("renders icon when provided", () => {
    render(<Badge text="Check" icon={FaCheck} />);
    const icon = screen.getByTestId("badge").querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("uses custom test ID if provided", () => {
    render(<Badge text="Tested" testId="custom-badge" />);
    expect(screen.getByTestId("custom-badge")).toBeInTheDocument();
  });

  it("returns null if neither text nor children are provided", () => {
    const { container } = render(<Badge text="" />);
    expect(container.firstChild).toBeNull();
  });

  it("sets title and aria-label", () => {
    render(<Badge text="Info" title="Helpful Info" />);
    const badge = screen.getByRole("note");
    expect(badge).toHaveAttribute("title", "Helpful Info");
    expect(badge).toHaveAttribute("aria-label", "Info");
  });
});
