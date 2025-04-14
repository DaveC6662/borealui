import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Timeline } from "@/index";
import { FaRocket } from "react-icons/fa";

describe("Timeline", () => {
  const items = [
    { title: "Launch", description: "Initial release", date: "2024", icon: FaRocket },
  ];

  it("renders timeline items with title and description", () => {
    render(<Timeline items={items} theme="primary" orientation="vertical" />);
    expect(screen.getByText("Launch")).toBeInTheDocument();
    expect(screen.getByText("Initial release")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("applies correct orientation and theme classes", () => {
    const { container } = render(<Timeline items={items} theme="success" orientation="horizontal" />);
    expect(container.firstChild).toHaveClass("horizontal");
    expect(container.firstChild).toHaveClass("success");
  });

  it("adds accessible content with proper heading", () => {
    render(<Timeline items={items} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByRole("listitem")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Launch" })).toBeInTheDocument();
  });
  

  it("falls back to dot when no icon is provided", () => {
    render(<Timeline items={[{ title: "Milestone" }]} />);
    expect(screen.getByText("Milestone")).toBeInTheDocument();
    expect(screen.getByTestId("timeline-item-0-dot")).toBeInTheDocument();
  });
});
